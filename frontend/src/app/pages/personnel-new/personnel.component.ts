import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Services
import { ApiService, OffreEmploi, ProfilCandidat } from '../../services/api.service';

// Pipes
import { TruncatePipe } from '../../pipes/truncate.pipe';

// Components
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, CountUpModule],
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelnewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  activeTab: 'offres' | 'candidats' = 'offres';

  // Data
  offres: OffreEmploi[] = [];
  candidats: ProfilCandidat[] = [];
  totalOffres = 0;
  totalCandidats = 0;

  // Filters
  offresFilters = { 
    search: '', 
    lieu: '', 
    salaire_min: '', 
    salaire_max: '', 
    type_contrat: '',
    metier: ''
  };
  
  candidatsFilters: { 
    search: string; 
    poste_recherche: string; 
    salaire_min: number | null; 
    salaire_max: number | null;
    age_min: number | null;
    age_max: number | null;
    ethnie: string;
    religion: string;
  } = { 
    search: '', 
    poste_recherche: '', 
    salaire_min: null, 
    salaire_max: null,
    age_min: null,
    age_max: null,
    ethnie: '',
    religion: ''
  };

  // UI States
  loadingOffres = false;
  loadingCandidats = false;
  loadingFilterOptions = false;
  errorOffres = '';
  errorCandidats = '';

  // Filter Options
  locations: string[] = [];
  postesRecherches: string[] = [];
  ethniesDisponibles: string[] = [];
  religionsDisponibles: string[] = [];
  typesContrat: string[] = [];
  metiersDisponibles: string[] = [];

  // Pagination
  currentOffresPage = 1;
  currentCandidatsPage = 1;
  pageSize = 10;
  totalOffresPages = 0;
  totalCandidatsPages = 0;

  // Responsive state
  isMobile = false;
  screenWidth = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth <= 768;
  }

  ngOnInit() {
    this.setupRouteListener();
    this.loadFilterOptions();
    this.loadInitialData();
    this.setupSearchDebounce();
    this.initializeFaq();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRouteListener() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['view'] && (params['view'] === 'offres' || params['view'] === 'candidats')) {
          this.activeTab = params['view'];
        }
      });
  }

  private setupSearchDebounce() {
    // Debounce pour la recherche automatique (optionnel)
  }

  private loadFilterOptions() {
    this.loadingFilterOptions = true;

    forkJoin({
      offres: this.apiService.getOffresEmploi({}),
      candidats: this.apiService.getCandidats({})
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ({ offres, candidats }) => {
        this.extractFilterOptions(offres, candidats);
        this.loadingFilterOptions = false;
      },
      error: (err) => {
        console.error('Erreur chargement options filtres:', err);
        this.loadingFilterOptions = false;
        this.loadDefaultFilterOptions();
      }
    });
  }



  private loadDefaultFilterOptions() {
    this.locations = ['Abidjan Plateau', 'Cocody', 'Marcory', 'Treichville', 'Yopougon', 'Adjame'];
    this.postesRecherches = ['Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant'];
    this.ethniesDisponibles = ['Baoulé', 'Baule', 'Dioula', 'Senoufo', 'Dan', 'Ashanti', 'Wé', 'Wolof', 'Sérère', 'Peul', 'Malinké', 'Diola'];
    this.religionsDisponibles = ['Chrétienne', 'Musulmane', 'Catholique', 'Protestante', 'Évangélique', 'Traditionnelle', 'Animiste'];
    this.typesContrat = ['Temps plein', 'Temps partiel', 'Journalier'];
    this.metiersDisponibles = ['Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant'];
  }

  // Getters pour les options dynamiques
  get ethniesActives(): string[] {
    return this.ethniesDisponibles.length > 0 ? this.ethniesDisponibles : [
      'Baoulé', 'Baule', 'Dioula', 'Senoufo', 'Dan', 'Ashanti', 'Wé', 'Wolof', 'Sérère', 'Peul', 'Malinké', 'Diola'
    ];
  }

  get religionsActives(): string[] {
    return this.religionsDisponibles.length > 0 ? this.religionsDisponibles : [
      'Chrétienne', 'Musulmane', 'Catholique', 'Protestante', 'Évangélique', 'Traditionnelle', 'Animiste'
    ];
  }

  get typesContratActifs(): string[] {
    return this.typesContrat.length > 0 ? this.typesContrat : [
      'Temps plein', 'Temps partiel', 'Journalier'
    ];
  }

  get metiersActifs(): string[] {
    return this.metiersDisponibles.length > 0 ? this.metiersDisponibles : [
      'Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant'
    ];
  }

  get postesRechercheActifs(): string[] {
    return this.postesRecherches.length > 0 ? this.postesRecherches : [
      'Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant'
    ];
  }

  loadInitialData() {
    this.loadingOffres = true;
    this.loadingCandidats = true;

    // Ajuster le pageSize sur mobile
    if (this.isMobile) {
      this.pageSize = 6;
    }

    // Charger les offres
    this.apiService.getOffresEmploi({ page: this.currentOffresPage, page_size: this.pageSize })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.offres = response;
          this.totalOffres = response.length;
          this.totalOffresPages = Math.ceil(response.length / this.pageSize);
          this.loadingOffres = false;
        },
        error: (err) => {
          console.error('Erreur offres:', err);
          this.errorOffres = 'Erreur lors du chargement des offres';
          this.loadingOffres = false;
        }
      });

    // Charger les candidats
    this.apiService.getCandidats({ page: 1, page_size: 1000 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Appliquer le filtrage si des filtres sont actifs
          let candidatsAAfficher = response;
          if (this.hasCandidatsFilters) {
            candidatsAAfficher = this.appliquerFiltresCandidats(response, this.candidatsFilters);
          }
          
          // Pagination
          const startIndex = (this.currentCandidatsPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          this.candidats = candidatsAAfficher.slice(startIndex, endIndex);
          this.totalCandidats = candidatsAAfficher.length;
          this.totalCandidatsPages = Math.ceil(candidatsAAfficher.length / this.pageSize);
          
          // Mettre à jour les options de filtres avec tous les candidats
          this.updateFilterOptions(response);
          this.loadingCandidats = false;
        },
        error: (err) => {
          console.error('Erreur candidats:', err);
          this.errorCandidats = 'Erreur lors du chargement des candidats';
          this.loadingCandidats = false;
        }
      });
  }

  // Navigation
  setActiveTab(tab: 'offres' | 'candidats') {
    this.activeTab = tab;
    if (tab === 'offres') {
      this.currentOffresPage = 1;
    } else {
      this.currentCandidatsPage = 1;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: tab },
      queryParamsHandling: 'merge'
    });
  }

  // Offres Methods
  loadOffres() {
    this.loadingOffres = true;
    this.errorOffres = '';

    const cleanFilters = Object.fromEntries(
      Object.entries(this.offresFilters).filter(([_, value]) => 
        value !== '' && value !== null && value !== undefined
      )
    );

    const params = {
      ...cleanFilters,
      page: this.currentOffresPage,
      page_size: this.pageSize
    };

    this.apiService.getOffresEmploi(params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.offres = response;
        this.totalOffres = response.length;
        this.totalOffresPages = Math.ceil(response.length / this.pageSize);
        this.loadingOffres = false;
      },
      error: (err) => {
        this.errorOffres = 'Erreur lors du chargement des offres';
        this.loadingOffres = false;
        console.error(err);
      }
    });
  }

  searchOffres() {
    this.currentOffresPage = 1;
    this.loadOffres();
  }

  clearOffresFilters() {
    this.offresFilters = { 
      search: '', 
      lieu: '', 
      salaire_min: '', 
      salaire_max: '', 
      type_contrat: '',
      metier: ''
    };
    this.currentOffresPage = 1;
    this.loadOffres();
  }

  get hasOffresFilters(): boolean {
    return Object.values(this.offresFilters).some(val => 
      val !== '' && val !== null && val !== undefined
    );
  }

  // Candidats Methods
  loadCandidats() {
    this.loadingCandidats = true;
    this.errorCandidats = '';

    // Validation de la fourchette d'âge
    if (this.candidatsFilters.age_min !== null && 
        this.candidatsFilters.age_max !== null && 
        this.candidatsFilters.age_min > this.candidatsFilters.age_max) {
      console.warn('Âge minimum supérieur à l\'âge maximum, inversion des valeurs');
      const tempAge = this.candidatsFilters.age_min;
      this.candidatsFilters.age_min = this.candidatsFilters.age_max;
      this.candidatsFilters.age_max = tempAge;
    }

    // Nettoyage des filtres vides avec gestion correcte des types
    const cleanFilters: any = {};
    Object.entries(this.candidatsFilters).forEach(([key, value]) => {
      if (key === 'salaire_min' || key === 'salaire_max' || key === 'age_min' || key === 'age_max') {
        // Pour les champs numériques, ne pas inclure si null/undefined ou chaîne vide
        if (value !== null && value !== undefined && value !== '') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            cleanFilters[key] = numValue;
          }
        }
      } else {
        // Pour les champs texte, ne pas inclure si chaîne vide
        if (value !== '' && value !== null && value !== undefined) {
          cleanFilters[key] = value;
        }
      }
    });

    const params = {
      ...cleanFilters,
      page: 1, // Charger tous les candidats pour le filtrage côté client
      page_size: 1000 // Charger beaucoup de candidats pour le filtrage
    };

    console.log('Filtres candidats envoyés:', params);

    this.apiService.getCandidats(params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        // Filtrage côté client en attendant la configuration API
        let candidatsFiltres = response;
        
        // Appliquer les filtres localement
        candidatsFiltres = this.appliquerFiltresCandidats(response, this.candidatsFilters);
        
        // Mettre à jour les options de filtres dynamiques
        this.updateFilterOptions(response);
        
        // Pagination côté client
        const startIndex = (this.currentCandidatsPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.candidats = candidatsFiltres.slice(startIndex, endIndex);
        this.totalCandidats = candidatsFiltres.length;
        this.totalCandidatsPages = Math.ceil(candidatsFiltres.length / this.pageSize);
        
        this.loadingCandidats = false;
      },
      error: (err) => {
        this.errorCandidats = 'Erreur lors du chargement des candidats';
        this.loadingCandidats = false;
        console.error(err);
      }
    });
  }

  // Méthode pour appliquer les filtres côté client
  private appliquerFiltresCandidats(candidats: ProfilCandidat[], filters: any): ProfilCandidat[] {
    return candidats.filter(candidat => {
      // Recherche textuelle
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase().trim();
        const fullName = `${candidat.prenom} ${candidat.nom}`.toLowerCase();
        if (!fullName.includes(searchTerm) && 
            !candidat.poste_recherche.toLowerCase().includes(searchTerm) &&
            !candidat.experience.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Poste recherché
      if (filters.poste_recherche && candidat.poste_recherche !== filters.poste_recherche) {
        return false;
      }

      // Salaire min/max
      if (filters.salaire_min !== null) {
        const salaireCandidat = parseFloat(candidat.salaire_souhaite.replace(/[^\d]/g, ''));
        if (isNaN(salaireCandidat) || salaireCandidat < filters.salaire_min) {
          return false;
        }
      }

      if (filters.salaire_max !== null) {
        const salaireCandidat = parseFloat(candidat.salaire_souhaite.replace(/[^\d]/g, ''));
        if (isNaN(salaireCandidat) || salaireCandidat > filters.salaire_max) {
          return false;
        }
      }

      // Âge min/max
      if (filters.age_min !== null && candidat.age < filters.age_min) {
        return false;
      }

      if (filters.age_max !== null && candidat.age > filters.age_max) {
        return false;
      }

      // Ethnie
      if (filters.ethnie && candidat.ethnie !== filters.ethnie) {
        return false;
      }

      // Religion
      if (filters.religion && candidat.religion !== filters.religion) {
        return false;
      }

      return true;
    });
  }

  // Méthode pour mettre à jour les options de filtres
  private updateFilterOptions(candidats: ProfilCandidat[]) {
    // Mettre à jour les ethnies disponibles
    const ethnies = [...new Set(candidats
      .map(c => c.ethnie)
      .filter((e): e is string => !!e && e.trim() !== '')
    )].sort();
    
    if (ethnies.length > 0) {
      this.ethniesDisponibles = ethnies;
    }

    // Mettre à jour les religions disponibles
    const religions = [...new Set(candidats
      .map(c => c.religion)
      .filter((r): r is string => !!r && r.trim() !== '')
    )].sort();
    
    if (religions.length > 0) {
      this.religionsDisponibles = religions;
    }

    // Mettre à jour les postes recherchés
    const postes = [...new Set(candidats
      .map(c => c.poste_recherche)
      .filter((p): p is string => !!p && p.trim() !== '')
    )].sort();
    
    if (postes.length > 0) {
      this.postesRecherches = postes;
    }
  }

  searchCandidats() {
    // Validation avant recherche
    if (this.candidatsFilters.age_min !== null && 
        this.candidatsFilters.age_max !== null && 
        this.candidatsFilters.age_min > this.candidatsFilters.age_max) {
      console.warn('Âge minimum supérieur à l\'âge maximum, inversion des valeurs');
      const tempAge = this.candidatsFilters.age_min;
      this.candidatsFilters.age_min = this.candidatsFilters.age_max;
      this.candidatsFilters.age_max = tempAge;
    }
    
    this.currentCandidatsPage = 1;
    this.loadCandidats();
  }

  clearCandidatsFilters() {
    this.candidatsFilters = { 
      search: '', 
      poste_recherche: '', 
      salaire_min: null, 
      salaire_max: null,
      age_min: null,
      age_max: null,
      ethnie: '',
      religion: ''
    };
    this.currentCandidatsPage = 1;
    this.loadCandidats();
  }
  
  get hasCandidatsFilters(): boolean {
    const f = this.candidatsFilters;
    return !!(f.search || f.poste_recherche || 
              f.salaire_min || f.salaire_max || f.age_min || f.age_max || f.ethnie || f.religion);
  }

  navigateToOffreDetail(id: number) {
    this.router.navigate(['/personnel/offre', id]);
  }

  navigateToCandidatDetail(id: number) {
    this.router.navigate(['/personnel/candidat', id]);
  }

  // Utilitaires
  formatPrice(price: string | number): string {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR').format(numPrice);
  }

  // Méthode pour convertir les chaînes en nombres
  parseNumber(value: string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
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

  private extractFilterOptions(offres: OffreEmploi[], candidats: ProfilCandidat[]) {
    // Locations uniques depuis les offres
    this.locations = [...new Set(offres
      .map(offre => offre.lieu)
      .filter((lieu): lieu is string => !!lieu && lieu.trim() !== '')
    )].sort();

    // Postes recherchés uniques depuis les candidats
    this.postesRecherches = [...new Set(candidats
      .map(candidat => candidat.poste_recherche)
      .filter((poste): poste is string => !!poste && poste.trim() !== '')
    )].sort();

    // Ethnies uniques depuis les candidats
    this.ethniesDisponibles = [...new Set(candidats
      .map(candidat => candidat.ethnie)
      .filter((ethnie): ethnie is string => !!ethnie && ethnie.trim() !== '')
    )].sort();

    // Religions uniques depuis les candidats
    this.religionsDisponibles = [...new Set(candidats
      .map(candidat => candidat.religion)
      .filter((religion): religion is string => !!religion && religion.trim() !== '')
    )].sort();

    // Types de contrat uniques depuis les offres
    this.typesContrat = [...new Set(offres
      .map(offre => offre.type_contrat)
      .filter((type): type is string => !!type && type.trim() !== '')
    )].sort();

    // Métiers uniques depuis les offres et candidats
    const metiersOffres = offres
      .map(offre => offre.titre)
      .filter((titre): titre is string => !!titre && titre.trim() !== '');
    const metiersCandidats = candidats
      .map(candidat => candidat.poste_recherche)
      .filter((poste): poste is string => !!poste && poste.trim() !== '');
    
    this.metiersDisponibles = [...new Set([...metiersOffres, ...metiersCandidats])].sort();
  }

  getPhoto(c: ProfilCandidat): string | null {
    const raw = c.photo;
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    return raw.startsWith('/') ? `${window.location.origin}${raw}` : `${window.location.origin}/${raw}`;
  }

  // Méthode pour scroller en haut (utilisée dans le CTA)
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========== PAGINATION METHODS ==========

  getCurrentRange(type: 'offres' | 'candidats'): { start: number, end: number } {
    const currentPage = type === 'offres' ? this.currentOffresPage : this.currentCandidatsPage;
    const total = type === 'offres' ? this.totalOffres : this.totalCandidats;
    
    const start = ((currentPage - 1) * this.pageSize) + 1;
    const end = Math.min(currentPage * this.pageSize, total);
    
    return { start, end };
  }

  getVisiblePages(type: 'offres' | 'candidats'): (number | string)[] {
    const currentPage = type === 'offres' ? this.currentOffresPage : this.currentCandidatsPage;
    const totalPages = type === 'offres' ? this.totalOffresPages : this.totalCandidatsPages;
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    
    pages.push(1, 2);
    
    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages - 1, totalPages);

    return [...new Set(pages)];
  }

  goToPage(page: number | string, type: 'offres' | 'candidats') {
    const p = Number(page) || 1;
    if (type === 'offres') {
      this.currentOffresPage = p;
      this.loadOffres();
    } else {
      this.currentCandidatsPage = p;
      this.loadCandidats();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(type: 'offres' | 'candidats') {
    if (type === 'offres') {
      if (this.currentOffresPage < this.totalOffresPages) {
        this.currentOffresPage++;
        this.loadOffres();
      }
    } else {
      if (this.currentCandidatsPage < this.totalCandidatsPages) {
        this.currentCandidatsPage++;
        this.loadCandidats();
      }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(type: 'offres' | 'candidats') {
    if (type === 'offres') {
      if (this.currentOffresPage > 1) {
        this.currentOffresPage--;
        this.loadOffres();
      }
    } else {
      if (this.currentCandidatsPage > 1) {
        this.currentCandidatsPage--;
        this.loadCandidats();
      }
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToFirstPage(type: 'offres' | 'candidats') {
    if (type === 'offres') {
      this.currentOffresPage = 1;
      this.loadOffres();
    } else {
      this.currentCandidatsPage = 1;
      this.loadCandidats();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToLastPage(type: 'offres' | 'candidats') {
    if (type === 'offres') {
      this.currentOffresPage = this.totalOffresPages;
      this.loadOffres();
    } else {
      this.currentCandidatsPage = this.totalCandidatsPages;
      this.loadCandidats();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange() {
    this.currentOffresPage = 1;
    this.currentCandidatsPage = 1;
    
    if (this.activeTab === 'offres') {
      this.loadOffres();
    } else {
      this.loadCandidats();
    }
  }

  // Méthode pour améliorer l'accessibilité sur mobile
  handleCardKeydown(event: KeyboardEvent, id: number, type: 'offre' | 'candidat') {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (type === 'offre') {
        this.navigateToOffreDetail(id);
      } else {
        this.navigateToCandidatDetail(id);
      }
    }
  }

  // Méthodes pour les FAQ
  toggleFaq(element: HTMLElement) {
    const faqItem = element.closest('.faq-item');
    if (faqItem) {
      faqItem.classList.toggle('active');
    }
  }

  // Initialiser les FAQ après le chargement du composant
  initializeFaq() {
    setTimeout(() => {
      const faqItems = document.querySelectorAll('[data-faq-item]');
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
          question.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleFaq(question as HTMLElement);
          });
        }
      });
    }, 100);
  }

  // Méthode pour naviguer vers la page d'accueil et scroller vers la section contact
  navigateToContact() {
    // Naviguer vers la page d'accueil avec le hash vers la section contact
    window.location.href = '/#contact';
  }
}