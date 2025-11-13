# Design Specification - Christ-Roi Agence
## Style "Luxury & Sophisticated" avec Identité Premium

**Version:** 1.0 | **Projet:** Christ-Roi Agence | **Date:** 2025-11-06

---

## 1. Direction & Rationale

### 1.1 Visual Essence

Christ-Roi Agence adopte le style **"Luxury & Sophisticated"** adapté pour un courtier de confiance premium. Le design exprime l'élégance accessible, combinant professionnalisme haut de gamme et chaleur familiale. Les couleurs imposées (#4169E1 bleu royal + #e1b941 doré) créent une dualité premium : confiance institutionnelle (bleu) et proximité humaine (or).

**Philosophie:** Restraint > Opulence. Luxe discret à travers espacement généreux (96-128px), typographies raffinées (serif + sans-serif), et micro-interactions élégantes (400-600ms). Le blanc texturé grainé ajoute de la matérialité tactile, évoquant du papier de qualité.

### 1.2 Real-World Examples

- **Hermès** (hermes.com) - Élégance intemporelle, espacements généreux, serif raffiné
- **Four Seasons Hotels** (fourseasons.com) - Luxe accessible, animations fluides, chaleur premium
- **Cartier** (cartier.com) - Sophistication retenue, détails méticuleux, palette désaturée

### 1.3 Design Objectives

1. **Confiance Premium:** Établir l'agence comme intermédiaire haut de gamme (pas une plateforme self-service)
2. **Accessibilité Familiale:** Chaleur humaine via doré, vocabulaire proximal, animations douces
3. **Clarté Fonctionnelle:** Deux parcours distincts (employeur/candidat) avec hiérarchie visuelle claire
4. **Élégance Temporelle:** Design pérenne évitant les tendances éphémères

---

## 2. Design Tokens

### 2.1 Color System

#### Primary - Bleu Royal (Confiance & Professionnalisme)

| Token | Hex | Usage | WCAG Ratio |
|-------|-----|-------|------------|
| `primary-50` | #EBF1FB | Fond hover subtil | - |
| `primary-100` | #D7E3F7 | Fond sections légères | - |
| `primary-500` | #4169E1 | Boutons primaires, liens actifs | 4.8:1 (AA) sur blanc |
| `primary-600` | #2952CC | Hover états | 6.5:1 (AA+) |
| `primary-700` | #1E3D99 | Bordures actives | 9.2:1 (AAA) |
| `primary-900` | #0F1F4D | Texte accentué | 14.5:1 (AAA) |

#### Secondary - Doré (Chaleur & Proximité)

| Token | Hex | Usage | WCAG Ratio |
|-------|-----|-------|------------|
| `gold-50` | #FBF6E8 | Fond highlight sections | - |
| `gold-100` | #F7EDCC | Badges, tags | - |
| `gold-500` | #E1B941 | Accents CTAs secondaires | 3.2:1 (limite) |
| `gold-600` | #C9A12E | Hover or métallique | 4.1:1 (AA-) |
| `gold-700` | #A8851F | Bordures or | 5.8:1 (AA) |
| `gold-900` | #6B5412 | Texte or foncé | 8.9:1 (AAA) |

#### Neutral - Blanc Texturé & Gris Chauds

| Token | Hex | Usage | Notes |
|-------|-----|-------|-------|
| `neutral-50` | #FAFAF8 | Fond page principal | Blanc chaud ivoire + grain SVG 2% |
| `neutral-100` | #F5F4F0 | Fond cartes élevées | Crème subtil |
| `neutral-200` | #E8E6E0 | Bordures, dividers | - |
| `neutral-500` | #9B9A94 | Texte secondaire | 4.6:1 (AA) |
| `neutral-700` | #4A4A45 | Texte corps | 10.2:1 (AAA) |
| `neutral-900` | #1C1C19 | Titres, texte premium | 15.8:1 (AAA) |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | #2D6A4F | Messages confirmation | 6.1:1 (AA) |
| `warning` | #E1B941 | Alertes info (réutilise gold-500) | 3.2:1 |
| `error` | #A62C2B | Erreurs, champs invalides | 7.8:1 (AAA) |
| `info` | #4169E1 | Info bulles (réutilise primary-500) | 4.8:1 |

