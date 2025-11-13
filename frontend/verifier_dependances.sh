#!/bin/bash

# Script de vérification et résolution des dépendances frontend
# Date: 2025-11-05

echo "=== Vérification des dépendances Frontend ==="
echo ""

# 1. Vérifier Node.js
echo "1. Vérification de Node.js..."
NODE_VERSION=$(node --version)
echo "   Version Node.js: $NODE_VERSION"

REQUIRED_VERSION="18.0.0"
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    echo "   ✅ Version Node.js compatible"
else
    echo "   ❌ Version Node.js incompatible (requise: >= $REQUIRED_VERSION)"
fi
echo ""

# 2. Installer les dépendances
echo "2. Installation des dépendances..."
if npm install; then
    echo "   ✅ Dépendances installées avec succès"
else
    echo "   ❌ Erreur lors de l'installation"
    exit 1
fi
echo ""

# 3. Vérifier les vulnérabilités de sécurité
echo "3. Audit de sécurité..."
npm audit --audit-level=moderate
echo ""

# 4. Vérifier la compatibilité de ngx-countup
echo "4. Vérification de ngx-countup..."
if npm list ngx-countup > /dev/null 2>&1; then
    NGX_COUNTUP_VERSION=$(npm list ngx-countup --depth=0 --json | jq -r '.dependencies."ngx-countup" // "not found"')
    echo "   Version ngx-countup: $NGX_COUNTUP_VERSION"
    
    # Vérifier si la version d'Angular est compatible
    NGX_COUNTUP_PACKAGE=$(npm view ngx-countup@13.2.0 peerDependencies --json)
    echo "   Peer dependencies ngx-countup: $NGX_COUNTUP_PACKAGE"
    
    if echo "$NGX_COUNTUP_PACKAGE" | grep -q "@angular/core"; then
        echo "   ⚠️  Vérifier manuellement la compatibilité avec Angular 18"
    else
        echo "   ✅ Aucune restriction Angular détectée"
    fi
else
    echo "   ℹ️  ngx-countup non installé"
fi
echo ""

# 5. Test des scripts de build
echo "5. Test des scripts..."
echo "   - Compilation TypeScript: $(npm run build --if-present 2>/dev/null && echo '✅ Succès' || echo '❌ Échec')"
echo "   - Linting: $(npm run lint --if-present 2>/dev/null && echo '✅ Succès' || echo '⚠️ Script non défini')"
echo ""

# 6. Génération du rapport de versions
echo "6. Génération du rapport de versions..."
cat > /workspace/frontend/versions_report.json << EOF
{
  "timestamp": "$(date -Iseconds)",
  "node_version": "$NODE_VERSION",
  "dependencies": {
    "angular": "$(npm list @angular/core --depth=0 --json 2>/dev/null | jq -r '.dependencies."@angular/core" // "not installed"')",
    "typescript": "$(npm list typescript --depth=0 --json 2>/dev/null | jq -r '.dependencies.typescript // "not installed"')",
    "tailwindcss": "$(npm list tailwindcss --depth=0 --json 2>/dev/null | jq -r '.dependencies.tailwindcss // "not installed"')",
    "rxjs": "$(npm list rxjs --depth=0 --json 2>/dev/null | jq -r '.dependencies.rxjs // "not installed"')",
    "ngx-countup": "$(npm list ngx-countup --depth=0 --json 2>/dev/null | jq -r '.dependencies."ngx-countup" // "not installed"')"
  }
}
EOF
echo "   ✅ Rapport généré: versions_report.json"
echo ""

# 7. Recommandations
echo "=== Recommandations ==="
echo ""
echo "1. Si ngx-countup pose problème:"
echo "   - Remplacer par une alternative: ngx-charts, ngx-mat-countup"
echo "   - Ou utiliser countup.js directement"
echo ""
echo "2. Pour les mises à jour:"
echo "   - npm update (pour les patches et minor updates)"
echo "   - npm install <package>@latest (pour les versions majeures)"
echo ""
echo "3. Tests recommandés:"
echo "   - npm test (tests unitaires)"
echo "   - npm run e2e (si configuré)"
echo "   - Test manuel de l'interface utilisateur"
echo ""

echo "=== Fin de l'analyse ==="