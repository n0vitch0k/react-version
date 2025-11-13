import React from 'react';
import { X, MapPin, Clock, DollarSign, Calendar, User, CheckCircle, Heart, Download, Award, TrendingUp, Briefcase } from 'lucide-react';
import { OffreEmploi } from '../types';
import { apiService } from '../services/api';
import Truncate from './Truncate';

interface OffreModalProps {
  offre: OffreEmploi | null;
  isOpen: boolean;
  onClose: () => void;
}

const OffreModal: React.FC<OffreModalProps> = ({ offre, isOpen, onClose }) => {
  if (!isOpen || !offre) return null;

  // Gestion robuste de l'overflow et du scroll
  React.useEffect(() => {
    let previousOverflow = '';
    
    if (isOpen) {
      // Sauvegarder l'état actuel de l'overflow
      previousOverflow = document.body.style.overflow || '';
      
      // Bloquer le scroll du body de plusieurs façons pour garantir l'efficacité
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // S'assurer que le focus n'interfère pas
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
    } else {
      // Restaurer l'overflow à la fermeture
      setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.overflow = previousOverflow;
        
        // Force la restoration complète
        if (previousOverflow === '') {
          document.body.style.removeProperty('overflow');
          document.documentElement.style.removeProperty('overflow');
        }
      }, 0);
    }
    
    // Gestion du clavier
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Nettoyage complet
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restoration forcée à la fermeture
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousOverflow;
      
      if (previousOverflow === '') {
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
      }
    };
  }, [isOpen, onClose]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center" onClick={handleOverlayClick}>
      {/* Overlay luxury avec blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal luxury */}
      <div className="relative bg-white rounded-3xl shadow-luxury max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Header luxury */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-gray-900">Détails de l'offre</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            aria-label="Fermer la modal"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="p-8">
            {/* Image de l'offre avec design luxury */}
            {offre.photo && (
              <div className="h-64 overflow-hidden rounded-2xl mb-8 relative group">
                <img
                  src={`/images/plan-moyen-femme-laver-les-vetements.jpg`}
                  alt={`Image pour ${offre.titre}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Titre et badge urgence */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                  {offre.titre}
                </h1>
                {apiService.isUrgent(offre) && (
                  <span className="inline-block px-4 py-2 bg-error-100 text-error-800 rounded-full text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Urgent - {apiService.formatRelativeDate(offre.date_publication)}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-4xl font-display font-bold text-gray-900">
                  {apiService.formatPrice(offre.salaire)}
                </div>
                <div className="text-gray-600">FCFA</div>
              </div>
            </div>

            {/* Informations principales luxury */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm text-gray-600">Localisation</div>
                  <div className="font-semibold text-gray-900">{offre.lieu || 'Abidjan, Côte d\'Ivoire'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-success-50 rounded-xl">
                <Clock className="w-5 h-5 text-success" />
                <div>
                  <div className="text-sm text-gray-600">Type de contrat</div>
                  <div className="font-semibold text-gray-900">{offre.type_contrat || 'Temps plein'}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-xl">
                <Calendar className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-sm text-gray-600">Publié</div>
                  <div className="font-semibold text-gray-900">{apiService.formatRelativeDate(offre.date_publication)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                <User className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Expérience</div>
                  <div className="font-semibold text-gray-900">{offre.experience_requise || 'Non spécifiée'}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                Description du poste
              </h3>
              <div className="card">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {offre.description}
                </p>
              </div>
            </div>

            {/* Informations détaillées en grille luxury */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {offre.horaires && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Horaires
                  </h4>
                  <p className="text-gray-700">{offre.horaires}</p>
                </div>
              )}

              {offre.duree_contrat && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-success" />
                    Durée du contrat
                  </h4>
                  <p className="text-gray-700">{offre.duree_contrat}</p>
                </div>
              )}

              {offre.competences && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    Compétences requises
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{offre.competences}</p>
                </div>
              )}

              {offre.qualites && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    Qualités recherchées
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{offre.qualites}</p>
                </div>
              )}
            </div>

            {/* Sidebar avec informations rapides */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations rapides */}
              <div className="card">
                <h4 className="text-lg font-display font-semibold text-gray-900 mb-4">Informations rapides</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Salaire</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatPrice(offre.salaire)} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Type contrat</span>
                    <span className="font-semibold text-gray-900">
                      {offre.type_contrat || 'Temps plein'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Publication</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatRelativeDate(offre.date_publication)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Avantages et conditions */}
              <div className="space-y-6">
                {offre.avantages && (
                  <div className="card">
                    <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-success" />
                      Avantages
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">{offre.avantages}</p>
                  </div>
                )}

                {offre.conditions_particulieres && (
                  <div className="card">
                    <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-warning" />
                      Conditions particulières
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">{offre.conditions_particulieres}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer luxury avec bouton de contact */}
        <div className="border-t border-gray-100 p-8">
          <div className="card-premium bg-gradient-royal rounded-2xl p-8 text-white text-center">
            <div className="mb-4">
              <Heart className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-display font-semibold mb-2">Intéressé par ce poste ?</h3>
            <p className="mb-6 opacity-90">Contactez-nous dès maintenant</p>
            <button className="w-full bg-white text-primary font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
              Postuler maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreModal;