"use client";

import { useEffect, useState } from "react";

const DOCS = [
  { repo: "frontend", type: "process", label: "Processus", icon: "⚙", tag: "DEV", tagColor: "bg-blue-500/20 text-blue-400" },
  { repo: "frontend", type: "system", label: "Système", icon: "◈", tag: "TECH", tagColor: "bg-emerald-500/20 text-emerald-400" },
  { repo: "frontend", type: "user", label: "Utilisateur", icon: "★", tag: "GUIDE", tagColor: "bg-amber-500/20 text-amber-400" },
  { repo: "backend", type: "process", label: "Processus", icon: "⚙", tag: "DEV", tagColor: "bg-blue-500/20 text-blue-400" },
  { repo: "backend", type: "system", label: "Système", icon: "◈", tag: "TECH", tagColor: "bg-emerald-500/20 text-emerald-400" },
  { repo: "backend", type: "user", label: "Utilisateur", icon: "★", tag: "GUIDE", tagColor: "bg-amber-500/20 text-amber-400" },
];

const FILE_MAP: Record<string, string> = {
  process: "PROCESS.md",
  system: "SYSTEM.md",
  user: "USER.md",
};

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function loadDoc(repo: string, type: string) {
    const key = `${repo}-${type}`;
    setActiveDoc(key);
    setLoading(true);
    setSidebarOpen(false);

    try {
      const res = await fetch(`/docs/${repo}/${FILE_MAP[type]}`);
      if (!res.ok) throw new Error("not found");
      const md = await res.text();
      setContent(md);
    } catch {
      setContent("");
    } finally {
      setLoading(false);
    }
  }

  // Simple markdown to HTML (basic)
  function renderMarkdown(md: string): string {
    let html = md
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-slate-700 rounded-xl p-4 overflow-x-auto my-4"><code class="text-sm text-slate-300">$2</code></pre>')
      // Headers
      .replace(/^#### (.+)$/gm, '<h4 class="text-base font-semibold text-white mt-6 mb-2">$1</h4>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-8 mb-3">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-10 mb-4 pt-6 border-t border-slate-700">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-extrabold text-white mt-8 mb-4">$1</h1>')
      // Bold & italic
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">$1</code>')
      // Blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 bg-blue-500/10 pl-4 py-2 my-3 text-blue-200 rounded-r-lg">$1</blockquote>')
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-300 mb-1">• $1</li>')
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-slate-300 mb-1">$1</li>')
      // Tables
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split("|").filter(c => c.trim());
        if (cells.every(c => /^[\s-:]+$/.test(c))) return "";
        const tds = cells.map(c => `<td class="px-3 py-2 border-b border-slate-700">${c.trim()}</td>`).join("");
        return `<tr>${tds}</tr>`;
      })
      // Paragraphs
      .replace(/^(?!<[huplbtrd])((?!<).+)$/gm, '<p class="text-slate-400 mb-3">$1</p>')
      // Wrap tables
      .replace(/(<tr>[\s\S]*?<\/tr>[\s]*)+/g, '<table class="w-full text-sm my-4 border-collapse">$&</table>')
      // Mermaid blocks (just show as code)
      .replace(/```mermaid\n([\s\S]*?)```/g, '<pre class="bg-slate-900 border border-slate-700 rounded-xl p-4 my-4"><code class="text-sm text-purple-300">$1</code></pre>');

    return html;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-lg"
      >
        ☰
      </button>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`
          fixed lg:sticky top-0 h-screen w-72 bg-[#111] border-r border-slate-800 p-0 overflow-y-auto z-40
          transition-transform lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-lg font-extrabold tracking-tight">
              Chrono<span className="text-blue-500">Predict</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Documentation</p>
          </div>

          {/* Frontend section */}
          <div className="p-4">
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 px-2 mb-2">Frontend</h3>
            {DOCS.filter(d => d.repo === "frontend").map(d => (
              <button
                key={`${d.repo}-${d.type}`}
                onClick={() => loadDoc(d.repo, d.type)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm mb-1 transition-all ${
                  activeDoc === `${d.repo}-${d.type}`
                    ? "bg-blue-500/20 text-blue-400 font-semibold"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${d.tagColor}`}>{d.tag}</span>
              </button>
            ))}
          </div>

          {/* Backend section */}
          <div className="p-4 pt-0">
            <h3 className="text-[10px] uppercase tracking-widest text-slate-500 px-2 mb-2">Backend</h3>
            {DOCS.filter(d => d.repo === "backend").map(d => (
              <button
                key={`${d.repo}-${d.type}`}
                onClick={() => loadDoc(d.repo, d.type)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm mb-1 transition-all ${
                  activeDoc === `${d.repo}-${d.type}`
                    ? "bg-blue-500/20 text-blue-400 font-semibold"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold ${d.tagColor}`}>{d.tag}</span>
              </button>
            ))}
          </div>

          {/* Back link */}
          <div className="p-4 border-t border-slate-800 mt-4">
            <a href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
              ← Retour à l&apos;application
            </a>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 p-8 lg:p-16 max-w-4xl">
          {!activeDoc && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-extrabold mb-3">Documentation ChronoPredict</h2>
              <p className="text-slate-500 mb-8">Sélectionnez un document dans le menu latéral</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl mx-auto text-left">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-blue-400 font-bold text-sm mb-1">⚙ Processus</div>
                  <p className="text-xs text-slate-500">Méthode de dev, PR, comment contribuer</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-emerald-400 font-bold text-sm mb-1">◈ Système</div>
                  <p className="text-xs text-slate-500">Architecture, flux, modules, API</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-amber-400 font-bold text-sm mb-1">★ Utilisateur</div>
                  <p className="text-xs text-slate-500">Installation, usage, FAQ</p>
                </div>
              </div>
              <div className="mt-10 bg-slate-900 border border-slate-700 rounded-xl p-4 inline-block text-left">
                <p className="text-xs text-slate-500 mb-2">Générer la documentation :</p>
                <code className="text-sm text-emerald-400">
                  export ANTHROPIC_API_KEY=&apos;sk-ant-...&apos;<br/>
                  python agent-docs/generate.py
                </code>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500">Chargement...</p>
            </div>
          )}

          {activeDoc && !loading && !content && (
            <div className="text-center py-20">
              <div className="text-5xl mb-6">📋</div>
              <h3 className="text-xl font-bold mb-2">Document pas encore généré</h3>
              <p className="text-slate-500 mb-6">Lancez l&apos;agent pour générer ce fichier</p>
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 inline-block text-left">
                <code className="text-sm text-emerald-400">
                  python agent-docs/generate.py --repo {activeDoc?.split("-")[0]} --doc {activeDoc?.split("-")[1]}
                </code>
              </div>
            </div>
          )}

          {activeDoc && !loading && content && (
            <div
              className="animate-fade-in"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
