import React, { useState, useCallback } from 'react';
import { X, MapPin, Clock, DollarSign, Calendar, User, Mail, Phone, CheckCircle, Star, Award, Heart, Download } from 'lucide-react';
import { ProfilCandidat } from '../types';
import { apiService } from '../services/api';
import Truncate from './Truncate';

interface CandidatModalProps {
  candidat: ProfilCandidat | null;
  isOpen: boolean;
  onClose: () => void;
}

const CandidatModal: React.FC<CandidatModalProps> = ({ candidat, isOpen, onClose }) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  
  if (!isOpen || !candidat) return null;

  // Réinitialiser l'erreur d'image quand le candidat change
  React.useEffect(() => {
    setImageLoadError(false);
  }, [candidat?.id]);

  // Méthode pour obtenir l'URL de la photo
  const getPhoto = useCallback((candidat: ProfilCandidat): string | null => {
    const raw = candidat.photo;
    if (!raw || raw.trim() === '') return null;
    
    // Si c'est une URL externe complète
    if (/^https?:\/\//i.test(raw)) return raw;
    
    // Si c'est déjà une URL absolue
    if (raw.startsWith('/')) return `${window.location.origin}${raw}`;
    
    // Si c'est un nom de fichier simple, supposer qu'il est dans /photos_candidats/
    if (raw.includes('.') && !raw.startsWith('/')) {
      return `${window.location.origin}/photos_candidats/${raw}`;
    }
    
    return `${window.location.origin}/${raw}`;
  }, []);
  
  // Fonction pour gérer les erreurs d'image
  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

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
              <User className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-semibold text-gray-900">Profil du candidat</h2>
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
            {/* En-tête avec photo et informations de base */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Photo et statut */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow-luxury">
                    {getPhoto(candidat) && !imageLoadError ? (
                      <img
                        src={getPhoto(candidat)!}
                        alt={`Photo de profil de ${candidat.prenom} ${candidat.nom}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold ${
                      getPhoto(candidat) ? 'hidden' : 'flex'
                    }`}>
                      {candidat.prenom.charAt(0)}{candidat.nom.charAt(0)}
                    </div>
                  </div>
                  {candidat.disponible && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Statut */}
                <div className="text-center lg:text-left">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    candidat.disponible 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {candidat.disponible ? 'Disponible maintenant' : 'En poste'}
                  </div>
                  {candidat.disponible && (
                    <div className="flex items-center gap-2 text-success-600 mb-4">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Profil urgent</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations principales */}
              <div className="flex-1">
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                  {candidat.prenom} {candidat.nom}
                </h1>
                
                <div className="text-2xl text-secondary font-semibold mb-6">
                  {candidat.poste_recherche}
                </div>

                {/* Informations personnelles en grille luxury */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-gray-600">Âge</div>
                      <div className="font-semibold text-gray-900">{candidat.age} ans</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-success-50 rounded-xl">
                    <Clock className="w-5 h-5 text-success" />
                    <div>
                      <div className="text-sm text-gray-600">Expérience</div>
                      <div className="font-semibold text-gray-900">{candidat.annees_experience || 0} ans</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-xl">
                    <DollarSign className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-gray-600">Salaire souhaité</div>
                      <div className="font-semibold text-gray-900">{apiService.formatPrice(candidat.salaire_souhaite)} FCFA</div>
                    </div>
                  </div>

                  {candidat.ethnie && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                      <Award className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-sm text-gray-600">Ethnie</div>
                        <div className="font-semibold text-gray-900">{candidat.ethnie}</div>
                      </div>
                    </div>
                  )}

                  {candidat.religion && (
                    <div className="flex items-center gap-3 p-4 bg-info-50 rounded-xl">
                      <Star className="w-5 h-5 text-info" />
                      <div>
                        <div className="text-sm text-gray-600">Religion</div>
                        <div className="font-semibold text-gray-900">{candidat.religion}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Disponible depuis</div>
                      <div className="font-semibold text-gray-900">{apiService.formatRelativeDate(candidat.date_publication)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expérience professionnelle */}
            <div className="mb-8">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                Expérience professionnelle
              </h3>
              <div className="card">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {candidat.experience || 'Aucune expérience spécifiée'}
                </p>
              </div>
            </div>

            {/* Compétences */}
            {candidat.competences && candidat.competences.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <Award className="w-5 h-5 text-secondary" />
                  Compétences
                </h3>
                <div className="flex flex-wrap gap-3">
                  {candidat.competences.map((competence, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Autres informations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {candidat.situation_matrimoniale && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    Situation matrimoniale
                  </h4>
                  <p className="text-gray-700">{candidat.situation_matrimoniale}</p>
                </div>
              )}

              {candidat.maladies && (
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    État de santé
                  </h4>
                  <p className="text-gray-700">{candidat.maladies}</p>
                </div>
              )}
            </div>

            {/* Sidebar avec informations et contact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations personnelles */}
              <div className="card">
                <h4 className="text-lg font-display font-semibold text-gray-900 mb-4">Informations personnelles</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Âge</span>
                    <span className="font-semibold text-gray-900">{candidat.age} ans</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Expérience</span>
                    <span className="font-semibold text-gray-900">
                      {candidat.annees_experience || 0} an{candidat.annees_experience > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Salaire souhaité</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatPrice(candidat.salaire_souhaite)} FCFA
                    </span>
                  </div>
                  {candidat.ethnie && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Ethnie</span>
                      <span className="font-semibold text-gray-900">{candidat.ethnie}</span>
                    </div>
                  )}
                  {candidat.religion && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Religion</span>
                      <span className="font-semibold text-gray-900">{candidat.religion}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact et actions */}
              <div className="space-y-6">
                {/* Contact */}
                <div className="card">
                  <h4 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Contact
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium text-gray-900">{candidat.email}</div>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contacter le candidat
                    </button>
                  </div>
                </div>

                {/* CV */}
                {candidat.cv && (
                  <div className="card">
                    <h4 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-secondary" />
                      CV
                    </h4>
                    <button className="w-full btn-secondary flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger le CV
                    </button>
                  </div>
                )}

                {/* Profil urgent */}
                {candidat.disponible && (
                  <div className="card-premium bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 text-white text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                    <h4 className="text-lg font-display font-semibold mb-2">Profil disponible</h4>
                    <p className="mb-4 opacity-90">Ce candidat est immédiatement disponible pour commencer</p>
                    <button className="w-full bg-white text-success-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
                      Postuler maintenant
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatModal;