# PROCESS.md — Backend ChronoPredict

> Documentation de processus pour les développeurs contribuant au backend FastAPI.

---

## 1. Méthodologie de développement

### Modèle de branching
- **`main`** : branche de production, toujours déployable
- **Branches de fonctionnalité** : créées depuis `main`

### Convention de nommage des branches
- `feat/nom-fonctionnalite` — nouvelle fonctionnalité
- `fix/description-bug` — correction de bug
- `docs/sujet` — documentation
- `refactor/module` — refactoring

### Workflow Git
1. Créer une branche depuis `main`
2. Développer et tester en local avec `uvicorn app.main:app --reload`
3. Vérifier les endpoints via Swagger (`/docs`)
4. Committer et pousser
5. Ouvrir une PR → review + checks automatiques
6. Merger après approbation

---

## 2. Processus de Pull Request

### Créer une PR
- Titre concis décrivant le changement
- Description avec contexte technique

### Contenu attendu
- Description du changement (endpoint ajouté/modifié, modèle ML, etc.)
- Tests effectués (exemples de requêtes curl, résultats)
- Impact sur l'API (changements de schéma, nouveaux endpoints)

### Outils automatisés sur les PR
- **Qodo** : analyse automatique du code Python et génération de tests unitaires
- **Agent IA Claude** : mise à jour automatique de la documentation à chaque PR mergée

---

## 3. Choix techniques et justifications

| Technologie | Version | Justification |
|---|---|---|
| **FastAPI** | 0.115.0 | Performances async, validation Pydantic intégrée, Swagger auto-généré |
| **Scikit-learn** | 1.5.2 | Modèles ML classiques, API simple, sérialisation joblib |
| **PyTorch** | latest | Deep learning (CNN) pour l'analyse d'images médicales |
| **TorchVision** | latest | Modèles pré-entraînés (ResNet18), transformations d'images |
| **Pydantic** | 2.9.2 | Validation des requêtes/réponses, documentation automatique |
| **Pandas** | 2.2.3 | Manipulation de données tabulaires (CSV) |
| **Pillow** | 10.0+ | Lecture et transformation d'images |

### Compromis
- **3 modèles comparés** (Logistic Regression, Random Forest, Gradient Boosting) : le meilleur est sélectionné automatiquement par F1-score
- **ResNet18** pour l'image : compromis entre performance et légèreté (pas de ResNet50 ou plus lourd)
- **CORS `allow_origins=["*"]`** : permissif pour faciliter le développement, à restreindre en production
- **Chargement lazy des modèles** : les modèles ML ne sont chargés qu'au premier appel API (cache en mémoire)

---

## 4. Comment contribuer

### Setup local

```bash
# Cloner le repo
git clone <url-repo>
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # macOS/Linux
# ou venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Entraîner le modèle (nécessite le dataset dans data/)
python -m app.ml.train

# Lancer le serveur
uvicorn app.main:app --reload
# → http://localhost:8000
# → Swagger : http://localhost:8000/docs
```

**Prérequis :** Python 3.10+

### Conventions de code
- **Routers** : un fichier par domaine dans `app/routers/` (predict, health, etc.)
- **Schemas** : modèles Pydantic centralisés dans `app/schemas.py`
- **ML** : modules d'entraînement et inférence dans `app/ml/`
- **Nommage** : snake_case pour les variables et fonctions, PascalCase pour les classes
- **Langue** : docstrings et messages en français

### Commandes utiles

| Commande | Description |
|---|---|
| `uvicorn app.main:app --reload` | Serveur de développement (port 8000) |
| `python -m app.ml.train` | Entraîner les modèles symptômes |
| `docker-compose up --build` | Lancer avec Docker |

### Où ajouter du code

| Type | Emplacement |
|---|---|
| Nouvel endpoint | `app/routers/<domaine>.py` + enregistrer dans `app/main.py` |
| Nouveau schéma Pydantic | `app/schemas.py` |
| Nouveau modèle ML | `app/ml/<module>.py` |
| Utilitaires | `app/utils/<module>.py` |
| Données d'entraînement | `data/` |

---

## 5. Outils intégrés

- **Qodo** : review automatique du code + tests unitaires sur chaque PR
- **Agent IA Claude** : génération de documentation automatique (Process, System, User)
- **Swagger/OpenAPI** : documentation interactive auto-générée sur `/docs`
- **Docker** : conteneurisation via `Dockerfile` + `docker-compose.yml`
- **Render** : déploiement du backend en production

---

## 6. Déploiement

### Environnements

| Environnement | URL | Déploiement |
|---|---|---|
| Local | `http://localhost:8000` | `uvicorn app.main:app --reload` |
| Production | Render | Push sur `main` → déploiement automatique |

### Processus de déploiement
1. Merger la PR dans `main`
2. Render détecte le push et lance le build
3. L'API est mise à jour automatiquement

### Vérifications post-déploiement
- `GET /api/health` → `{"status": "ok"}`
- `GET /api/symptoms` → liste non vide
- `POST /api/predict` avec des symptômes de test → réponse valide
- Vérifier Swagger : `<url>/docs`

### Fichiers de modèles nécessaires
- `models/best_model.joblib` — modèle de prédiction par symptômes
- `models/label_encoder.joblib` — encodeur de labels
- `models/symptoms.joblib` — liste des symptômes
- `models/modele_pneumonie.pth` — modèle pneumonie (optionnel)
- `models/skin_cancer_model.pth` — modèle lésions cutanées (optionnel)
