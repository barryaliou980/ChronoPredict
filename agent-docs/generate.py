#!/usr/bin/env python3
"""Agent IA de génération de documentation automatique.

Génère 3 types de documentation (Process, System, User) pour chaque repo
en utilisant l'API Claude avec des prompts système adaptés à chaque audience.

Les fichiers .md sont générés dans public/docs/ pour être servis par Next.js.

Usage:
    python generate.py                    # Génère tout
    python generate.py --repo frontend    # Un seul repo
    python generate.py --doc system       # Un seul type de doc
    python generate.py --dry-run          # Test sans appeler l'API
"""

import argparse
import glob
import os
import subprocess
import sys
from pathlib import Path

import anthropic
import yaml

SCRIPT_DIR = Path(__file__).resolve().parent


def load_config() -> dict:
    config_path = SCRIPT_DIR / "config.yaml"
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def resolve_repo_path(repo_name: str, repo_config: dict, config: dict) -> Path:
    if os.environ.get("CI") and repo_name == "backend":
        ci_path = config.get("backend_ci_path", "./backend-repo")
        return Path(ci_path).resolve()
    return (SCRIPT_DIR / repo_config["path"]).resolve()


def collect_files(repo_path: Path, include_patterns: list[str]) -> dict[str, str]:
    files = {}
    for pattern in include_patterns:
        full_pattern = str(repo_path / pattern)
        for filepath in sorted(glob.glob(full_pattern, recursive=True)):
            rel_path = os.path.relpath(filepath, repo_path)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                lines = content.split("\n")
                if len(lines) > 500:
                    content = "\n".join(lines[:500])
                    content += f"\n\n... (tronqué, {len(lines)} lignes au total)"
                files[rel_path] = content
            except (UnicodeDecodeError, IsADirectoryError):
                continue
    return files


def get_git_info(repo_path: Path) -> str:
    info_parts = []
    try:
        result = subprocess.run(
            ["git", "log", "--oneline", "-10"],
            cwd=repo_path, capture_output=True, text=True, timeout=10,
        )
        if result.returncode == 0:
            info_parts.append(f"## Derniers commits\n```\n{result.stdout.strip()}\n```")
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return "\n\n".join(info_parts)


def build_user_message(repo_name, doc_type, files, git_info, project_name, project_desc):
    ext_map = {
        ".py": "python", ".ts": "typescript", ".tsx": "tsx",
        ".json": "json", ".yaml": "yaml", ".md": "markdown",
    }
    parts = [
        f"# Projet : {project_name}",
        f"**Description :** {project_desc}",
        f"**Repo :** {repo_name}",
        f"**Type de documentation à générer :** {doc_type}",
        "", "---", "",
        "# Informations Git", git_info,
        "", "---", "",
        "# Code source", "",
    ]
    for filepath, content in files.items():
        lang = ext_map.get(Path(filepath).suffix, "")
        parts.append(f"## `{filepath}`\n```{lang}\n{content}\n```\n")

    parts.extend([
        "---", "",
        "# Contexte supplémentaire", "",
        "- **Qodo** est intégré sur les PR pour l'analyse de code et la génération de tests unitaires automatiques.",
        "- **Un agent IA Claude** génère automatiquement la documentation à chaque PR mergée.",
        "- Le frontend est déployé sur **Vercel**, le backend sur **Render**.",
        "- Projet éducatif : INF 716 — IA, Université de Sherbrooke, Hiver 2026.",
        "",
        "Génère maintenant le document complet en Markdown.",
    ])
    return "\n".join(parts)


def generate_doc(client, system_prompt, user_message, model, max_tokens):
    message = client.messages.create(
        model=model, max_tokens=max_tokens, system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )
    return message.content[0].text


def main():
    parser = argparse.ArgumentParser(description="Génère la documentation ChronoPredict")
    parser.add_argument("--repo", choices=["frontend", "backend"])
    parser.add_argument("--doc", choices=["process", "system", "user"])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key and not args.dry_run:
        print("Erreur : ANTHROPIC_API_KEY non définie.")
        print("  export ANTHROPIC_API_KEY='sk-ant-...'")
        sys.exit(1)

    config = load_config()
    model = config.get("model", "claude-sonnet-4-6")
    max_tokens = config.get("max_tokens", 8000)
    output_base = (SCRIPT_DIR / config.get("output_dir", "../public/docs")).resolve()

    repos = config["repos"]
    if args.repo:
        repos = {args.repo: repos[args.repo]}

    docs = config["docs"]
    if args.doc:
        docs = [d for d in docs if d["type"] == args.doc]

    client = None if args.dry_run else anthropic.Anthropic(api_key=api_key)
    total = len(repos) * len(docs)
    current = 0

    for repo_name, repo_config in repos.items():
        repo_path = resolve_repo_path(repo_name, repo_config, config)
        if not repo_path.exists():
            print(f"  Repo introuvable : {repo_path}")
            continue

        print(f"\n{'='*60}")
        print(f"  Repo : {repo_name}")
        print(f"{'='*60}")

        files = collect_files(repo_path, repo_config["include"])
        print(f"  Fichiers collectés : {len(files)}")
        git_info = get_git_info(repo_path)

        for doc_config in docs:
            current += 1
            doc_type = doc_config["type"]
            output_filename = doc_config["output"]
            print(f"\n  [{current}/{total}] {repo_name}/{output_filename}")

            prompt_path = SCRIPT_DIR / doc_config["prompt"]
            with open(prompt_path, "r", encoding="utf-8") as f:
                system_prompt = f.read()

            user_message = build_user_message(
                repo_name, doc_type, files, git_info,
                config["project_name"], config["description"],
            )

            if args.dry_run:
                print(f"    Prompt : {len(system_prompt)} chars | Message : {len(user_message)} chars")
                continue

            print(f"    Appel API Claude ({model})...")
            try:
                result = generate_doc(client, system_prompt, user_message, model, max_tokens)
            except anthropic.APIError as e:
                print(f"    Erreur API : {e}")
                continue

            output_dir = output_base / repo_name
            output_dir.mkdir(parents=True, exist_ok=True)
            output_path = output_dir / output_filename
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(result)
            print(f"    Sauvegardé ({len(result)} chars)")

    print(f"\n  Terminé ! ({current} documents)")


if __name__ == "__main__":
    main()
