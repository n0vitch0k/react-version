# Spécifications Design - Christ-Roi Agence
## Identité "Luxury & Sophisticated"

### Direction artistique

#### Concept visuel
**Positionnement**: Courtier premium familial de confiance
**Émotion**: Proximité familiale, professionnalisme, sophistication
**Personnalité**: Accessible mais distingé, humain mais expert

#### Esthétique générale
- **Style**: Luxury & Sophisticated
- **Inspirations**: Agences immobilières haut de gamme, cabinets de conseil premium
- **Ambiance**: Chaleureuse mais professionnelle, moderne mais intemporelle
- **Identité**: Premium accessible, luxe familial

### Palette de couleurs (OBLIGATOIRE)

#### Couleurs principales
```css
/* Couleur primale - Bleu Royal */
--color-primary: #4169E1;
--color-primary-light: #5B7CE8;
--color-primary-dark: #364ED6;
--color-primary-50: #EEF2FF;
--color-primary-100: #E0E7FF;
--color-primary-500: #4169E1;
--color-primary-600: #3A5ED6;
--color-primary-700: #2F4CC6;

/* Couleur secondaire - Doré */
--color-secondary: #e1b941;
--color-secondary-light: #F5D56E;
--color-secondary-dark: #C9A632;
--color-secondary-50: #FFFBEB;
--color-secondary-100: #FEF3C7;
--color-secondary-500: #e1b941;
--color-secondary-600: #D2A837;
--color-secondary-700: #B88F2D;

/* Couleur base - Blanc texturé */
--color-base: #FAFAF8;
--color-base-light: #FFFFFF;
--color-base-dark: #F5F4F0;
--color-base-grain: #F7F6F2;

/* Couleurs neutres */
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;

/* Couleurs d'état */
--color-success: #059669;
--color-warning: #D97706;
--color-error: #DC2626;
--color-info: #2563EB;
```

#### Gradients autorisés
```css
/* Gradient principal - Royal vers Doré */
--gradient-royal: linear-gradient(135deg, #4169E1 0%, #e1b941 100%);
--gradient-royal-light: linear-gradient(135deg, #5B7CE8 0%, #F5D56E 100%);
--gradient-hero: linear-gradient(135deg, rgba(65,105,225,0.9) 0%, rgba(225,185,65,0.8) 100%);

/* Gradient de fond subtil */
--gradient-base: linear-gradient(180deg, #FAFAF8 0%, #F7F6F2 100%);
--gradient-card: linear-gradient(145deg, #FFFFFF 0%, #FAFAF8 100%);
```

### Typographie

#### Polices
```css
/* Police titres - Playfair Display */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

/* Police corps - Lato */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
```

#### Hiérarchie typographique
```css
/* Titres principaux (H1) */
.h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-gray-900);
}

/* Titres section (H2) */
.h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-gray-900);
}

/* Titres sous-section (H3) */
.h3 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-gray-800);
}

/* Texte corps */
.body {
  font-family: 'Lato', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-gray-700);
}

/* Texte corps small */
.body-small {
  font-family: 'Lato', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-gray-600);
}

/* Boutons */
.button {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.01em;
}
```

### Espacement et layout

#### Échelle d'espacement
```css
/* Système d'espacement généreux (8px base) */
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-12: 6rem;    /* 96px */
--space-16: 8rem;    /* 128px */
--space-20: 10rem;   /* 160px */
--space-24: 12rem;   /* 192px */
```

#### Container et grilles
```css
/* Conteneur principal */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Grille standard */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }

/* Flexbox */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
```

### Composants

#### Cartes (Cards)
```css
.card {
  background: var(--color-base-light);
  border-radius: 1.5rem;
  padding: var(--space-6);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-gray-100);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: var(--color-primary-200);
}

.card-premium {
  background: linear-gradient(145deg, #FFFFFF 0%, #FAFAF8 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.card-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1.5rem;
  padding: 2px;
  background: var(--gradient-royal);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  z-index: -1;
}
```