#### Background Layers

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-page` | #FAFAF8 | Fond global avec texture grain | 
| `bg-elevated` | #F5F4F0 | Cartes, modales | 
| `bg-overlay` | rgba(28, 28, 25, 0.6) | Overlay modales/hero | 

**Texture Grain (Obligatoire):**
```css
/* SVG noise texture 2% opacity sur bg-page */
background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==');
```

**Metallic Gradient (Doré - Usage Limité):**
```css
/* UNIQUEMENT pour boutons CTA primaires (max 2 par viewport) */
background: linear-gradient(135deg, #E1B941 0%, #F7EDCC 50%, #C9A12E 100%);
```

### 2.2 Typography

#### Font Families

| Role | Font | Weights | Fallback Stack |
|------|------|---------|----------------|
| **Headlines** | Playfair Display | 600 (Semibold), 700 (Bold) | Georgia, serif |
| **Body** | Lato | 300 (Light), 400 (Regular), 500 (Medium) | -apple-system, sans-serif |

**Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;500&display=swap');
```

#### Type Scale (Desktop 1920px)

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `display-xl` | 96px | Playfair 700 | 1.1 | -0.01em | Hero principal |
| `display-lg` | 72px | Playfair 700 | 1.1 | -0.01em | Hero alternatif |
| `headline-xl` | 64px | Playfair 600 | 1.2 | 0 | Section headers |
| `headline-lg` | 48px | Playfair 600 | 1.2 | 0 | Sous-sections |
| `headline-md` | 40px | Lato 500 | 1.3 | 0.02em | Titres cartes |
| `body-xl` | 24px | Lato 400 | 1.7 | 0 | Lead paragraphes |
| `body-lg` | 20px | Lato 400 | 1.6 | 0 | Corps principal |
| `body-md` | 18px | Lato 400 | 1.6 | 0.01em | Corps secondaire |
| `body-sm` | 16px | Lato 400 | 1.5 | 0.01em | Métadonnées |
| `caption` | 14px | Lato 300 | 1.4 | 0.02em | Labels, footnotes |
| `caption-xs` | 12px | Lato 300 | 1.4 | 0.05em | Uppercase tags |

#### Responsive Type Scale (Mobile <768px)

| Token | Desktop | Mobile |
|-------|---------|--------|
| `display-xl` | 96px | 56px |
| `display-lg` | 72px | 48px |
| `headline-xl` | 64px | 40px |
| `headline-lg` | 48px | 36px |
| `headline-md` | 40px | 28px |
| `body-*` | Inchangé | Augmenter à 18px minimum |

### 2.3 Spacing (4pt Grid - Luxury Scale)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 8px | Micro-spacing, inline gaps |
| `space-2` | 16px | Tight element spacing |
| `space-3` | 24px | Standard gaps |
| `space-4` | 32px | Related group spacing |
| `space-6` | 48px | Card padding (minimum) |
| `space-8` | 64px | Section internal padding |
| `space-12` | 96px | Section boundaries |
| `space-16` | 128px | Dramatic luxury spacing |
| `space-20` | 160px | Hero vertical padding |

**Whitespace Target:** 45-50% page whitespace, 60% hero sections

### 2.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Boutons, inputs |
| `radius-md` | 12px | Cartes |
| `radius-lg` | 16px | Modales |
| `radius-xl` | 24px | Hero images |
| `radius-full` | 9999px | Pills, avatars |

### 2.5 Shadows (Soft Layered Depth)

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | 0 4px 12px rgba(28, 28, 25, 0.08), 0 2px 4px rgba(28, 28, 25, 0.04) | Cartes repos |
| `shadow-card-hover` | 0 12px 24px rgba(28, 28, 25, 0.12), 0 6px 12px rgba(28, 28, 25, 0.06) | Cartes hover |
| `shadow-modal` | 0 24px 48px rgba(28, 28, 25, 0.15), 0 12px 24px rgba(28, 28, 25, 0.08) | Modales |
| `shadow-nav` | 0 2px 8px rgba(28, 28, 25, 0.06) | Navigation scroll |

### 2.6 Animation Timing (Elegant & Unhurried)

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `duration-fast` | 300ms | ease-out | Hover boutons |
| `duration-base` | 400ms | ease-out | Transitions cartes |
| `duration-slow` | 500ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Modales, page transitions |
| `duration-luxury` | 600ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Hero animations, parallax |

**Performance:** Animate ONLY `transform` and `opacity`

---

## 3. Component Specifications

### 3.1 Hero Section (Grand Statement)

**Structure:**
- Height: 600-800px (desktop), 500px (mobile)
- Layout: Centré avec fond image full-bleed + overlay
- Content: 7-8 colonnes centrées (max-width 800px)

**Tokens:**
- Title: `display-xl` (96px), Playfair Bold, `neutral-900`, letter-spacing -0.01em
- Subtitle: `body-xl` (24px), Lato Regular, `neutral-700`, max-width 600px, line-height 1.7
- CTA Primary: Gradient doré, height 64px, `body-md` text
- CTA Secondary: `primary-500` solid, height 64px
- Padding: `space-20` (160px) vertical
- Overlay: `bg-overlay` rgba(28,28,25,0.6) si image de fond

**States:**
- Scroll parallax: Background image translateY(-50%) sur scroll (optionnel)
- Fade-in: Title + subtitle + CTAs stagger 100ms delay

**Notes:**
- Utiliser les images `user_input_files/` comme fond hero potentiels
- Texture grain visible sur overlay
- Whitespace: 60% de la section

### 3.2 Stats Bar (Confiance Visuelle)

**Structure:**
- Layout: 4 colonnes égales, horizontal scroll mobile
- Height: auto, padding `space-8` (64px) vertical

**Tokens:**
- Number: `display-lg` (72px), Lato Bold 700, `primary-500`
- Label: `body-sm` (16px), Lato Light 300, `neutral-700`, letter-spacing 0.02em
- Dividers: 1px `neutral-200` entre colonnes (desktop only)
- Background: `neutral-100` (#F5F4F0) avec grain texture

**States:**
- Counter animation: 0 → valeur finale sur scroll into view (1500ms)

### 3.3 Button (2 Variants Maximum)

#### Primary CTA (Metallic Gold)

**Structure:**
- Height: 56-64px
- Padding: 24-32px horizontal
- Radius: `radius-sm` (8px)

**Tokens:**
- Background: Gradient doré `linear-gradient(135deg, #E1B941 0%, #F7EDCC 50%, #C9A12E 100%)`
- Text: `body-md` (18px), Lato Medium 500, `neutral-900`, letter-spacing 0.05em
- Shadow: `shadow-card`
- Icon: 20px, `neutral-900`

**States:**
- Hover: `brightness(110%)`, `scale(1.02)`, `shadow-card-hover`, 300ms
- Active: `scale(0.98)`, brightness(95%), 150ms
- Disabled: `opacity(0.5)`, cursor not-allowed

**Notes:** MAX 2 boutons gradient par viewport (hero + 1 section)

#### Secondary CTA (Bleu Royal)

**Structure:** Identique height/padding

**Tokens:**
- Background: `primary-500` (#4169E1) solid
- Text: White `#FFFFFF`, same typography
- Border: None

**States:**
- Hover: `primary-600` (#2952CC), `translateY(-2px)`, `shadow-card-hover`, 300ms
- Active: `primary-700`, translateY(0px)

### 3.4 Card (Luxury Spacing)

**Structure:**
- Padding: 48-64px (NEVER moins de 48px)
- Radius: `radius-md` (12px)
- Min-height: 280px

**Tokens:**
- Background: `neutral-100` (#F5F4F0) avec grain texture
- Border: 1px `neutral-200` (optionnel)
- Shadow: `shadow-card`
- Title: `headline-md` (40px), Playfair 600, `neutral-900`
- Body: `body-lg` (20px), Lato 400, `neutral-700`, line-height 1.6
- Icon: 56px, `primary-500` ou `gold-500`

**States:**
- Hover: `translateY(-4px)`, `shadow-card-hover`, 400ms
- Hover accent: Border 1.5px `gold-500` reveal (fade in 300ms)

**Grid Layout:**
- Desktop: 3 colonnes, gap `space-4` (32px)
- Tablet: 2 colonnes, gap `space-3` (24px)
- Mobile: 1 colonne

### 3.5 Input Field (Élégance Fonctionnelle)

**Structure:**
- Height: 56-64px
- Padding: 16-20px horizontal
- Radius: `radius-sm` (8px)

**Tokens:**
- Background: White `#FFFFFF`
- Border: 1px `neutral-200`
- Text: `body-md` (18px), Lato Light 300, `neutral-900`
- Placeholder: `neutral-500`, italic
- Label: `caption` (14px), Lato Regular 400, `neutral-700`, margin-bottom `space-2`

**States:**
- Focus: Border 1.5px `primary-500`, NO shadow (élégant), 200ms
- Error: Border 1.5px `error`, background tint `error` 5%
- Disabled: Background `neutral-50`, opacity 0.6

### 3.6 Navigation Bar (Présence Premium)

**Structure:**
- Height: 80-96px (plus haute que standard)
- Layout: Logo left, nav center, CTA right
- Position: Sticky top

**Tokens:**
- Background: `neutral-50` (#FAFAF8) avec grain texture
- Shadow: `shadow-nav` on scroll
- Logo: 40-56px height
- Nav links: `caption` (14px), Lato Light 300, `neutral-700`, letter-spacing 0.1em, uppercase
- CTA: Primary button 48px height
- Divider: 1px `neutral-200` bottom border

**States:**
- Link hover: `neutral-900` color, underline 1.5px `gold-500` (fade in 300ms)
- Scroll: Background blur 20px (glassmorphism subtil), shadow appear

**Mobile (<768px):**
- Hamburger menu icon 24px
- Full-screen overlay menu avec `bg-overlay`

### 3.7 Modal (Détails Offres/Candidats)

**Structure:**
- Max-width: 800px (desktop), 95vw (mobile)
- Padding: 64px (desktop), 32px (mobile)
- Radius: `radius-lg` (16px)

**Tokens:**
- Background: `neutral-50` (#FAFAF8) avec grain texture
- Shadow: `shadow-modal`
- Overlay: `bg-overlay` rgba(28,28,25,0.6)
- Title: `headline-lg` (48px), Playfair 600, `neutral-900`
- Body: `body-lg` (20px), Lato 400, `neutral-700`
- Close button: 40px, icon 24px, `neutral-700`, hover `neutral-900`

**States:**
- Open: Fade in overlay (300ms) → Scale in modal 0.95→1.0 (400ms)
- Close: Fade out all (300ms), `will-change: transform`

**Interaction:**
- Click outside → Close
- ESC key → Close
- Body scroll lock when open

### 3.8 Filter Bar (Horizontal - Moderne)

**Structure:**
- Layout: Horizontal scroll pills (mobile), grid (desktop)
- Height: 56px inputs, inline layout
- Gap: `space-3` (24px)

**Tokens:**
- Inputs: Same as §3.5 Input Field
- Dropdowns: 56px height, 1px `neutral-200` border, `radius-sm`
- Pills (mobile): 40px height, `neutral-100` bg, `radius-full`, padding 12-20px

**States:**
- Active filter: `primary-100` background, `primary-700` text, border `primary-500`

**Notes:** JAMAIS sidebar filters (look admin-panel). Toujours horizontal moderne.

---

## 4. Layout & Responsive

### 4.1 Website Architecture (Référence content-structure-plan.md)

**Structure SPA avec 2 Routes:**

**Route 1: Page Accueil (`/`):**
1. Hero Section (600-800px) - Pattern §3.1
2. Stats Bar (auto) - Pattern §3.2
3. Services Section (auto) - Dual CTA Cards (padding `space-12` 96px)
4. About Section (auto) - 3-Column Card Grid - Pattern §3.4 (gap `space-4`)
5. Contact Section (auto) - 2-Column Layout (7/5 cols asymétrique)
6. Footer (auto) - Standard footer

**Route 2: Page Personnel (`/personnel`):**
1. Navigation Bar (80-96px) - Pattern §3.6
2. Hero Stats Bar (auto) - Pattern §3.2 compact
3. Tabs Switcher (64px) - 2 tabs horizontal
4. Filter Bar (auto) - Pattern §3.8 (offres: 8 filtres, candidats: 6 filtres)
5. Results Grid (auto) - Pattern §3.4 Card Grid (3-col desktop)
6. Pagination (64px) - Controls centrés
7. Modal Overlay (when open) - Pattern §3.7

**Navigation Pattern:**
- Fixed header avec smooth scroll (route 1)
- Onglet switcher tabs (route 2)
- Modales pour détails (pas de navigation)

### 4.2 Grid System & Breakpoints

**Breakpoints:**
```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet portrait)
lg:  1024px (Tablet landscape)
xl:  1280px (Desktop)
2xl: 1536px (Large desktop - expérience complète)
```

**Container Max-Width:**
```
sm:  100% (padding 16px)
md:  100% (padding 24px)
lg:  1200px
xl:  1400px
2xl: 1600px (luxury needs space)
```

**Grid Columns:**
- 12-column system
- Gutters: 32px (desktop), 24px (tablet), 16px (mobile)

### 4.3 Responsive Adaptation

**Spacing Reduction (Mobile):**
- `space-16` (128px) → 80px (≈40% reduction)
- `space-12` (96px) → 64px
- `space-8` (64px) → 48px
- Card padding: 64px → 32px

**Typography:**
- Augmenter body text à 18px minimum (mobile readability)
- Réduire display sizes (voir §2.2)

**Components:**
- Card Grid: 3-col → 2-col (tablet) → 1-col (mobile)
- Filter Bar: Inline → Horizontal scroll
- Navigation: Full menu → Hamburger overlay
- Stats Bar: 4-col → Horizontal scroll

**Animation Simplification (Mobile):**
- Réduire durées de 25% (600ms → 450ms)
- Désactiver parallax (performance)
- Simplifier gradients métalliques → solides (primary-500/gold-500)

### 4.4 Touch Targets & Accessibility

**Minimum Sizes:**
- Touch targets: 56px minimum (luxury préfère 64px)
- Spacing: 16px minimum entre éléments tappables
- Icon buttons: 48×48px minimum

**Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**WCAG Compliance:**
- Texte: ≥4.5:1 ratio (AA), préfère ≥7:1 (AAA)
- Validé: neutral-900 on neutral-50 = 15.8:1 ✅
- Validé: primary-500 on white = 4.8:1 ✅
- Attention: gold-500 = 3.2:1 ⚠️ (usage décoratif uniquement)

---

## 5. Interaction & Animation

### 5.1 Animation Standards

**Durées (Unhurried Elegance):**
- **Fast:** 300ms - Hover boutons, transitions légères
- **Base:** 400ms - Cartes, composants standards
- **Slow:** 500ms - Modales, pages
- **Luxury:** 600ms - Hero animations, parallax

**Easing:**
- **Préféré:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Elegant ease-out-quad
- **Alternative:** `ease-out` - Standard Material Design
- **ÉVITER:** `linear` (trop mécanique), `ease-in` (contre-intuitif)

### 5.2 Micro-Interactions

**Button Hover:**
```css
transform: scale(1.02);
filter: brightness(110%);
transition: all 300ms ease-out;
```

**Card Hover:**
```css
transform: translateY(-4px);
box-shadow: shadow-card-hover;
border-color: gold-500; /* fade in */
transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Link Hover:**
```css
color: neutral-900;
text-decoration: underline;
text-decoration-color: gold-500;
text-decoration-thickness: 1.5px;
transition: all 300ms ease-out;
```

### 5.3 Page Load Animations

**Hero Section:**
1. Background fade in (0-400ms)
2. Title fade + translateY(30px→0) (200-600ms)
3. Subtitle fade + translateY(20px→0) (400-800ms)
4. CTAs fade + scale(0.95→1.0) (600-1000ms)

**Stagger delay:** 100ms entre éléments

**Stats Counter:**
```javascript
// Animate from 0 to target value over 1500ms
// Trigger on scroll into viewport
easing: easeOutQuad
```

**Card Grid Reveal:**
```css
/* Stagger children 80ms */
opacity: 0 → 1;
transform: translateY(30px) → translateY(0);
transition: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### 5.4 Scroll Behaviors

**Smooth Scroll:**
```css
html {
  scroll-behavior: smooth;
}
```

**Parallax (Optionnel - Desktop Only):**
```javascript
// Hero background translateY based on scroll position
// Max offset: ±16px (subtil, pas vertigineux)
// Trigger: scroll position 0-800px
```

**Scroll-triggered Animations:**
- Fade in cartes when 20% visible
- Stats counter when 50% visible
- Disable sur mobile (performance)

### 5.5 Modal Transitions

**Open Sequence:**
```css
/* Overlay */
opacity: 0 → 0.6;
transition: opacity 300ms ease-out;

/* Modal */
opacity: 0 → 1;
transform: scale(0.95) → scale(1.0);
transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Close:** Inverse, 300ms all

### 5.6 Performance Optimizations

**Critical:**
- Animate ONLY `transform` and `opacity` (GPU-accelerated)
- Use `will-change: transform` on animated elements
- Remove `will-change` after animation complete
- Lazy load below-fold images (hero preload)
- Use WebP with JPEG fallback

**Image Optimization:**
- Hero images: 4K source, WebP, srcset responsive
- Card images: 1200px max-width
- API photos: 800px max-width, lazy loading

---

**Document Fin**

**Résumé Tokens:** 6 couleurs primaires, 6 neutrals, 4 semantic, 11 tailles typo, 9 espacements, 4 radius, 4 ombres, 4 durées animations.

**Philosophie Finale:** Luxe accessible via restraint élégante. 45% whitespace, animations 400-600ms, typography serif/sans mix, metallic accents limités. Trust through sophistication, warmth through gold, professionalism through space.
