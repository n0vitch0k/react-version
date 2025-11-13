# Plan de Structure de Contenu - Christ-Roi Agence

## Vue d'ensemble du site
**Identité**: Agence de placement familial et de confiance
**Ton**: "Bonjour, nous sommes Christ-Roi" 
**Message clé**: "Nous trouvons la personne qu'il vous faut"

## Architecture du site (MPA)
- **Page d'accueil** (`/`) : Hero + Services + Engagements + Contact
- **Page Personnel** (`/personnel`) : Onglets offres/candidats + filtres + résultats

## Structure détaillée par page

### 1. PAGE D'ACCUEIL (`/`)

#### Section Hero
- **Titre principal**: "Trouvez le bon job ou le bon employé"
- **Sous-titre**: Chez Christ-Roi Agence, nous vous aidons à trouver votre place dans le monde du travail à Abidjan. Des opportunités réelles, un accompagnement personnalisé.
- **CTA**: "Je cherche un emploi" / "Je cherche un employé"
- **Design**: Background avec image décorative + gradient royal/doré

#### Section Services  
- **Titre**: "On vous aide concrètement"
- **2 cartes principales**:
  - "Je cherche un emploi" → Navigation vers `/personnel?view=offres`
  - "Je cherche un employé" → Navigation vers `/personnel?view=candidats`

#### Section Engagements
- **Titre**: "Nos engagements" 
- **3 piliers**:
  1. "On vous écoute vraiment" - Compréhension des besoins
  2. "On est honnête" - Transparence totale
  3. "On vous accompagne" - Support continu

#### Section Contact
- **Titre**: "Contactez-nous"
- **Formulaire de contact** avec validation
- **Informations de contact** (tel, email, adresse, horaires)
- **CTA**: "Prêt à commencer ?"

### 2. PAGE PERSONNEL (`/personnel`)

#### Hero Section
- **Titre**: "Trouvez le job parfait ou le candidat idéal"
- **Stats**: 500+ personnes placées, 95% satisfaction, 24h réponse moyenne

#### Navigation par onglets
- **Onglet "Nos profils"** : Vue candidats (recherche d'emploi)
- **Onglet "Nos offres"** : Vue offres (recherche d'employés)

#### Section Filtres Avancés
- **Recherche textuelle**
- **Filtres contextuels** par type d'onglet
- **Bouton "Effacer les filtres"** si actifs

#### Section Résultats
- **Grille de cartes** avec pagination
- **États de chargement/erreur/vide**
- **Cards optimisées** pour chaque type (offre/candidat)

#### Section FAQ & Contact
- **Questions fréquentes**
- **Contact urgent** (téléphone, email, agence)
- **CTA final** "Prêt à commencer ?"

### 3. MODALES

#### CandidatModal
- **En-tête**: Photo + statut + informations principales
- **Contenu**: Expérience, compétences, informations personnelles
- **Sidebar**: Contact, CV, profil urgent
- **Design**: Luxueux avec accents dorés

#### OffreModal  
- **En-tête**: Titre + badge urgence + salaire
- **Contenu**: Description, détails, avantages
- **Sidebar**: Infos rapides, conditions
- **Footer**: CTA "Postuler maintenant"

## Assets requis
- **Images décoratives**: 3 images fournies par l'utilisateur
- **Icônes**: Lucide React (maintenir cohérence)
- **Couleurs**: Palette royal/doré/blanc texturé
- **Typographies**: Playfair Display + Lato

## Contraintes techniques
- **Conservation totale** de la logique existante
- **Performance**: Animations GPU optimisées
- **Responsive**: Mobile-first avec adaptation
- **Accessibilité**: Standards WCAG respectés