# Guide de Référence - Environnement Node.js/Angular

## 🚀 Commandes Essentielles

### Installation et Configuration
```bash
# Naviguer vers le projet
cd /workspace/frontend

# Installer les dépendances (si nécessaire)
npm ci --legacy-peer-deps

# Vérifier les versions
npx ng version
```

### Développement
```bash
# Serveur de développement
npx ng serve --port 4200

# Compilation pour production
npx ng build --configuration production

# Compilation pour développement
npx ng build --configuration development
```

### Tests et Qualité
```bash
# Exécuter les tests
npx ng test

# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités
npm audit fix --force
```

### Maintenance
```bash
# Nettoyer node_modules et réinstaller
rm -rf node_modules
npm ci --legacy-peer-deps

# Mettre à jour Angular CLI localement
npm update @angular/cli@^18.2.0 --save-dev
```

## ⚠️ Points d'Attention

### 1. Version Node.js Incompatible
- **Actuel**: v18.19.0
- **Requis**: ^18.19.1 || ^20.11.1 || >=22.0.0
- **Solution**: Mettre à jour Node.js vers 18.19.1+ ou 20.11.1+

### 2. Conflit TailwindCSS
- Le projet utilise TailwindCSS v4 mais Angular Build nécessite v2 ou v3
- **Solution temporaire**: Utiliser `--legacy-peer-deps`
- **Solution recommandée**: Downgrader `@tailwindcss/postcss` vers une version compatible

### 3. Vulnérabilités de Sécurité
- 8 vulnérabilités détectées (5 low, 3 moderate)
- **Action**: Exécuter `npm audit fix --force`

## 📁 Fichiers de Configuration

### .npmrc
```
engine-strict=false
ignore-scripts=false
```

### Scripts npm disponibles
- `npm start` : Lance le serveur de développement
- `npm run build` : Compile pour la production
- `npm run watch` : Compile en mode watch
- `npm test` : Lance les tests

## 🔍 Vérification de l'Environnement

Exécuter le script de test :
```bash
bash /workspace/frontend/test_environnement.sh
```

Ou manuellement :
```bash
# Vérifier les versions
node --version  # Doit être >= 18.19.1
npm --version   # >= 8.0.0

# Vérifier l'installation
ls -la node_modules/ | head -5

# Tester la compilation
npx ng build --configuration development
```

## 📊 État Actuel de l'Environnement

✅ **FONCTIONNEL**
- Installation des dépendances : OK
- Angular CLI : OK (v18.2.21)
- Compilation : OK
- Structure du projet : OK

⚠️ **À CORRIGER**
- Version Node.js : 18.19.0 → 18.19.1+
- Vulnérabilités npm : 8 à corriger
- Conflit TailwindCSS : À résoudre

## 🆘 Dépannage

### Problème : "ng: command not found"
```bash
# Solution : Utiliser npx
npx ng [commande]
# ou installer globalement
npm install -g @angular/cli
```

### Problème : Erreur de permissions
```bash
# Vérifier la configuration npm
npm config list
# Corriger le préfixe
npm config set prefix ~/.npm-global
```

### Problème : Échec de compilation
```bash
# Nettoyer et réinstaller
rm -rf node_modules dist
npm ci --legacy-peer-deps
```

## 📝 Logs Importants

Les logs d'installation sont disponibles dans :
- `/home/minimax/.npm/_logs/`

Consulter les logs en cas de problème :
```bash
ls -ltr /home/minimax/.npm/_logs/ | tail -5
```

---
*Dernière mise à jour : 2025-11-05 02:01:39*