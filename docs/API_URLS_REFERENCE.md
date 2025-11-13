# URLs API Supabase - Christ-Roi Agence

## Base URL
```
https://nbpdnnskivhsgcibworw.supabase.co/functions/v1
```

## Authentication Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c
```

## Endpoints

### Offres d'Emploi
- **Liste** : `GET /api-offres-emploi`
- **Détail** : `GET /api-offres-emploi/{id}`
- **Filtres** : `?lieu=...&type_contrat=...&salaire_min=...&salaire_max=...`

### Profils Candidats
- **Liste** : `GET /api-candidats`
- **Détail** : `GET /api-candidats/{id}`
- **Filtres** : `?poste_recherche=...&age_min=...&age_max=...&salaire_min=...&salaire_max=...`

## Configuration Frontend Angular

```typescript
// Dans api.service.ts
private supabaseUrl = 'https://nbpdnnskivhsgcibworw.supabase.co/functions/v1';
private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c';
```

## Données Migrées
- 9 offres d'emploi
- 3 profils candidats

## Dashboard Supabase
https://supabase.com/dashboard/project/nbpdnnskivhsgcibworw
