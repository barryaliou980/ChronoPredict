# Frontend - Chronic Disease Prediction

Interface web Next.js pour la prédiction de maladies chroniques.

## Prérequis

- Node.js 20+

## Installation

```bash
cd frontend
npm install
```

## Configuration

Créer un fichier `.env.local` à la racine du dossier `frontend/` :

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Cette variable pointe vers l'API backend.

## Lancement

### Développement

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000.

### Production

```bash
npm run build
npm start
```

## Lancement avec Docker

```bash
docker build -t chronic-disease-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 chronic-disease-frontend
```

## Structure

```
frontend/
├── src/
│   ├── app/           # Pages (App Router)
│   ├── components/    # Composants React
│   ├── lib/           # Client API
│   └── types/         # Types TypeScript
├── public/            # Assets statiques
├── package.json
├── tsconfig.json
└── Dockerfile
```

## Dépendances principales

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