#### Boutons
```css
/* Bouton principal */
.btn-primary {
  background: var(--gradient-royal);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: 0.75rem;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(65, 105, 225, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(65, 105, 225, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(65, 105, 225, 0.2);
}

/* Bouton secondaire */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border: 2px solid var(--color-primary);
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

/* Bouton dorure */
.btn-gold {
  background: var(--color-secondary);
  color: var(--color-gray-900);
  padding: var(--space-3) var(--space-6);
  border-radius: 0.75rem;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(225, 185, 65, 0.2);
}

.btn-gold:hover {
  background: var(--color-secondary-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(225, 185, 65, 0.3);
}
```

#### Hero Section
```css
.hero {
  min-height: 100vh;
  background: var(--color-base);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-hero);
  opacity: 0.95;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  line-height: 1.6;
  margin-bottom: var(--space-8);
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.3;
}
```

#### Navigation
```css
.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-gray-200);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-link {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  color: var(--color-gray-700);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-50);
}
```

### Animations et micro-interactions

#### Animations d'apparition
```css
/* Animations fluides 400-600ms */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Classes d'animation */
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Délais d'animation */
.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-500 { animation-delay: 0.5s; }
```

#### Micro-interactions
```css
/* Hover states optimisés GPU */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
}

/* Scale sur hover */
.hover-scale {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Glow effect */
.glow-on-hover {
  transition: box-shadow 0.3s ease;
}

.glow-on-hover:hover {
  box-shadow: 0 0 20px rgba(65, 105, 225, 0.3);
}
```

### Textures et effets

#### Texture grain subtil
```css
/* Background avec grain subtil */
.textured-bg {
  background-color: var(--color-base);
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
  background-size: 20px 20px;
  position: relative;
}

.textured-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0);
  background-size: 15px 15px;
  pointer-events: none;
}
```

#### Ombres subtiles
```css
/* Système d'ombres luxury */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Ombres colorées */
.shadow-primary {
  box-shadow: 0 10px 15px -3px rgba(65, 105, 225, 0.2), 0 4px 6px -2px rgba(65, 105, 225, 0.1);
}

.shadow-gold {
  box-shadow: 0 10px 15px -3px rgba(225, 185, 65, 0.2), 0 4px 6px -2px rgba(225, 185, 65, 0.1);
}
```

### Responsive design

#### Breakpoints
```css
/* Système responsive */
@media (max-width: 640px) {
  /* Mobile - Réduire espacement de 40% */
  .container {
    padding: 0 var(--space-4);
  }
  
  .hero-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) {
  /* Tablet */
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  /* Desktop */
  .container {
    padding: 0 var(--space-8);
  }
}
```

#### Adaptations mobile
- **Espacement**: Réduction de 40% sur mobile
- **Typographie**: clamp() pour responsive
- **Grilles**: Passage en colonne unique
- **Hero**: Adaptation height minimum
- **Navigation**: Hamburger menu sur mobile

### États et interactions

#### États de chargement
```css
/* Skeleton loading */
.skeleton {
  background: linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-100) 50%, var(--color-gray-200) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Spinner luxury */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-gray-200);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

#### États d'erreur
```css
.error-state {
  background: var(--color-error);
  color: white;
  padding: var(--space-4);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

### Performance et optimisations

#### GPU Acceleration
```css
/* Utiliser transform et opacity uniquement pour animations */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

#### Lazy loading
- Images avec `loading="lazy"`
- Intersection Observer pour animations
- Code splitting par route

### Accessibilité

#### Standards WCAG
- **Contraste**: Minimum 4.5:1
- **Focus**: Visible et cohérent
- **Navigation**: Clavier complète
- **Aria**: Labels appropriés
- **Alt text**: Images descriptives

```css
/* Focus visible */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Skip to content */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-to-content:focus {
  top: 6px;
}
```

### Images et assets

#### Traitement des images
- **Format**: WebP avec fallback
- **Optimisation**: Lazy loading
- **Responsive**: srcset pour différentes tailles
- **Alt text**: Descriptif et contextuel

#### Icônes
- **Bibliothèque**: Lucide React (maintenir cohérence)
- **Taille standard**: 20px, 24px, 32px
- **Couleurs**: inherit ou couleurs définies
- **États**: Hover et active appropriés

Cette spécification garantit une refonte "Luxury & Sophisticated" tout en préservant la fonctionnalité existante.