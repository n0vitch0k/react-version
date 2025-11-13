# Content Structure Plan - Christ-Roi Agence

## 1. Material Inventory

**Application React Existante:**
- Structure: React + TypeScript + Vite + Tailwind CSS
- URL déployée: https://816wn8tk0jbg.space.minimax.io
- Composants: HomePage.tsx (495 lignes), Personnel.tsx (1147 lignes)

**Visual Assets:**
- `user_input_files/plan-moyen-femme-laver-les-vetements.jpg` (8.2MB, 4000×4000px) - Femme souriante ménage
- `user_input_files/femme-de-taille-moyenne-travaillant-dans-l-industrie-des-services.jpg` (12MB, 5901×3934px) - Serveuse professionnelle
- `user_input_files/premium_photo-1661611453390-0e5a2e299fac.avif` (65KB) - Cuisinière haut de gamme
- `user_input_files/un-chauffeur-de-taxi-dans-la-voiture.jpg` (18MB, 2808×4096px) - Chauffeur professionnel

**Data Sources:**
- `browser/extracted_content/christ_roi_personnel_page_summary.json` - Statistiques: 500+ placements, 95% satisfaction, 24h réponse
- Supabase Edge Functions: `/api-offres-emploi`, `/api-candidats`

**Content Analysis:**
- Sections identifiées: 8 sections majeures (Hero, Stats, Services, About, Personnel, FAQ, Contact)
- Ton vocal: Familial, proximal ("Bonjour, nous sommes Christ-Roi")
- Volume: ~2500 mots totaux (HomePage + Personnel)
- Type: Mixed (contenu textuel + données dynamiques + visuels)

## 2. Website Structure

**Type:** SPA (Single-Page Application avec routing interne)

**Reasoning:** 
- Application existante utilise React Router avec 2 routes principales
- Navigation fluide via modales (OffreModal, CandidatModal)
- Expérience cohésive centrée sur "courtage de confiance"
- Contenu organisé en sections scrollables avec ancres
- Structure actuelle optimale pour préserver fonctionnalités

## 3. Page/Section Breakdown

### Page 1: Accueil (`/`)

**Purpose:** Établir la confiance premium, présenter les services, capturer leads

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset (Content ONLY) |
|---------|------------------|-------------|-------------------|------------------------------|
| Hero | Luxury Hero (600-800px) | `HomePage.tsx` L31-38 | companyInfo.name, description | - |
| Statistiques | Stats Bar (4 metrics) | `HomePage.tsx` L39-44 | stats.clients, projects, experience, support | - |
| Services | Dual CTA Cards | `HomePage.tsx` L75-83 | Navigation vers candidats/recruteurs | - |
| About | 3-Column Card Grid | `HomePage.tsx` L48-64 | aboutCommitments (icons, titles, descriptions) | - |
| Contact | 2-Column Layout | `HomePage.tsx` L66-72 | contactItems + formulaire | - |
| Footer | Standard Footer | `HomePage.tsx` | Coordonnées + horaires | - |

### Page 2: Personnel (`/personnel`)

**Purpose:** Consultation des offres/profils + contact agence (pas de postulation directe)

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset (Content ONLY) |
|---------|------------------|-------------|-------------------|------------------------------|
| Navigation | Luxury Nav Bar | `Personnel.tsx` L1-29 | Navigation + tabs switcher | - |
| Hero Stats | Compact Stats Bar | `summary.json` key_points[2] | "500+ placements, 95% satisfaction, 24h" | - |
| Tabs Switcher | Horizontal Tabs | `Personnel.tsx` L85-96 | "Je cherche un emploi" / "Je cherche un candidat" | - |
| Filtres (Offres) | Horizontal Filter Bar | `Personnel.tsx` L68-75 | filterOptions (locations, postes, contrats, salaires) | - |
| Filtres (Candidats) | Horizontal Filter Bar | `Personnel.tsx` L68-75 | filterOptions (métiers, âge, salaire, ethnie, religion) | - |
| Grille Offres | Card Grid (3-col) | Supabase `/api-offres-emploi` | titre, localisation, type_contrat, salaire, description | - |
| Grille Candidats | Card Grid (3-col) | Supabase `/api-candidats` | prénom, nom, poste_recherche, experience, disponibilite, salaire_souhaite | Photos candidats (si disponibles via API) |
| Offre Modal | Modal Détail | `OffreModal.tsx` | Détails complets offre + CTA contact agence | - |
| Candidat Modal | Modal Détail | `CandidatModal.tsx` | Profil complet + photo + CTA contact agence | Photo candidat (si disponible) |
| Pagination | Pagination Controls | `Personnel.tsx` usePagination | Navigation pages | - |

**CRITICAL: Visual Asset Classification**

**Content Images (✅ SPECIFIED above):**
- Photos candidats dans les cartes/modales (si fournies par API Supabase)

**Decorative Images (❌ NOT specified - design decisions):**
- Hero backgrounds (abstract, gradient overlays, texture patterns)
- Section dividers, ambient imagery
- Les 4 images professionnelles fournies (`user_input_files/`) seront utilisées comme **décoratives** dans les sections About/Services selon les choix du designer

**FORBIDDEN in this file:**
- ❌ Instructions de styling ("centré", "aligné à gauche", "overlay sombre")
- ❌ Décisions de palette (ces décisions vont dans design-specification.md)
- ❌ Spécifications d'animations ou transitions

**Only specified:**
- ✅ Noms de patterns de composants (Luxury Hero, Stats Bar, Card Grid)
- ✅ Sources de données API et chemins fichiers
- ✅ Photos candidats comme contenu informationnel

## 4. Content Analysis

**Information Density:** Medium-High
- Texte: ~2500 mots (45%)
- Données dynamiques: API Supabase (30% - offres + candidats)
- Visuels: 4 images + photos candidats API (25%)

**Content Balance:**
- **Images fixes:** 4 (15%)
- **Images dynamiques (API):** Variable (candidats)
- **Data/Stats:** 7 métriques clés + données API (30%)
- **Texte:** ~2500 mots (55%)
- **Content Type:** Mixed - Storytelling + Data-driven + Visuel

**Tone & Voice:**
- **Vocabulaire:** "Proximité familiale", "Nous sommes Christ-Roi", "Nous trouvons la personne qu'il vous faut"
- **Ton:** Chaleureux, accessible, professionnel premium
- **Positionnement:** Courtier de confiance (intermédiaire transparent entre employeurs et candidats)

**User Journey:**
1. **Employeur:** Accueil → "Je cherche un candidat" → Filtrer profils → Contact agence pour mise en relation
2. **Candidat:** Accueil → "Je cherche un emploi" → Filtrer offres → Contact agence pour mise en relation

**Key Insight:** Le site ne permet PAS de postulation directe. Toutes les actions mènent au contact agence (téléphone, email, formulaire) pour entretien et formalités.
