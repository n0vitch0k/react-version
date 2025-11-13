#!/bin/bash

# Script de validation de l'environnement Node.js/Angular
# Généré le 2025-11-05 02:01:39

echo "======================================"
echo "Test de l'Environnement Node.js/Angular"
echo "======================================"
echo ""

# Test 1: Versions
echo "📦 Versions des outils :"
echo "  Node.js: $(node --version)"
echo "  npm: $(npm --version)"
echo "  Angular CLI: $(npx ng version --skip-git 2>/dev/null | grep 'Angular CLI' | cut -d':' -f2 | tr -d ' ')"
echo ""

# Test 2: Installation des dépendances
echo "📥 Vérification des dépendances :"
if [ -d "node_modules" ]; then
    echo "  ✅ Dossier node_modules présent"
    echo "  📊 Nombre de packages: $(ls -1 node_modules | wc -l)"
else
    echo "  ❌ Dossier node_modules manquant"
fi
echo ""

# Test 3: Configuration
echo "⚙️ Configuration :"
if [ -f ".npmrc" ]; then
    echo "  ✅ Fichier .npmrc présent"
    echo "  📄 Contenu :"
    cat .npmrc | sed 's/^/    /'
else
    echo "  ❌ Fichier .npmrc manquant"
fi
echo ""

# Test 4: Build
echo "🔨 Test de compilation :"
if npx ng build --configuration development --progress=false 2>&1 | grep -q "Application bundle generation complete"; then
    echo "  ✅ Compilation réussie"
else
    echo "  ❌ Échec de compilation"
fi
echo ""

# Test 5: Vulnérabilités
echo "🔒 Vérification sécurité :"
VULNS=$(npm audit --json 2>/dev/null | grep -o '"vulnerabilities":[^,]*' | grep -o '[0-9]*' || echo "0")
echo "  📊 Vulnérabilités détectées: $VULNS"
if [ "$VULNS" -eq "0" ]; then
    echo "  ✅ Aucune vulnérabilité"
else
    echo "  ⚠️ Vulnérabilités présentes - Exécutez: npm audit fix"
fi
echo ""

# Test 6: Structure du projet
echo "📁 Structure du projet :"
if [ -f "angular.json" ]; then
    echo "  ✅ angular.json présent"
    echo "  📄 Nom du projet: $(grep -o '"name":"[^"]*"' angular.json | cut -d'"' -f4)"
else
    echo "  ❌ angular.json manquant"
fi
echo ""

# Test 7: Scripts npm
echo "📜 Scripts disponibles :"
echo "  start: $(grep -o '"start":"[^"]*"' package.json | cut -d'"' -f4)"
echo "  build: $(grep -o '"build":"[^"]*"' package.json | cut -d'"' -f4)"
echo "  test: $(grep -o '"test":"[^"]*"' package.json | cut -d'"' -f4)"
echo ""

echo "======================================"
echo "✅ Validation terminée"
echo "======================================"