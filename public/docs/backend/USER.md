# USER.md — Guide Utilisateur Backend ChronoPredict

> Guide complet pour installer, lancer et utiliser l'API backend de ChronoPredict.

---

## 1. 🩺 Présentation du projet

**ChronoPredict Backend** est l'API d'intelligence artificielle qui alimente la plateforme ChronoPredict. Elle fournit deux types de prédictions :
- **Par symptômes** : à partir d'une liste de symptômes, prédit la maladie la plus probable parmi 41+ pathologies
- **Par image** : analyse des radiographies thoraciques (pneumonie) et des photos de lésions cutanées (7 types)

> ⚠️ **Avertissement** : projet académique (INF 716, Université de Sherbrooke, Hiver 2026). Ne constitue pas un outil de diagnostic médical.

---

## 2. 📋 Prérequis

| Logiciel | Version minimale | Vérification |
|---|---|---|
| Python | 3.10+ | `python --version` |
| pip | 21+ | `pip --version` |
| Git | 2.x | `git --version` |

**Optionnel :**
- Docker et Docker Compose
- GPU avec CUDA (pour accélérer l'inférence image, sinon le CPU est utilisé)

### Dataset requis
Le dataset Kaggle "Disease Prediction Using Machine Learning" :
- Fichiers : `Training.csv` et `Testing.csv`
- À placer dans le dossier `data/`

---

## 3. 🚀 Installation

### Option A : Installation manuelle

```bash
# 1. Cloner le repo
git clone <url-du-repo>
cd backend

# 2. Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # macOS/Linux
# ou: venv\Scripts\activate  # Windows

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Placer le dataset
# Copier Training.csv et Testing.csv dans data/

# 5. Entraîner le modèle de prédiction par symptômes
python -m app.ml.train

# 6. Lancer le serveur
uvicorn app.main:app --reload
```

Le serveur est accessible sur **http://localhost:8000**.

### Option B : Avec Docker

```bash
# Depuis la racine du projet
docker-compose up --build
```

### Vérifier que tout fonctionne

```bash
# Test de santé
curl http://localhost:8000/api/health
# → {"status": "ok"}

# Test de prédiction
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["headache", "fatigue", "high_fever"]}'
```

**Documentation Swagger interactive :** http://localhost:8000/docs

---

## 4. 📖 Guide d'utilisation de l'API

### Prédiction par symptômes

**Étape 1 : Récupérer la liste des symptômes**

```bash
curl http://localhost:8000/api/symptoms
```

Retourne les 132 symptômes disponibles (noms en anglais, format snake_case).

**Étape 2 : Envoyer une prédiction**

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["cough", "high_fever", "breathlessness", "chest_pain"]}'
```

**Réponse :**
```json
{
  "prediction": "Pneumonia",
  "probabilities": {
    "Pneumonia": 0.8912,
    "Bronchial Asthma": 0.0543,
    "Tuberculosis": 0.0321,
    "Common Cold": 0.0112,
    "GERD": 0.0067
  },
  "risk_level": "High"
}
```

**Comprendre les résultats :**
- `prediction` : la maladie la plus probable
- `probabilities` : le top 5 des maladies avec leurs probabilités (0 à 1)
- `risk_level` :
  - **High** (≥ 70%) : forte confiance dans le diagnostic
  - **Medium** (40-70%) : confiance modérée
  - **Low** (< 40%) : faible confiance, symptômes ambigus

### Analyse d'image médicale

**Modèles disponibles :**

| Type | Description | Classes |
|---|---|---|
| `chest_xray` | Radiographie thoracique | NORMAL, PNEUMONIA |
| `skin_lesion` | Lésion cutanée | akiec, bcc, bkl, df, mel, nv, vasc |

**Envoyer une image :**

```bash
curl -X POST http://localhost:8000/api/predict/image \
  -F "file=@mon_image.jpg" \
  -F "model_type=chest_xray"
```

**Réponse :**
```json
{
  "prediction": "PNEUMONIA",
  "confidence": 0.9523,
  "probabilities": {
    "NORMAL": 0.0477,
    "PNEUMONIA": 0.9523
  },
  "model_type": "chest_xray",
  "description": "Détection de pneumonie à partir de radiographies thoraciques"
}
```

**Vérifier quels modèles sont disponibles :**

```bash
curl http://localhost:8000/api/predict/image/models
```

---

## 5. 🧪 Cas concrets

### Exemple 1 : Détecter du diabète

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["fatigue", "weight_loss", "excessive_hunger", "polyuria", "irregular_sugar_level"]}'
```

**Résultat attendu :** `prediction: "Diabetes"` avec un `risk_level: "High"`.

### Exemple 2 : Analyser une radio thoracique

```bash
curl -X POST http://localhost:8000/api/predict/image \
  -F "file=@chest_xray.jpg" \
  -F "model_type=chest_xray"
```

**Résultat attendu :** `prediction: "PNEUMONIA"` ou `"NORMAL"` avec un score de confiance.

---

## 6. ❓ FAQ & Erreurs courantes

### "Le modèle n'est pas encore entraîné" (erreur 503)
```
{"detail": "Le modèle n'est pas encore entraîné. Exécutez 'python -m app.ml.train' d'abord."}
```
→ Lancez l'entraînement :
```bash
python -m app.ml.train
```

### "Training.csv introuvable"
→ Téléchargez le dataset depuis Kaggle et placez `Training.csv` et `Testing.csv` dans le dossier `data/`.

### "Type de modèle invalide" (erreur 400)
→ Utilisez uniquement `chest_xray` ou `skin_lesion` comme `model_type`.

### "Le fichier doit être une image" (erreur 400)
→ Assurez-vous d'envoyer un fichier JPEG ou PNG.

### "Le modèle chest_xray n'a pas été entraîné" (erreur 503)
→ Le fichier `models/modele_pneumonie.pth` est manquant. L'entraînement des modèles image nécessite les datasets d'images correspondants.

### L'API ne répond pas
→ Vérifiez que le serveur tourne :
```bash
uvicorn app.main:app --reload
```

---

## 7. ⚠️ Limites

- **41 maladies** couvertes par le modèle symptômes (pas de cancer, etc.)
- **132 symptômes** reconnus — les symptômes inconnus sont ignorés silencieusement
- **Modèles image** : entraînés sur des datasets limités, précision variable
- **Pas de GPU requis** : l'inférence fonctionne sur CPU, mais est plus lente
- **Pas de persistance** : aucune donnée patient n'est stockée
- **Ne remplace pas un diagnostic médical**

---

## 8. 🔌 Référence API complète

**URL de base :** `http://localhost:8000`

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Vérification santé du serveur |
| GET | `/api/symptoms` | Liste des symptômes disponibles |
| POST | `/api/predict` | Prédiction par symptômes |
| POST | `/api/predict/image` | Prédiction par image médicale |
| GET | `/api/predict/image/models` | Liste des modèles image |
| GET | `/api/predict/image/mapping` | Mapping maladie → modèle image |
| POST | `/api/predict/xray` | Détection pneumonie (endpoint dédié) |

**Documentation Swagger :** http://localhost:8000/docs
