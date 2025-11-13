# Christ-Roi Agence - Projet Django + Angular

## Description

Ce projet a été migré d'une architecture Django traditionnelle vers une architecture moderne Django (backend API) + Angular (frontend). Le site présente les services de Christ-Roi Agence spécialisés dans le placement de personnel qualifié.

## Architecture

### Backend (Django)
- **Framework**: Django 5.2.4 avec Django REST Framework
- **Base de données**: SQLite (développement)
- **API**: Endpoints RESTful pour les services, informations de contact et entreprise
- **CORS**: Configuré pour permettre les requêtes depuis Angular

### Frontend (Angular)
- **Framework**: Angular 18+ avec TypeScript
- **Design**: Moderne avec palette de couleurs bleu profond (#0A192F) et bleu vibrant (#64FFDA)
- **Responsive**: Optimisé pour desktop et mobile
- **Animations**: Effets de défilement et micro-interactions

## Structure du Projet

```
chistroi_project/
├── manage.py
├── config/                 # Configuration Django
│   ├── settings/
│   │   └── base.py        # Settings avec API et CORS
│   ├── urls.py
│   └── wsgi.py
├── apps/                   # Applications Django
│   ├── core/              # Application principale
│   │   ├── views.py       # Vues API et templates
│   │   ├── urls.py        # Routes API
│   │   ├── serializers.py # Serializers pour l'API
│   │   └── templates/     # Templates Django (legacy)
│   ├── personnel/
├── frontend/              # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Composants Angular
│   │   │   │   ├── header/
│   │   │   │   ├── hero/
│   │   │   │   └── services/
│   │   │   ├── services/      # Services Angular
│   │   │   │   └── api.service.ts
│   │   │   ├── app.ts
│   │   │   └── app.html
│   │   ├── styles.scss    # Styles globaux
│   │   └── index.html
│   ├── angular.json
│   └── package.json
├── media/                 # Fichiers médias
├── staticfiles/          # Fichiers statiques collectés
└── db.sqlite3            # Base de données
```

## Installation et Démarrage

### Prérequis
- Python 3.11+
- Node.js 20+
- npm

### Backend Django

1. Installer les dépendances Python :
```bash
pip install Django djangorestframework django-cors-headers
```

2. Appliquer les migrations :
```bash
python manage.py migrate
```

3. Démarrer le serveur Django :
```bash
python manage.py runserver 0.0.0.0:8000
```

Le backend sera accessible sur http://localhost:8000

### Frontend Angular

1. Aller dans le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur Angular :
```bash
ng serve --host 0.0.0.0 --port 4200
```

Le frontend sera accessible sur http://localhost:4200

## API Endpoints

### Services
- `GET /api/services/` - Liste des services de l'agence

### Informations de contact
- `GET /api/contact-info/` - Informations de contact

### Informations de l'entreprise
- `GET /api/company-info/` - Informations sur l'entreprise

### Formulaire de contact
- `POST /api/contact-form/` - Traitement des formulaires de contact

## Fonctionnalités

### Design Moderne
- Palette de couleurs professionnelle (bleu profond et vibrant)
- Typographie élégante (Inter + Montserrat)
- Animations fluides et micro-interactions
- Design responsive pour tous les appareils

### Composants Angular
- **Header**: Navigation fixe avec menu responsive
- **Hero**: Section d'accueil avec appel à l'action
- **Services**: Cartes de services avec données de l'API Django

### Intégration API
- Communication seamless entre Angular et Django
- Gestion des erreurs et états de chargement
- Configuration CORS pour le développement

## Développement

### Ajout de nouveaux composants Angular
```bash
ng generate component components/nom-du-composant
```

### Ajout de nouveaux endpoints Django
1. Ajouter la vue dans `apps/core/views.py`
2. Ajouter la route dans `apps/core/urls.py`
3. Créer le serializer si nécessaire dans `apps/core/serializers.py`

## Déploiement

### Production
- Configurer une base de données PostgreSQL
- Utiliser un serveur web (Nginx) pour servir les fichiers statiques
- Compiler Angular en mode production : `ng build --prod`
- Configurer les variables d'environnement pour Django

## Technologies Utilisées

### Backend
- Django 5.2.4
- Django REST Framework
- django-cors-headers
- SQLite (dev) / PostgreSQL (prod)

### Frontend
- Angular 18+
- TypeScript
- SCSS
- Font Awesome
- Google Fonts (Inter, Montserrat)

## Contact

Pour toute question concernant ce projet, contactez Christ-Roi Agence :
- Email: christrioagence@gmail.com
- Téléphone: +225 05 03 97 47 75
- Localisation: Côte d'Ivoire

