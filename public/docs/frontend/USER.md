# USER.md — Guide Utilisateur ChronoPredict (Frontend)

> Guide complet pour installer, lancer et utiliser l'interface web de ChronoPredict.

---

## 1. 🩺 Présentation du projet

**ChronoPredict** est une plateforme web d'analyse prédictive qui utilise l'intelligence artificielle pour aider à identifier des risques de maladies chroniques à partir de symptômes. L'application permet aussi de confirmer certains diagnostics par analyse d'images médicales.

**À qui s'adresse cette application ?**
- Étudiants et chercheurs en IA/santé numérique
- Développeurs souhaitant comprendre un projet full-stack ML
- Toute personne curieuse d'explorer la prédiction de maladies par IA

> ⚠️ **Avertissement** : ChronoPredict est un **projet académique** (INF 716, Université de Sherbrooke, Hiver 2026). Il ne constitue **en aucun cas** un outil de diagnostic médical. Consultez toujours un professionnel de santé.

---

## 2. 📋 Prérequis

| Logiciel | Version minimale | Vérification |
|---|---|---|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.x | `git --version` |

**Optionnel :**
- Docker et Docker Compose (pour lancer frontend + backend en une commande)

---

## 3. 🚀 Installation

### Option A : Installation manuelle

```bash
# 1. Cloner le repo
git clone <url-du-repo>
cd frontend

# 2. Installer les dépendances
npm install

# 3. Configurer la connexion au backend (optionnel)
# Par défaut, l'app se connecte à http://localhost:8000
# Pour changer, créer un fichier .env.local :
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# 4. Lancer le serveur de développement
npm run dev
```

L'application est accessible sur **http://localhost:3000**.

### Option B : Avec Docker

```bash
# Depuis la racine du projet (pas le dossier frontend)
docker-compose up --build
```

Cela lance le frontend (port 3000) **et** le backend (port 8000) automatiquement.

### Vérifier que tout fonctionne

1. Ouvrir http://localhost:3000 → la page d'accueil doit s'afficher
2. Ouvrir http://localhost:8000/api/health → doit retourner `{"status": "ok"}`
3. Cliquer sur "Démarrer mon évaluation" → le formulaire de symptômes doit se charger

---

## 4. 📖 Guide d'utilisation

### Analyse par symptômes

1. **Accéder à l'application** : ouvrir http://localhost:3000 et cliquer sur **"Démarrer mon évaluation"**

2. **Sélectionner vos symptômes** :
   - Parcourez la grille de 139 symptômes disponibles (tous en français)
   - Utilisez la **barre de recherche** pour trouver rapidement un symptôme (ex: tapez "fièvre", "fatigue", "toux"...)
   - Cliquez sur un symptôme pour le sélectionner (il devient bleu)
   - Vos symptômes sélectionnés apparaissent en haut sous forme de pastilles
   - Cliquez sur une pastille pour retirer un symptôme

3. **Lancer l'analyse** : cliquez sur **"Générer mon Analyse Médicale"** (le bouton s'active dès qu'au moins 1 symptôme est sélectionné)

4. **Lire les résultats** :
   - **Diagnostic probable** : la maladie la plus probable selon vos symptômes
   - **Confiance de l'analyse** : Faible (bleu), Modérée (orange), ou Élevée (vert)
   - **Analyse comparative** : les 5 maladies les plus probables avec leur pourcentage
   - **Recommandations** : 4 conseils médicaux généraux

### Confirmation par image

Pour certaines maladies, un bouton **"Confirmer par image"** apparaît dans les résultats. Cela permet de renforcer le diagnostic avec une image médicale.

**Maladies supportant l'analyse image :**

| Maladie | Type d'image à fournir |
|---|---|
| Pneumonie | Radiographie du thorax (X-ray) |
| Psoriasis | Photo de la lésion cutanée |
| Acné | Photo de la zone affectée |
| Impétigo | Photo de la lésion |
| Infection fongique | Photo de la zone infectée |

