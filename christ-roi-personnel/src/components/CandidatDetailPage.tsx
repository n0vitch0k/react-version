// Page de détail d'un candidat
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Loader2,
  Star,
  Award
} from 'lucide-react';

import { ProfilCandidat } from '../types';
import { apiService } from '../services/api';
import Truncate from '../components/Truncate';

const CandidatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState<ProfilCandidat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidatDetail = async () => {
      if (!id) {
        setError('ID du candidat non spécifié');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const candidatDetail = await apiService.getCandidat(parseInt(id));
        setCandidat(candidatDetail);
      } catch (err) {
        console.error('Erreur lors du chargement du candidat:', err);
        setError('Erreur lors du chargement du candidat');
      } finally {
        setLoading(false);
      }
    };

    loadCandidatDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  // Méthode pour obtenir l'URL de la photo
  const getPhoto = (candidat: ProfilCandidat): string | null => {
    const raw = candidat.photo;
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    return raw.startsWith('/') ? `${window.location.origin}${raw}` : `${window.location.origin}/${raw}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error || !candidat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profil non trouvé</h2>
          <p className="text-gray-600 mb-6">{error || 'Ce profil n\'existe pas ou a été supprimé.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Retour aux candidats
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
            Retour aux candidats
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête du profil */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Photo et informations de base */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow-lg">
                      {getPhoto(candidat) ? (
                        <img
                          src={getPhoto(candidat)!}
                          alt={`Photo de profil de ${candidat.prenom} ${candidat.nom}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold ${
                        getPhoto(candidat) ? 'hidden' : 'flex'
                      }`}>
                        {candidat.prenom.charAt(0)}{candidat.nom.charAt(0)}
                      </div>
                    </div>
                    {candidat.disponible && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Statut */}
                  <div className="text-center lg:text-left">
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                      candidat.disponible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {candidat.disponible ? 'Disponible maintenant' : 'En poste'}
                    </div>
                    {candidat.disponible && (
                      <div className="flex items-center gap-2 text-green-600 mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Profil urgent</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Informations principales */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {candidat.prenom} {candidat.nom}
                  </h1>
                  
                  <div className="text-xl text-purple-600 font-semibold mb-6">
                    {candidat.poste_recherche}
                  </div>

                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Âge</div>
                        <div className="font-semibold">{candidat.age} ans</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Expérience</div>
                        <div className="font-semibold">{candidat.annees_experience || 0} ans</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Salaire souhaité</div>
                        <div className="font-semibold">{apiService.formatPrice(candidat.salaire_souhaite)} FCFA</div>
                      </div>
                    </div>

                    {candidat.ethnie && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Ethnie</div>
                          <div className="font-semibold">{candidat.ethnie}</div>
                        </div>
                      </div>
                    )}

                    {candidat.religion && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Religion</div>
                          <div className="font-semibold">{candidat.religion}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Disponible depuis</div>
                        <div className="font-semibold">{apiService.formatRelativeDate(candidat.date_publication)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Détails du profil */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale - Expérience et compétences */}
            <div className="lg:col-span-2 space-y-8">
              {/* Expérience */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Expérience professionnelle</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {candidat.experience || 'Aucune expérience spécifiée'}
                  </p>
                </div>
              </div>

              {/* Compétences */}
              {candidat.competences && candidat.competences.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Compétences</h2>
                  <div className="flex flex-wrap gap-3">
                    {candidat.competences.map((competence, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {competence}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Autres informations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidat.situation_matrimoniale && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-600" />
                      Situation matrimoniale
                    </h3>
                    <p className="text-gray-700">{candidat.situation_matrimoniale}</p>
                  </div>
                )}

                {candidat.maladies && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      État de santé
                    </h3>
                    <p className="text-gray-700">{candidat.maladies}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Contact et informations */}
            <div className="space-y-8">
              {/* Informations personnelles */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations personnelles</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Âge</span>
                    <span className="font-semibold text-gray-900">{candidat.age} ans</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Expérience</span>
                    <span className="font-semibold text-gray-900">
                      {candidat.annees_experience || 0} an{candidat.annees_experience > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Salaire souhaité</span>
                    <span className="font-semibold text-gray-900">
                      {apiService.formatPrice(candidat.salaire_souhaite)} FCFA
                    </span>
                  </div>
                  {candidat.ethnie && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
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

              {/* Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium text-gray-900">{candidat.email}</div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contacter le candidat
                  </button>
                </div>
              </div>

              {/* CV */}
              {candidat.cv && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">CV</h3>
                  <button className="w-full border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors">
                    Télécharger le CV
                  </button>
                </div>
              )}

              {/* Profil urgent */}
              {candidat.disponible && (
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Profil disponible</h3>
                  <p className="mb-4 opacity-90">Ce candidat est immédiatement disponible pour commencer</p>
                  <button className="w-full bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                    Postuler maintenant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatDetailPage;
