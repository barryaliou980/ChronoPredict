# PROCESS.md — Frontend ChronoPredict

> Documentation de processus pour les développeurs contribuant au frontend Next.js.

---

## 1. Méthodologie de développement

### Modèle de branching
- **`main`** : branche de production, toujours déployable
- **`develop`** : branche d'intégration (si utilisée)
- **Branches de fonctionnalité** : créées depuis `main` ou `develop`

### Convention de nommage des branches
- `feat/nom-fonctionnalite` — nouvelle fonctionnalité
- `fix/description-bug` — correction de bug
- `docs/sujet` — documentation
- `refactor/composant` — refactoring

### Workflow Git
1. Créer une branche depuis `main`
2. Développer en local avec `npm run dev`
3. Committer avec des messages clairs en français ou anglais
4. Pousser la branche et ouvrir une Pull Request
5. Attendre la review + les checks automatiques
6. Merger dans `main` après approbation

---

## 2. Processus de Pull Request

### Créer une PR
- Titre concis décrivant le changement
- Description avec contexte, motivation et captures d'écran (si UI)

### Contenu attendu
- Description du changement et pourquoi
- Captures d'écran pour tout changement visuel
- Tests manuels effectués
- Impact sur les autres composants

### Review process
- Au moins 1 approbation requise
- Le reviewer vérifie : logique, accessibilité, responsive, performances

### Outils automatisés sur les PR
- **Qodo** : analyse automatique du code et génération de tests unitaires sur chaque PR
- **Agent IA Claude** : mise à jour automatique de la documentation (PROCESS.md, SYSTEM.md, USER.md) à chaque PR mergée via GitHub Actions

---

## 3. Choix techniques et justifications

| Technologie | Version | Justification |
|---|---|---|
| **Next.js** | 16.2.1 | App Router, SSR/SSG, routing automatique, écosystème React |
| **React** | 19.2.4 | Composants modulaires, hooks, large communauté |
| **TypeScript** | 5.x | Typage statique, autocomplétion, détection d'erreurs à la compilation |
| **Tailwind CSS** | 4.x | Utility-first, prototypage rapide, thème médical personnalisé |
| **sessionStorage** | Natif | Passage de données entre pages (résultats → confirmation image) sans state manager |

### Compromis
- Pas de state manager global (Redux, Zustand) : le flux est linéaire (symptômes → résultats → image), `sessionStorage` suffit
- Pas de bibliothèque de graphiques : les barres de progression sont faites en CSS pur pour limiter les dépendances
- Labels de symptômes et maladies en dur dans les composants : adapté au scope du projet éducatif

---

## 4. Comment contribuer

### Setup local

```bash
# Cloner le repo
git clone <url-repo>
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

**Prérequis :** Node.js 18+, npm 9+

**Variable d'environnement :** créer `.env.local` si le backend n'est pas sur localhost:8000 :
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Conventions de code
- **Composants** : PascalCase (`PredictionForm.tsx`)
- **Fichiers utilitaires** : camelCase (`api.ts`)
- **Styles** : Tailwind CSS uniquement, classes utilitaires inline
- **Types** : centralisés dans `src/types/index.ts`
- **Localisation** : labels français définis dans des `Record<string, string>` au sein de chaque composant

### Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build de production |
| `npm run start` | Lancer le build de production |
| `npm run lint` | Linter ESLint |

### Où ajouter du code

| Type | Emplacement |
|---|---|
| Nouvelle page | `src/app/<route>/page.tsx` |
| Nouveau composant | `src/components/<NomComposant>.tsx` |
| Nouvelle fonction API | `src/lib/api.ts` |
| Nouveau type/interface | `src/types/index.ts` |
| Styles globaux | `src/app/globals.css` |

---

## 5. Outils intégrés

- **Qodo** : review automatique du code + génération de tests unitaires sur chaque PR
- **Agent IA Claude** : génère 3 types de documentation (Process, System, User) pour chaque repo à chaque PR mergée
- **Docker** : `docker-compose up --build` pour lancer frontend + backend ensemble
- **CI/CD** : GitHub Actions déclenche la génération de documentation automatique
- **Vercel** : déploiement automatique du frontend en production

---

## 6. Déploiement

### Environnements

| Environnement | URL | Déploiement |
|---|---|---|
| Local | `http://localhost:3000` | `npm run dev` |
| Production | Vercel | Push sur `main` → déploiement automatique |

### Processus de déploiement
1. Merger la PR dans `main`
2. Vercel détecte le push et lance le build
3. Le site est mis à jour automatiquement

### Vérifications post-déploiement
- Vérifier que la page d'accueil se charge
- Tester le flux complet : sélection de symptômes → résultats → confirmation par image
- Vérifier la connexion au backend (`/api/health`)

### Variables d'environnement en production
- `NEXT_PUBLIC_API_URL` : URL du backend déployé (Render)
