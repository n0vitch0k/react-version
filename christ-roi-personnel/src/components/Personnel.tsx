import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  Phone,
  AlertCircle,
  Loader2,
  Star,
  CheckCircle,
  Loader,
  Award,
  Heart,
  TrendingUp
} from 'lucide-react';

// Types et services
import { OffreEmploi, ProfilCandidat, FilterOptions, ActiveTab } from '../types';
import { apiService } from '../services/api';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import Truncate from './Truncate';
import OffreModal from './OffreModal';
import CandidatModal from './CandidatModal';

// Composant principal Personnel
const Personnel: React.FC = () => {
  // États principaux
  const [activeTab, setActiveTab] = useState<ActiveTab>('offres');
  const [offres, setOffres] = useState<OffreEmploi[]>([]);
  const [candidats, setCandidats] = useState<ProfilCandidat[]>([]);
  const [totalOffres, setTotalOffres] = useState(0);
  const [totalCandidats, setTotalCandidats] = useState(0);

  // États de chargement et erreurs
  const [loadingStates, setLoadingStates] = useState({
    loadingOffres: false,
    loadingCandidats: false,
    loadingFilterOptions: false
  });

  const [errors, setErrors] = useState({
    errorOffres: '',
    errorCandidats: ''
  });

  // État responsive
  const [isMobile, setIsMobile] = useState(false);

  // États pour les modales
  const [selectedOffre, setSelectedOffre] = useState<OffreEmploi | null>(null);
  const [selectedCandidat, setSelectedCandidat] = useState<ProfilCandidat | null>(null);
  const [isOffreModalOpen, setIsOffreModalOpen] = useState(false);
  const [isCandidatModalOpen, setIsCandidatModalOpen] = useState(false);
  
  // État pour gérer les erreurs de chargement d'images
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  // Hooks personnalisés
  const navigate = useNavigate();
  const location = useLocation();
  const filtersHook = useFilters();
  const paginationHook = usePagination();

  // Options de filtres dynamiques
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    locations: [],
    postesRecherches: [],
    ethniesDisponibles: [],
    religionsDisponibles: [],
    typesContrat: [],
    metiersDisponibles: []
  });

  // Méthodes pour gérer l'affichage responsive
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
    paginationHook.setMobilePageSize(width <= 768);
  }, [paginationHook]);

  // Gestion de la navigation entre onglets
  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'offres') {
      paginationHook.goToFirstPage('offres');
    } else {
      paginationHook.goToFirstPage('candidats');
    }
    // Mettre à jour l'URL sans recharger la page
    const url = new URL(window.location.href);
    url.searchParams.set('view', tab);
    window.history.replaceState(null, '', url.toString());
  }, [paginationHook]);

  // Initialisation depuis l'URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams.get('view');
    if (view === 'offres' || view === 'candidats') {
      setActiveTab(view as ActiveTab);
    }
  }, [location.search]);

  // Initialisation des options de filtres par défaut
  const loadDefaultFilterOptions = useCallback(() => {
    setFilterOptions({
      locations: ['Abidjan Plateau', 'Cocody', 'Marcory', 'Treichville', 'Yopougon', 'Adjame'],
      postesRecherches: ['Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant'],
      ethniesDisponibles: ['Baoulé', 'Baule', 'Dioula', 'Senoufo', 'Dan', 'Ashanti', 'Wé', 'Wolof', 'Sérère', 'Peul', 'Malinké', 'Diola'],
      religionsDisponibles: ['Chrétienne', 'Musulmane', 'Catholique', 'Protestante', 'Évangélique', 'Traditionnelle', 'Animiste'],
      typesContrat: ['Temps plein', 'Temps partiel', 'Journalier'],
      metiersDisponibles: ['Chauffeur', 'Vigile', 'Nounou', 'Femme de ménage', 'Cuisinier', 'Garde d\'enfant']
    });
  }, []);

  // Charger les options de filtres
  const loadFilterOptions = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, loadingFilterOptions: true }));

    try {
      const [offresData, candidatsData] = await Promise.all([
        apiService.getOffresEmploi({}),
        apiService.getCandidats({})
      ]);

      const options = filtersHook.extractFilterOptions(offresData, candidatsData);
      setFilterOptions(options);
    } catch (error) {
      console.error('Erreur chargement options filtres:', error);
      loadDefaultFilterOptions();
    } finally {
      setLoadingStates(prev => ({ ...prev, loadingFilterOptions: false }));
    }
  }, [filtersHook, loadDefaultFilterOptions]);

  // Charger les offres avec filtres
  const loadOffres = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, loadingOffres: true }));
    setErrors(prev => ({ ...prev, errorOffres: '' }));

    try {
      const cleanFilters = filtersHook.getCleanOffresFilters();
      const params = {
        ...cleanFilters,
        page: paginationHook.currentOffresPage,
        page_size: paginationHook.pageSize
      };

      const response = await apiService.getOffresEmploi(params);
      setOffres(response);
      setTotalOffres(response.length);
      paginationHook.setTotalOffres(response.length);
    } catch (error) {
      console.error('Erreur offres:', error);
      setErrors(prev => ({ ...prev, errorOffres: 'Erreur lors du chargement des offres' }));
    } finally {
      setLoadingStates(prev => ({ ...prev, loadingOffres: false }));
    }
  }, [filtersHook, paginationHook]);

  // Charger les candidats avec filtres
  const loadCandidats = useCallback(async () => {
    setLoadingStates(prev => ({ ...prev, loadingCandidats: true }));
    setErrors(prev => ({ ...prev, errorCandidats: '' }));

    try {
      // Validation de la fourchette d'âge
      if (filtersHook.candidatsFilters.age_min !== null && 
          filtersHook.candidatsFilters.age_max !== null && 
          filtersHook.candidatsFilters.age_min > filtersHook.candidatsFilters.age_max) {
        console.warn('Âge minimum supérieur à l\'âge maximum, inversion des valeurs');
      }

      const cleanFilters = filtersHook.getCleanCandidatsFilters();
      const params = {
        ...cleanFilters,
        page: 1,
        page_size: 1000
      };

      const response = await apiService.getCandidats(params);
      
      // Appliquer les filtres côté client
      let candidatsFiltres = filtersHook.applyCandidatsFilters(response);
      
      // Mise à jour des options de filtres dynamiques
      const options = filtersHook.extractFilterOptions([], response);
      setFilterOptions(prev => ({ ...prev, ...options }));

      // Pagination côté client
      const startIndex = (paginationHook.currentCandidatsPage - 1) * paginationHook.pageSize;
      const endIndex = startIndex + paginationHook.pageSize;
      const candidatsPaged = candidatsFiltres.slice(startIndex, endIndex);

      setCandidats(candidatsPaged);
      setTotalCandidats(candidatsFiltres.length);
      paginationHook.setTotalCandidats(candidatsFiltres.length);
    } catch (error) {
      console.error('Erreur candidats:', error);
      setErrors(prev => ({ ...prev, errorCandidats: 'Erreur lors du chargement des candidats' }));
    } finally {
      setLoadingStates(prev => ({ ...prev, loadingCandidats: false }));
    }
  }, [filtersHook, paginationHook]);

  // Recherche pour les offres
  const searchOffres = useCallback(() => {
    paginationHook.goToFirstPage('offres');
    loadOffres();
  }, [paginationHook, loadOffres]);

  // Recherche pour les candidats
  const searchCandidats = useCallback(() => {
    paginationHook.goToFirstPage('candidats');
    loadCandidats();
  }, [paginationHook, loadCandidats]);

  // Ouverture des modales
  const openOffreModal = useCallback((offre: OffreEmploi) => {
    setSelectedOffre(offre);
    setIsOffreModalOpen(true);
  }, []);

  const closeOffreModal = useCallback(() => {
    setSelectedOffre(null);
    setIsOffreModalOpen(false);
    
    // Nettoyer tout état persistant qui pourrait affecter le scroll
    setTimeout(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Remettre le focus sur le body pour éviter les problèmes
      document.body.focus();
    }, 10);
  }, []);

  const openCandidatModal = useCallback((candidat: ProfilCandidat) => {
    setSelectedCandidat(candidat);
    setIsCandidatModalOpen(true);
  }, []);

  const closeCandidatModal = useCallback(() => {
    setSelectedCandidat(null);
    setIsCandidatModalOpen(false);
    
    // Nettoyer tout état persistant qui pourrait affecter le scroll
    setTimeout(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Remettre le focus sur le body pour éviter les problèmes
      document.body.focus();
    }, 10);
  }, []);

  // Méthodes utilitaires pour les photos
  const getPhoto = useCallback((candidat: ProfilCandidat): string | null => {
    const raw = candidat.photo;
    if (!raw || raw.trim() === '') return null;
    
    // Si c'est une URL externe complète
    if (/^https?:\/\//i.test(raw)) return raw;
    
    // Si c'est déjà une URL absolue (commence par /)
    if (raw.startsWith('/')) {
      // URL locale - ne pas utiliser pour les photos candidats
      return null;
    }
    
    // Si c'est un nom de fichier simple ou chemin relatif (comme "photos_candidats/IMG_...jpg")
    if (raw.includes('.')) {
      // Extraire le nom de fichier
      const fileName = raw.split('/').pop() || raw;
      // Construire l'URL Supabase Storage publique
      return `https://nbpdnnskivhsgcibworw.supabase.co/storage/v1/object/public/photos_candidats/${fileName}`;
    }
    
    // Fallback - pas d'URL image
    return null;
  }, []);
  
  // Fonction pour gérer les erreurs de chargement d'images
  const handleImageError = useCallback((candidatId: string) => {
    setImageLoadErrors(prev => new Set([...prev, candidatId]));
  }, []);
  
  // Fonction pour vérifier si une image a une erreur de chargement
  const hasImageError = useCallback((candidatId: string) => {
    return imageLoadErrors.has(candidatId);
  }, [imageLoadErrors]);

  // Méthode pour scroller vers le haut
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Effect pour gérer le redimensionnement
  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  // Effect pour charger les données initiales
  useEffect(() => {
    loadFilterOptions();
    loadOffres();
    loadCandidats();
  }, []); // Charger au montage initial

  // Effect pour recharger les données quand l'onglet change
  useEffect(() => {
    if (activeTab === 'offres') {
      loadOffres();
    } else {
      loadCandidats();
    }
  }, [activeTab, paginationHook.currentOffresPage, paginationHook.currentCandidatsPage, filtersHook.offresFilters, filtersHook.candidatsFilters]);
  
  // Réinitialiser les erreurs d'images quand les candidats changent
  useEffect(() => {
    setImageLoadErrors(new Set());
  }, [candidats]);

  // Constantes calculées
  const stats = useMemo(() => ({
    offresDisplay: `${totalOffres} offres`,
    candidatsDisplay: `${totalCandidats} profils`
  }), [totalOffres, totalCandidats]);

  const isLoading = loadingStates.loadingOffres || loadingStates.loadingCandidats || loadingStates.loadingFilterOptions;
  const hasErrors = errors.errorOffres || errors.errorCandidats;

  return (
    <div className="personnel-container min-h-screen textured-bg">
      {/* ===== HERO SECTION LUXURY ===== */}
      <section className="hero relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Image de fond décorative */}
        <img
          src="/images/femme-de-taille-moyenne-travaillant-dans-l-industrie-des-services.jpg"
          alt="Professionnels au travail"
          className="hero-image"
        />
        
        {/* Overlay gradient royal */}
        <div className="absolute inset-0 bg-gradient-hero"></div>

        <div className="hero-content">
          <h1 className="hero-title text-white animate-fade-in-up">
            Trouvez le job parfait ou le candidat idéal
          </h1>
          
          <p className="hero-subtitle text-blue-100 mb-12 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            À Abidjan, nous connectons simplement les chercheurs d'emploi et les recruteurs. 
            Pas de jargon compliqué, juste des solutions qui marchent.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 animate-fade-in-up animate-delay-300">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-white">500+</div>
              <div className="text-blue-200">Personnes placées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-white">95%</div>
              <div className="text-blue-200">De satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-white">24h</div>
              <div className="text-blue-200">Réponse moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NAVIGATION TABS LUXURY ===== */}
      <section className="py-8 bg-white shadow-luxury relative z-20 -mt-16 mx-6 rounded-2xl">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => handleTabChange('offres')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'offres'
                  ? 'btn-primary shadow-primary scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary hover-lift'
              }`}
            >
              <Briefcase className="w-6 h-6" />
              <div className="text-left">
                <div>Nos profils</div>
                <div className="text-sm opacity-80">{stats.offresDisplay}</div>
              </div>
            </button>

            <button
              onClick={() => handleTabChange('candidats')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'candidats'
                  ? 'bg-secondary text-gray-900 shadow-gold scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-secondary-50 hover:text-secondary hover-lift'
              }`}
            >
              <Users className="w-6 h-6" />
              <div className="text-left">
                <div>Nos offres</div>
                <div className="text-sm opacity-80">{stats.candidatsDisplay}</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="luxury-container py-12">
        
        {/* OFFRES D'EMPLOI */}
        {activeTab === 'offres' && (
          <section className="space-y-8">
            {/* Filtres Avancés */}
            <div className="card-premium animate-fade-in-up">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 flex items-center gap-3">
                    <Search className="w-6 h-6 text-primary" />
                    Affinez votre recherche
                  </h3>
                  {filtersHook.hasOffresFilters && (
                    <button
                      onClick={() => {
                        filtersHook.clearOffresFilters();
                        searchOffres();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Effacer les filtres
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Recherche */}
                  <div className="lg:col-span-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Rechercher un métier, un lieu..."
                        value={filtersHook.offresFilters.search}
                        onChange={(e) => filtersHook.updateOffresFilters('search', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchOffres()}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Localisation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={filtersHook.offresFilters.lieu}
                        onChange={(e) => {
                          filtersHook.updateOffresFilters('lieu', e.target.value);
                          searchOffres();
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Partout à Abidjan</option>
                        {filterOptions.locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Salaire min/max */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salaire minimum</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Montant min"
                        value={filtersHook.offresFilters.salaire_min}
                        onChange={(e) => filtersHook.updateOffresFilters('salaire_min', e.target.value)}
                        onBlur={searchOffres}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salaire maximum</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Montant max"
                        value={filtersHook.offresFilters.salaire_max}
                        onChange={(e) => filtersHook.updateOffresFilters('salaire_max', e.target.value)}
                        onBlur={searchOffres}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Type de contrat */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={filtersHook.offresFilters.type_contrat}
                        onChange={(e) => {
                          filtersHook.updateOffresFilters('type_contrat', e.target.value);
                          searchOffres();
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Tous les contrats</option>
                        <option value="Temps plein">Temps plein</option>
                        <option value="Temps partiel">Temps partiel</option>
                        <option value="Journalier">Journalier</option>
                      </select>
                    </div>
                  </div>

                  {/* Métier */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poste proposé</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={filtersHook.offresFilters.metier}
                        onChange={(e) => {
                          filtersHook.updateOffresFilters('metier', e.target.value);
                          searchOffres();
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Tous les métiers</option>
                        {filterOptions.metiersDisponibles.map(metier => (
                          <option key={metier} value={metier}>{metier}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="space-y-6">
              {/* État Chargement */}
              {loadingStates.loadingOffres && (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">On cherche les meilleures offres pour vous...</p>
                </div>
              )}

              {/* État Erreur */}
              {errors.errorOffres && (
                <div className="error-state animate-fade-in-up">
                  <AlertCircle className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Une erreur s'est produite</h4>
                    <p>{errors.errorOffres}</p>
                    <button
                      onClick={loadOffres}
                      className="mt-2 px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition-colors"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              )}

              {/* État Vide */}
              {!loadingStates.loadingOffres && !errors.errorOffres && offres.length === 0 && (
                <div className="card text-center py-12 animate-fade-in-up">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-display font-semibold text-gray-700 mb-2">Aucune offre trouvée</h4>
                  <p className="text-gray-500 mb-6">Essayez de modifier vos critères de recherche</p>
                  <button
                    onClick={() => {
                      filtersHook.clearOffresFilters();
                      searchOffres();
                    }}
                    className="btn-primary"
                  >
                    Voir toutes les offres
                  </button>
                </div>
              )}

              {/* Grille des Offres */}
              {!loadingStates.loadingOffres && offres.length > 0 && (
                <div className="grid-3">
                  {offres.map((offre, index) => (
                    <article
                      key={offre.id}
                      onClick={() => openOffreModal(offre)}
                      className="card hover-lift cursor-pointer group animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden rounded-xl">
                        <img
                          src={`/images/plan-moyen-femme-laver-les-vetements.jpg`}
                          alt={`Image pour l'offre ${offre.titre}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {apiService.formatRelativeDate(offre.date_publication)}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                          {offre.titre}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {offre.lieu || 'Abidjan'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {offre.type_contrat || 'Temps plein'}
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">
                          <Truncate limit={100}>{offre.description}</Truncate>
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {offre.experience_requise && (
                            <span className="px-3 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                              {offre.experience_requise}
                            </span>
                          )}
                          {offre.horaires && (
                            <span className="px-3 py-1 bg-success-100 text-success-800 text-xs rounded-full">
                              {offre.horaires}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-display font-bold text-gray-900">
                            {apiService.formatPrice(offre.salaire)} <span className="text-lg text-gray-600">FCFA</span>
                          </div>
                          <button className="btn-primary flex items-center gap-2">
                            Voir l'offre
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loadingStates.loadingOffres && offres.length > 0 && (
                <Pagination 
                  pagination={paginationHook}
                  type="offres"
                  onPageChange={(page) => paginationHook.goToPage(page, 'offres')}
                />
              )}
            </div>
          </section>
        )}

        {/* CANDIDATS */}
        {activeTab === 'candidats' && (
          <section className="space-y-8">
            {/* Filtres Candidats */}
            <div className="card-premium animate-fade-in-up">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 flex items-center gap-3">
                    <Search className="w-6 h-6 text-secondary" />
                    Recherchez le talent idéal
                  </h3>
                  {filtersHook.hasCandidatsFilters && (
                    <button
                      onClick={() => {
                        filtersHook.clearCandidatsFilters();
                        searchCandidats();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Effacer les filtres
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Recherche */}
                  <div className="lg:col-span-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Rechercher un métier, une compétence..."
                        value={filtersHook.candidatsFilters.search}
                        onChange={(e) => filtersHook.updateCandidatsFilters('search', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchCandidats()}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Métier recherché */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Métier recherché</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={filtersHook.candidatsFilters.poste_recherche}
                        onChange={(e) => {
                          filtersHook.updateCandidatsFilters('poste_recherche', e.target.value);
                          searchCandidats();
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                      >
                        <option value="">Tous les métiers</option>
                        {filterOptions.postesRecherches.map(poste => (
                          <option key={poste} value={poste}>{poste}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Âge min/max */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Âge minimum</label>
                    <input
                      type="number"
                      placeholder="Âge min"
                      value={filtersHook.candidatsFilters.age_min ?? ''}
                      onChange={(e) => filtersHook.updateCandidatsFilters('age_min', apiService.parseNumber(e.target.value))}
                      onBlur={searchCandidats}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                      min="18"
                      max="65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Âge maximum</label>
                    <input
                      type="number"
                      placeholder="Âge max"
                      value={filtersHook.candidatsFilters.age_max ?? ''}
                      onChange={(e) => filtersHook.updateCandidatsFilters('age_max', apiService.parseNumber(e.target.value))}
                      onBlur={searchCandidats}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                      min="18"
                      max="65"
                    />
                  </div>

                  {/* Salaire min/max */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salaire souhaité (min)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Montant min"
                        value={filtersHook.candidatsFilters.salaire_min ?? ''}
                        onChange={(e) => filtersHook.updateCandidatsFilters('salaire_min', apiService.parseNumber(e.target.value))}
                        onBlur={searchCandidats}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salaire souhaité (max)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        placeholder="Montant max"
                        value={filtersHook.candidatsFilters.salaire_max ?? ''}
                        onChange={(e) => filtersHook.updateCandidatsFilters('salaire_max', apiService.parseNumber(e.target.value))}
                        onBlur={searchCandidats}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Ethnie */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ethnie</label>
                    <select
                      value={filtersHook.candidatsFilters.ethnie}
                      onChange={(e) => {
                        filtersHook.updateCandidatsFilters('ethnie', e.target.value);
                        searchCandidats();
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                      <option value="">Toutes les ethnies</option>
                      {filterOptions.ethniesDisponibles.map(ethnie => (
                        <option key={ethnie} value={ethnie}>{ethnie}</option>
                      ))}
                    </select>
                  </div>

                  {/* Religion */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
                    <select
                      value={filtersHook.candidatsFilters.religion}
                      onChange={(e) => {
                        filtersHook.updateCandidatsFilters('religion', e.target.value);
                        searchCandidats();
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                      <option value="">Toutes les religions</option>
                      {filterOptions.religionsDisponibles.map(religion => (
                        <option key={religion} value={religion}>{religion}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats Candidats */}
            <div className="space-y-6">
              {/* États similaires aux offres */}
              {loadingStates.loadingCandidats && (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">On recherche les meilleurs profils...</p>
                </div>
              )}

              {errors.errorCandidats && (
                <div className="error-state animate-fade-in-up">
                  <AlertCircle className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Une erreur s'est produite</h4>
                    <p>{errors.errorCandidats}</p>
                    <button
                      onClick={loadCandidats}
                      className="mt-2 px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition-colors"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              )}

              {!loadingStates.loadingCandidats && !errors.errorCandidats && candidats.length === 0 && (
                <div className="card text-center py-12 animate-fade-in-up">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-display font-semibold text-gray-700 mb-2">Aucun candidat trouvé</h4>
                  <p className="text-gray-500 mb-6">Essayez d'élargir vos critères de recherche</p>
                  <button
                    onClick={() => {
                      filtersHook.clearCandidatsFilters();
                      searchCandidats();
                    }}
                    className="btn-secondary"
                  >
                    Voir tous les candidats
                  </button>
                </div>
              )}

              {/* Grille des Candidats */}
              {!loadingStates.loadingCandidats && candidats.length > 0 && (
                <div className="grid-3">
                  {candidats.map((candidat, index) => (
                    <article
                      key={candidat.id}
                      onClick={() => openCandidatModal(candidat)}
                      className="card hover-lift cursor-pointer group animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                              {getPhoto(candidat) && !hasImageError(String(candidat.id)) ? (
                                <img
                                  src={getPhoto(candidat)!}
                                  alt={`Photo de ${candidat.prenom}`}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(String(candidat.id))}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-primary-600 text-2xl font-bold">
                                  {candidat.prenom.charAt(0)}{candidat.nom.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                              candidat.disponible ? 'bg-success-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-semibold text-gray-900">{candidat.prenom} {candidat.nom}</h3>
                            <p className="text-gray-600">{candidat.age} ans</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full">
                            {candidat.poste_recherche}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {candidat.annees_experience || 0} an(s) d'exp.
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {apiService.formatPrice(candidat.salaire_souhaite)} FCFA
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">
                          <Truncate limit={80}>{candidat.experience || 'Expérience diversifiée'}</Truncate>
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidat.competences?.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {(candidat.competences?.length || 0) > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{(candidat.competences?.length || 0) - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            candidat.disponible 
                              ? 'bg-success-100 text-success-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {candidat.disponible ? 'Disponible maintenant' : 'En poste'}
                          </div>
                          <button className="btn-secondary flex items-center gap-2">
                            Voir le profil
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loadingStates.loadingCandidats && candidats.length > 0 && (
                <Pagination 
                  pagination={paginationHook}
                  type="candidats"
                  onPageChange={(page) => paginationHook.goToPage(page, 'candidats')}
                />
              )}
            </div>
          </section>
        )}
      </main>

      {/* ===== SECTION FAQ & CONTACT LUXURY ===== */}
      <section className="section bg-gradient-base">
        <div className="luxury-container">
          {/* En-tête principal */}
          <div className="section-header animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-primary-300 w-16"></div>
              <Star className="w-8 h-8 text-primary" />
              <div className="h-px bg-primary-300 w-16"></div>
            </div>
            <h2 className="section-title">
              Une question ? Des besoins ?
            </h2>
            <p className="section-subtitle">
              Nous sommes là pour vous accompagner dans votre projet professionnel
            </p>
            <div className="section-divider"></div>
          </div>

          <div className="grid-2">
            {/* FAQ Section */}
            <div className="space-y-6 animate-fade-in-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900">Questions fréquentes</h3>
              </div>
              
              <div className="space-y-4">
                <div className="card">
                  <h4 className="font-display font-semibold text-gray-900 mb-2">Comment fonctionne le placement ?</h4>
                  <p className="text-gray-600">Nous évaluons vos besoins et vous connectons avec les profils qui correspondent parfaitement à vos critères.</p>
                </div>

                <div className="card">
                  <h4 className="font-display font-semibold text-gray-900 mb-2">Combien de temps pour trouver un emploi ?</h4>
                  <p className="text-gray-600">En moyenne, nos candidats trouvent un emploi sous 72 heures. Tout dépend du poste et de votre profil.</p>
                </div>

                <div className="card">
                  <h4 className="font-display font-semibold text-gray-900 mb-2">Quels sont vos tarifs ?</h4>
                  <p className="text-gray-600">Nos services sont totalement gratuits pour les chercheurs d'emploi. Contactez-nous pour en savoir plus.</p>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6 animate-fade-in-right">
              <div className="grid grid-cols-1 gap-6">
                <div className="card hover-lift relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-error-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Urgent
                  </div>
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 mb-1">Appelez-nous</h4>
                      <p className="text-lg font-semibold text-gray-900">+225 05 03 97 47 75</p>
                      <p className="text-gray-600">Lun-Ven 8h-18h</p>
                    </div>
                  </div>
                </div>

                <div className="card hover-lift relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-success-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Rapide
                  </div>
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 mb-1">Écrivez-nous</h4>
                      <p className="text-lg font-semibold text-gray-900">christrioagence@gmail.com</p>
                      <p className="text-gray-600">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>

                <div className="card hover-lift relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-secondary-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Agence
                  </div>
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-900 mb-1">Visitez-nous</h4>
                      <p className="text-lg font-semibold text-gray-900">Abidjan, Côte d'Ivoire</p>
                      <p className="text-gray-600">Du lundi au vendredi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Principal */}
              <div className="card-premium bg-gradient-royal p-8 text-white text-center">
                <div className="mb-4">
                  <TrendingUp className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">Prêt à commencer ?</h3>
                <p className="mb-6 opacity-90">
                  Que vous soyez employeur ou demandeur d'emploi, nos experts vous guident vers le succès.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={scrollToTop}
                    className="btn-gold flex items-center gap-2"
                  >
                    Commencer maintenant
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleTabChange('offres')}
                    className="btn-secondary bg-white text-primary border-white hover:bg-gray-100"
                  >
                    Voir les offres
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modales */}
      <OffreModal
        offre={selectedOffre}
        isOpen={isOffreModalOpen}
        onClose={closeOffreModal}
      />

      <CandidatModal
        candidat={selectedCandidat}
        isOpen={isCandidatModalOpen}
        onClose={closeCandidatModal}
      />
    </div>
  );
};

// Composant Pagination séparé
interface PaginationProps {
  pagination: {
    currentOffresPage: number;
    currentCandidatsPage: number;
    totalOffresPages: number;
    totalCandidatsPages: number;
    getVisiblePages: (type: 'offres' | 'candidats') => (number | string)[];
  };
  type: 'offres' | 'candidats';
  onPageChange: (page: number | string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, type, onPageChange }) => {
  const currentPage = type === 'offres' ? pagination.currentOffresPage : pagination.currentCandidatsPage;
  const totalPages = type === 'offres' ? pagination.totalOffresPages : pagination.totalCandidatsPages;
  const visiblePages = pagination.getVisiblePages(type);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          disabled={page === '...'}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            page === currentPage
              ? 'bg-primary text-white'
              : page === '...'
              ? 'cursor-default'
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Personnel;