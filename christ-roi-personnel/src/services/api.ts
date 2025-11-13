// Service API pour la communication avec Supabase
import { OffreEmploi, ProfilCandidat, SupabaseApiConfig } from '../types';

class ApiService {
  private readonly supabaseUrl = 'https://nbpdnnskivhsgcibworw.supabase.co/functions/v1';
  private readonly supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c';

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.supabaseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Authorization': `Bearer ${this.supabaseAnonKey}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  // Récupérer les offres d'emploi avec filtres
  async getOffresEmploi(filters?: any): Promise<OffreEmploi[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.keys(filters).forEach(key => {
          if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
            params.append(key, String(filters[key]));
          }
        });
      }

      const endpoint = params.toString() ? `/api-offres-emploi?${params.toString()}` : '/api-offres-emploi';
      return await this.fetchWithAuth(endpoint);
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error);
      throw error;
    }
  }

  // Récupérer les profils candidats avec filtres
  async getCandidats(filters?: any): Promise<ProfilCandidat[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.keys(filters).forEach(key => {
          if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
            params.append(key, String(filters[key]));
          }
        });
      }

      const endpoint = params.toString() ? `/api-candidats?${params.toString()}` : '/api-candidats';
      return await this.fetchWithAuth(endpoint);
    } catch (error) {
      console.error('Erreur lors du chargement des candidats:', error);
      throw error;
    }
  }

  // Récupérer une offre spécifique
  async getOffreEmploi(id: number): Promise<OffreEmploi> {
    try {
      return await this.fetchWithAuth(`/api-offres-emploi/${id}`);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'offre:', error);
      throw error;
    }
  }

  // Récupérer un candidat spécifique
  async getCandidat(id: number): Promise<ProfilCandidat> {
    try {
      return await this.fetchWithAuth(`/api-candidats/${id}`);
    } catch (error) {
      console.error('Erreur lors du chargement du candidat:', error);
      throw error;
    }
  }

  // Méthodes utilitaires
  isUrgent(offre: OffreEmploi): boolean {
    const publicationDate = new Date(offre.date_publication);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - publicationDate.getTime()) / (1000 * 3600 * 24));
    return diffInDays < 3; // Offre urgente si publiée il y a moins de 3 jours
  }

  formatPrice(price: string | number): string {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR').format(numPrice);
  }

  formatRelativeDate(dateString: string): string {
    if (!dateString) return 'Date inconnue';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (diffInDays === 0) return 'aujourd\'hui';
    if (diffInDays === 1) return 'hier';
    if (diffInDays < 7) return `il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `il y a ${Math.floor(diffInDays / 7)} semaines`;
    if (diffInDays < 365) return `il y a ${Math.floor(diffInDays / 30)} mois`;
    return `il y a ${Math.floor(diffInDays / 365)} ans`;
  }

  parseNumber(value: string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  }
}

export const apiService = new ApiService();
