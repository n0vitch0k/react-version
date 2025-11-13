# Guide de Résolution des Conflits de Dépendances

## Problème principal identifié : ngx-countup

### Symptômes
- Erreurs lors du build ou runtime
- Incompatibilité avec Angular 18
- Problèmes de compilation TypeScript

### Solutions

#### Option 1 : Remplacer ngx-countup (Recommandée)
```bash
# Supprimer ngx-countup
npm uninstall ngx-countup

# Installer une alternative compatible Angular 18
npm install @ctrl ngx-countup
# ou
npm install ngx-mat-countup
# ou utiliser countup.js directement
npm install countup.js
```

#### Option 2 : Compatibilité forcée (Risquée)
```bash
# Ignorer les peer dependencies (non recommandé pour la production)
npm install ngx-countup --legacy-peer-deps
```

#### Option 3 : Utilisation directe de countup.js
```typescript
// Remplacer les composants ngx-countup par countup.js direct
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-counter',
  template: '<span>{{ value }}</span>'
})
export class CounterComponent {
  value = 0;
  counter: CountUp;

  ngOnInit() {
    this.counter = new CountUp('counter', 100);
    this.counter.start();
  }
}
```

## Problème secondaire : Versions rxjs

### Vérification
```bash
npm list rxjs
```

### Solution si problème
```bash
# Forcer une version spécifique
npm install rxjs@7.8.1 --save
```

## Scripts de maintenance

### Installation propre
```bash
# Nettoyer et réinstaller
npm run clean:install
```

### Mise à jour Angular
```bash
# Vérifier les mises à jour
ng update

# Mettre à jour Angular spécifiquement
npm run update:angular
```

### Audit de sécurité
```bash
# Vérifier les vulnérabilités
npm run check:audit

# Corriger automatiquement (si possible)
npm audit fix
```

## Commandes de diagnostic

### Vérifier les versions
```bash
# Versions installées
npm list --depth=0

# Versions disponibles
npm outdated

# Versions Angular
ng version
```

### Tester la compatibilité
```bash
# Build de test
npm run build

# Tests unitaires
npm run test

# Tests en mode CI
npm run test:ci
```

## Stratégies de prévention

### 1. Vérification avant installation
```bash
# Vérifier les peer dependencies
npm view <package> peerDependencies
```

### 2. Utilisation des resolutions (Yarn)
```json
{
  "resolutions": {
    "ngx-countup": "13.2.0"
  }
}
```

### 3. Tests en environnement de développement
```bash
# Toujours tester après mise à jour
npm run test && npm run build
```

### 4. Documentation des versions
- Garder un changelog des modifications
- Documenter les remplacements de packages
- Maintenir un guide de migration

## Alternatives recommandées pour ngx-countup

### 1. @ctrl/ngx-countup
- Plus maintenu
- Compatible Angular 18+
- API similaire

### 2. ngx-mat-countup
- Spécifique à Angular Material
- Style cohérent avec Material Design

### 3. countup.js (direct)
- Plus de contrôle
- Pas de dépendance Angular
- Compatible avec tous les frameworks

## Plan de migration

### Phase 1 : Préparation
1. Identifier tous les usages de ngx-countup
2. Créer des tests de régression
3. Sauvegarder le code existant

### Phase 2 : Remplacement
1. Installer la nouvelle bibliothèque
2. Modifier les imports
3. Ajuster les templates

### Phase 3 : Tests
1. Exécuter tous les tests
2. Vérifier l'interface utilisateur
3. Tester sur différents navigateurs

### Phase 4 : Production
1. Déployer en staging
2. Surveiller les logs
3. Déployer en production

## Contact et support

En cas de problème persistant :
1. Consulter la documentation officielle
2. Vérifier les issues GitHub du package
3. Considérer l'aide de la communauté Angular