// Page de détail d'une offre d'emploi
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Loader2
} from 'lucide-react';

import { OffreEmploi } from '../types';
import { apiService } from '../services/api';
import Truncate from '../components/Truncate';

const OffreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offre, setOffre] = useState<OffreEmploi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOffreDetail = async () => {
      if (!id) {
        setError('ID de l\'offre non spécifié');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const offreDetail = await apiService.getOffreEmploi(parseInt(id));
        setOffre(offreDetail);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'offre:', err);
        setError('Erreur lors du chargement de l\'offre');
      } finally {
        setLoading(false);
      }
    };

    loadOffreDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement de l'offre...</p>
        </div>
      </div>
    );
  }

  if (error || !offre) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Offre non trouvée</h2>
          <p className="text-gray-600 mb-6">{error || 'Cette offre n\'existe pas ou a été supprimée.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux offres
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de l'offre */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Image de l'offre */}
            {offre.photo && (
              <div className="h-64 overflow-hidden">
                <img
                  src={`${window.location.origin}/images/${offre.photo}`}
                  alt={`Image pour ${offre.titre}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="p-8">
              {/* Titre et badge urgence */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {offre.titre}
                  </h1>
                  {apiService.isUrgent(offre) && (
                    <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Urgent - {apiService.formatRelativeDate(offre.date_publication)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {apiService.formatPrice(offre.salaire)}
                  </div>
                  <div className="text-gray-600">FCFA</div>
                </div>
              </div>

              {/* Informations principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Localisation</div>
                    <div className="font-semibold">{offre.lieu || 'Abidjan, Côte d\'Ivoire'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type de contrat</div>
                    <div className="font-semibold">{offre.type_contrat || 'Temps plein'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Publié</div>
                    <div className="font-semibold">{apiService.formatRelativeDate(offre.date_publication)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expérience</div>
                    <div className="font-semibold">{offre.experience_requise || 'Non spécifiée'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description et détails */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale - Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description du poste</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {offre.description}
                  </p>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offre.horaires && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Horaires
                    </h3>
                    <p className="text-gray-700">{offre.horaires}</p>
                  </div>
                )}

                {offre.duree_contrat && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      Durée du contrat
                    </h3>
                    <p className="text-gray-700">{offre.duree_contrat}</p>
                  </div>
                )}

                {offre.competences && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      Compétences requises
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{offre.competences}</p>
                  </div>
                )}

                {offre.qualites && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                      Qualités recherchées
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{offre.qualites}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Informations et contact */}
            <div className="space-y-8">
              {/* Informations rapides */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations rapides</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Salaire</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatPrice(offre.salaire)} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Type contrat</span>
                    <span className="font-semibold text-gray-900">
                      {offre.type_contrat || 'Temps plein'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Publication</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatRelativeDate(offre.date_publication)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Avantages */}
              {offre.avantages && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Avantages</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{offre.avantages}</p>
                  </div>
                </div>
              )}

              {/* Conditions particulières */}
              {offre.conditions_particulieres && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Conditions particulières</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{offre.conditions_particulieres}</p>
                  </div>
                </div>
              )}

              {/* Bouton de contact */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
                <h3 className="text-lg font-bold mb-2">Intéressé par ce poste ?</h3>
                <p className="mb-4 opacity-90">Contactez-nous dès maintenant</p>
                <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Postuler maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffreDetailPage;
