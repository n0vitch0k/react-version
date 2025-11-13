// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

/** === Interfaces existantes (inchangées) === **/
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
}


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



export interface ApiResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

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

/** Réponse attendue depuis Google Apps Script */
export interface GoogleScriptResponse {
  result: 'success' | 'error';
  row?: number;
  message?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  /** ⚠️ Remplace par l’URL de TON déploiement Apps Script (Web App) */
  private googleScriptUrl = 'https://script.google.com/macros/s/AKfycby62DbqY9VTfEsbFXBgtiHj6XMgYEpWAuneRm21D-Y6Ctj4o0sh7hececyXgNvVoYoNVw/exec';

  /** API Supabase (migrée depuis Django) */
  private supabaseUrl = 'https://nbpdnnskivhsgcibworw.supabase.co/functions/v1';
  private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icGRubnNraXZoc2djaWJ3b3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMjM3OTUsImV4cCI6MjA3NzU5OTc5NX0.ZUlW2oyR8-E2FmAu-ECpvApPzucm6kZ261FYQtMAY5c';

  /** Headers d'authentification Supabase */
  private getSupabaseHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.supabaseAnonKey}`,
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) {}

  /** ========= CONTACT → Google Sheets (corrigé, sans JSONP) ========= */
  async sendContactMessage(formData: any): Promise<GoogleScriptResponse> {
    const ip = await this.getIPAddress().catch(() => 'N/A');
    const payload = { ...formData, ipAddress: ip };
    const body = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== undefined && v !== null) body.append(k, String(v));
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    return await firstValueFrom(
      this.http.post<GoogleScriptResponse>(this.googleScriptUrl, body.toString(), { headers })
    );
  }

  private async getIPAddress(): Promise<string> {
    try {
      const r = await fetch('https://api.ipify.org?format=json');
      const j = await r.json();
      return j?.ip ?? 'N/A';
    } catch {
      return 'N/A';
    }
  }

  /** ========= API Django (inchangé) ========= */

  // Services (API locale django - uniquement pour développement local)
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.supabaseUrl}/api-offres-emploi`);
  }

  // Company Info (API locale django - uniquement pour développement local) 
  getCompanyInfo(): Observable<CompanyInfo> {
    // Utilise des données statiques car l'API Django originale était vide
    const staticCompanyInfo: CompanyInfo = {
      name: "Christ-Roi Agence",
      description: "Spécialisée dans le placement de personnel qualifié",
      email: "christrioagence@gmail.com",
      phone: "+225 05 03 97 47 75",
      location: "Côte d'Ivoire",
      hours: "Lun - Ven: 8h00 - 18h00",
      values: ["Excellence", "Confiance", "Professionnalisme"],
      stats: {
        clients: "500+",
        projects: "50+",
        experience: "5+ ans",
        support: "24/7"
      }
    };
    return new Observable(observer => {
      observer.next(staticCompanyInfo);
      observer.complete();
    });
  }

  // Offres d'emploi avec filtres (API Supabase)
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
      { params, headers: this.getSupabaseHeaders() }
    );
  }

  // Profils candidats avec filtres (API Supabase)
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
      { params, headers: this.getSupabaseHeaders() }
    );
  }



  // Offre d'emploi spécifique (API Supabase)
  getOffreEmploi(id: number): Observable<OffreEmploi> {
    return this.http.get<OffreEmploi>(
      `${this.supabaseUrl}/api-offres-emploi/${id}`,
      { headers: this.getSupabaseHeaders() }
    );
  }

  // Candidat spécifique (API Supabase)
  getCandidat(id: number): Observable<ProfilCandidat> {
    return this.http.get<ProfilCandidat>(
      `${this.supabaseUrl}/api-candidats/${id}`,
      { headers: this.getSupabaseHeaders() }
    );
  }
  // Dans votre composant TypeScript, ajoutez ces méthodes :


isUrgent(offre: OffreEmploi): boolean {
  // Logique pour déterminer si l'offre est urgente
  // Par exemple, si elle a été publiée récemment ou a un flag spécifique
  const publicationDate = new Date(offre.date_publication);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - publicationDate.getTime()) / (1000 * 3600 * 24));
  return diffInDays < 3; // Offre urgente si publiée il y a moins de 3 jours
}

// Pipe de troncation pour le template
// Ajoutez ce pipe dans votre module ou créez une méthode dans le composant
}
