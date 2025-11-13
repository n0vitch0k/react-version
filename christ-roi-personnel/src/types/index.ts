// Types du projet Christ-Roi Personnel

export interface OffreEmploi {
  id: number;
  titre: string;
  description: string;
  lieu: string;
  salaire: string;
  type_contrat?: string;
  horaires?: string;
  duree_contrat?: string;
  disponibilite?: string;
  experience_requise?: string;
  competences?: string;
  qualites?: string;
  avantages?: string;
  conditions_particulieres?: string;
  photo?: string;
  date_publication: string;
  date_modification?: string;
}

export interface ProfilCandidat {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  email: string;
  poste_recherche: string;
  salaire_souhaite: string;
  religion?: string;
  ethnie?: string;
  situation_matrimoniale?: string;
  maladies?: string;
  experience: string;
  photo?: string;
  cv?: string;
  date_publication: string;
  annees_experience: number;
  disponible?: boolean;
  competences?: string[];
}

// Interfaces pour les filtres
export interface OffresFilters {
  search: string;
  lieu: string;
  salaire_min: string;
  salaire_max: string;
  type_contrat: string;
  metier: string;
}

export interface CandidatsFilters {
  search: string;
  poste_recherche: string;
  salaire_min: number | null;
  salaire_max: number | null;
  age_min: number | null;
  age_max: number | null;
  ethnie: string;
  religion: string;
}

// Types pour l'état de l'application
export interface LoadingState {
  loadingOffres: boolean;
  loadingCandidats: boolean;
  loadingFilterOptions: boolean;
}

export interface ErrorState {
  errorOffres: string;
  errorCandidats: string;
}

// Pour la pagination
export interface PaginationState {
  currentOffresPage: number;
  currentCandidatsPage: number;
  pageSize: number;
  totalOffresPages: number;
  totalCandidatsPages: number;
}

// Options pour les filtres dynamiques
export interface FilterOptions {
  locations: string[];
  postesRecherches: string[];
  ethniesDisponibles: string[];
  religionsDisponibles: string[];
  typesContrat: string[];
  metiersDisponibles: string[];
}

// Type pour les onglets
export type ActiveTab = 'offres' | 'candidats';

// Pour les données de l'API Supabase
export interface SupabaseApiConfig {
  url: string;
  anonKey: string;
}

// Configuration de l'entreprise
export interface CompanyInfo {
  name: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  hours: string;
  values: string[];
  stats: {
    clients: string;
    projects: string;
    experience: string;
    support: string;
  };
}
