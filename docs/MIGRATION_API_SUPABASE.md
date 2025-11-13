# Guide de Migration API - Christ-Roi Agence

## Résumé
Migration complète du backend Django vers Supabase pour l'Agence Christ-Roi. L'API est maintenant hébergée sur Supabase et accessible depuis internet.

## État de la Migration

### ✓ Complété
1. **Base de données Supabase**
   - Tables créées : `offres_emploi`, `profils_candidats`
   - Données migrées : 9 offres d'emploi, 3 profils candidats
   - Politiques RLS configurées pour accès public en lecture

2. **Edge Functions Supabase**
   - `api-offres-emploi` : Liste et détail des offres
   - `api-candidats` : Liste et détail des candidats
   - CORS activé pour accès depuis le frontend

3. **Tests**
   - Tous les endpoints testés et validés
   - Filtres fonctionnels (lieu, type_contrat, salaire, age, etc.)

## URLs API Supabase

### Base URL
```
https://nbpdnnskivhsgcibworw.supabase.co/functions/v1
```

### Endpoints Disponibles

#### Offres d'Emploi
```
# Liste toutes les offres
GET /api-offres-emploi

# Offre spécifique
GET /api-offres-emploi/{id}

# Avec filtres
GET /api-offres-emploi?lieu=Abidjan&type_contrat=temps_plein&salaire_min=300000&salaire_max=500000
```

#### Profils Candidats
```
# Liste tous les candidats
GET /api-candidats

# Candidat spécifique
GET /api-candidats/{id}

# Avec filtres
GET /api-candidats?poste_recherche=Commercial&age_min=25&age_max=40&salaire_min=400000
```

## Authentication
Les Edge Functions requièrent l'authentification via le header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c
```

## Migration du Frontend Angular

### 1. Modifier le Service API

Dans `/workspace/frontend/src/app/services/api.service.ts`, remplacer :

```typescript
// ANCIEN
private baseUrl = 'http://localhost:8000/api';

// NOUVEAU
private supabaseUrl = 'https://nbpdnnskivhsgcibworw.supabase.co/functions/v1';
private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c';

// Ajouter méthode helper pour headers
private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Authorization': `Bearer ${this.supabaseAnonKey}`,
    'Content-Type': 'application/json'
  });
}
```

### 2. Adapter les Méthodes

**Important** : L'API Supabase retourne directement un tableau, pas la structure paginée de Django REST Framework.

#### Option A : Adapter le Frontend (Recommandé)

Modifier les méthodes pour gérer le format de réponse différent :

```typescript
// Offres d'emploi
getOffresEmploi(filters?: any): Observable<OffreEmploi[]> {
  let params = new HttpParams();
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });
  }
  return this.http.get<OffreEmploi[]>(
    `${this.supabaseUrl}/api-offres-emploi`, 
    { params, headers: this.getHeaders() }
  );
}

// Candidats
getCandidats(filters?: any): Observable<ProfilCandidat[]> {
  let params = new HttpParams();
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });
  }
  return this.http.get<ProfilCandidat[]>(
    `${this.supabaseUrl}/api-candidats`, 
    { params, headers: this.getHeaders() }
  );
}

// Offre spécifique
getOffreEmploi(id: number): Observable<OffreEmploi> {
  return this.http.get<OffreEmploi>(
    `${this.supabaseUrl}/api-offres-emploi/${id}`,
    { headers: this.getHeaders() }
  );
}

// Candidat spécifique
getCandidat(id: number): Observable<ProfilCandidat> {
  return this.http.get<ProfilCandidat>(
    `${this.supabaseUrl}/api-candidats/${id}`,
    { headers: this.getHeaders() }
  );
}
```

### 3. Mettre à Jour les Composants

Dans les composants qui utilisent l'API, adapter le traitement des réponses :

**AVANT (avec Django) :**
```typescript
this.apiService.getOffresEmploi().subscribe({
  next: (response) => {
    this.offres = response.results; // Tableau dans response.results
    this.totalCount = response.count;
  }
});
```

**APRÈS (avec Supabase) :**
```typescript
this.apiService.getOffresEmploi().subscribe({
  next: (offres) => {
    this.offres = offres; // Directement un tableau
    this.totalCount = offres.length;
  }
});
```

## Filtres Disponibles

### Offres d'Emploi
- `lieu` : Filtre par lieu (recherche partielle)
- `type_contrat` : Filtre exact (temps_plein, temps_partiel, occasionnel, logé)
- `salaire_min` : Salaire minimum
- `salaire_max` : Salaire maximum

### Profils Candidats
- `poste_recherche` : Filtre par poste recherché (recherche partielle)
- `age_min` : Âge minimum
- `age_max` : Âge maximum
- `salaire_min` : Salaire minimum souhaité
- `salaire_max` : Salaire maximum souhaité

## Exemples d'Appels cURL

### Liste des offres
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c" \
  "https://nbpdnnskivhsgcibworw.supabase.co/functions/v1/api-offres-emploi"
```

### Offre spécifique
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c" \
  "https://nbpdnnskivhsgcibworw.supabase.co/functions/v1/api-offres-emploi/1"
```

### Avec filtres
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c" \
  "https://nbpdnnskivhsgcibworw.supabase.co/functions/v1/api-offres-emploi?type_contrat=temps_plein&salaire_min=300000"
```

## Structure des Données

### OffreEmploi
```json
{
  "id": 1,
  "titre": "Assistant(e) de Direction",
  "description": "Description complète...",
  "lieu": "Abidjan, Côte d'Ivoire",
  "salaire": 450000,
  "type_contrat": "temps_plein",
  "date_publication": "2025-07-12T00:00:00",
  "horaires": "...",
  "experience_requise": "...",
  "competences": "...",
  "avantages": "..."
}
```

### ProfilCandidat
```json
{
  "id": 1,
  "nom": "KOUASSI",
  "prenom": "Marie",
  "age": 28,
  "poste_recherche": "Assistant(e) de Direction",
  "salaire_souhaite": 450000,
  "experience": "5 ans d'expérience...",
  "date_publication": "2025-07-12T00:00:00"
}
```

## Déploiement du Frontend

Après avoir mis à jour le service API :

1. **Build de production**
```bash
cd /workspace/frontend
npm run build
```

2. **Redéployer**
```bash
# Le frontend sera redéployé avec les nouvelles configurations
```

## Notes Importantes

- ⚠️ **Pagination** : L'API Supabase ne retourne pas de pagination. Si vous avez beaucoup de données, envisagez d'ajouter la pagination côté Edge Functions.
- ⚠️ **Photos** : Les chemins des photos pointent toujours vers les fichiers locaux. Vous devrez uploader les photos sur Supabase Storage si nécessaire.
- ⚠️ **Services Core** : Les endpoints `/core/` et `/core/company-info/` n'ont pas été migrés car le modèle Django était vide.

## Support

En cas de problème avec l'API :
1. Vérifier que le header Authorization est bien présent
2. Vérifier les logs Supabase : https://supabase.com/dashboard/project/nbpdnnskivhsgcibworw/logs/edge-functions
3. Tester les endpoints avec cURL pour isoler le problème

---

**Date de migration** : 2025-11-04
**Status** : ✓ Migration backend complétée - Frontend à mettre à jour