**Comment faire :**
1. Cliquez sur **"Confirmer par image"** dans les résultats
2. Glissez-déposez une image ou cliquez pour parcourir vos fichiers
3. Formats acceptés : JPEG, PNG (max 10 Mo)
4. Cliquez sur **"Analyser l'image"**
5. Les résultats affichent la prédiction du modèle image avec son pourcentage de confiance

---

## 5. 🧪 Cas concrets

### Exemple 1 : Détecter une pneumonie

**Symptômes à sélectionner :**
- Toux
- Forte fièvre
- Essoufflement
- Douleur thoracique
- Mucosités
- Crachat rouillé

**Résultat attendu :** Le diagnostic probable devrait indiquer "Pneumonie" avec un niveau de confiance élevé. Le bouton "Confirmer par image" apparaîtra pour uploader une radiographie thoracique.

### Exemple 2 : Analyser une lésion cutanée (acné)

**Symptômes à sélectionner :**
- Boutons purulents
- Points noirs
- Cicatrices
- Éruption cutanée

**Résultat attendu :** Le diagnostic probable devrait indiquer "Acné". Le bouton "Confirmer par image" apparaîtra pour uploader une photo de la zone affectée.

---

## 6. ❓ FAQ & Erreurs courantes

### "Le formulaire de symptômes ne se charge pas"
→ Vérifiez que le **backend** est bien lancé sur le port 8000.
```bash
curl http://localhost:8000/api/health
# Doit retourner: {"status": "ok"}
```

### "Erreur lors de la prédiction"
→ Le modèle ML n'est probablement pas entraîné. Lancez :
```bash
cd backend
python -m app.ml.train
```

### "Le bouton 'Confirmer par image' n'apparaît pas"
→ C'est normal. Seules 5 maladies supportent la confirmation par image : Pneumonie, Psoriasis, Acné, Impétigo, Infection fongique. Pour les autres maladies, ce bouton n'est pas affiché.

### "Erreur de connexion au backend"
→ Vérifiez que :
1. Le backend tourne (`uvicorn app.main:app --reload` dans le dossier `backend/`)
2. Le port 8000 n'est pas bloqué
3. La variable `NEXT_PUBLIC_API_URL` est correcte

### "L'image n'est pas acceptée"
→ Vérifiez que :
- Le fichier est bien une image (JPEG ou PNG)
- La taille ne dépasse pas 10 Mo

---

## 7. ⚠️ Limites

- **41 maladies couvertes** : le modèle ne prédit que les maladies présentes dans le dataset d'entraînement
- **139 symptômes** : certains symptômes rares ne sont pas dans la liste
- **Confirmation image limitée** : seules 5 maladies ont un modèle image associé
- **Précision** : les modèles ont été entraînés sur un dataset éducatif (~3 500 patients) — la précision est limitée
- **Pas un diagnostic médical** : les résultats sont purement indicatifs et ne remplacent jamais l'avis d'un médecin

---

## 8. 🔌 API (pour développeurs)

**URL de base** : `http://localhost:8000`

### Endpoints principaux

**Vérifier la santé du serveur :**
```bash
curl http://localhost:8000/api/health
# → {"status": "ok"}
```

**Lister les symptômes disponibles :**
```bash
curl http://localhost:8000/api/symptoms
# → {"symptoms": ["itching", "skin_rash", ...]}
```

**Prédire une maladie à partir de symptômes :**
```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["headache", "chest_pain", "dizziness"]}'
# → {"prediction": "Hypertension", "probabilities": {...}, "risk_level": "High"}
```

**Analyser une image médicale :**
```bash
curl -X POST http://localhost:8000/api/predict/image \
  -F "file=@radiographie.jpg" \
  -F "model_type=chest_xray"
# → {"prediction": "PNEUMONIA", "confidence": 0.9523, ...}
```

**Lister les modèles image disponibles :**
```bash
curl http://localhost:8000/api/predict/image/models
```

**Documentation interactive Swagger :**
→ http://localhost:8000/docs
