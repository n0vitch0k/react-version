// Hook personnalisé pour la gestion des filtres
import { useState, useCallback } from 'react';
import { OffreEmploi, ProfilCandidat, OffresFilters, CandidatsFilters } from '../types';

export const useFilters = () => {
  // État des filtres pour les offres
  const [offresFilters, setOffresFilters] = useState<OffresFilters>({
    search: '',
    lieu: '',
    salaire_min: '',
    salaire_max: '',
    type_contrat: '',
    metier: ''
  });

  // État des filtres pour les candidats
  const [candidatsFilters, setCandidatsFilters] = useState<CandidatsFilters>({
    search: '',
    poste_recherche: '',
    salaire_min: null,
    salaire_max: null,
    age_min: null,
    age_max: null,
    ethnie: '',
    religion: ''
  });

  // Getters pour vérifier si des filtres sont actifs
  const hasOffresFilters = Object.values(offresFilters).some(val => 
    val !== '' && val !== null && val !== undefined
  );

  const hasCandidatsFilters = !!(candidatsFilters.search || candidatsFilters.poste_recherche || 
    candidatsFilters.salaire_min || candidatsFilters.salaire_max || candidatsFilters.age_min || 
    candidatsFilters.age_max || candidatsFilters.ethnie || candidatsFilters.religion);

  // Méthodes pour mettre à jour les filtres
  const updateOffresFilters = useCallback((key: keyof OffresFilters, value: string) => {
    setOffresFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateCandidatsFilters = useCallback((key: keyof CandidatsFilters, value: string | number | null) => {
    setCandidatsFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Méthodes pour nettoyer les filtres
  const clearOffresFilters = useCallback(() => {
    setOffresFilters({
      search: '',
      lieu: '',
      salaire_min: '',
      salaire_max: '',
      type_contrat: '',
      metier: ''
    });
  }, []);

  const clearCandidatsFilters = useCallback(() => {
    setCandidatsFilters({
      search: '',
      poste_recherche: '',
      salaire_min: null,
      salaire_max: null,
      age_min: null,
      age_max: null,
      ethnie: '',
      religion: ''
    });
  }, []);

  // Méthode pour appliquer les filtres candidats côté client
  const applyCandidatsFilters = useCallback((candidats: ProfilCandidat[]): ProfilCandidat[] => {
    return candidats.filter(candidat => {
      // Recherche textuelle
      if (candidatsFilters.search && candidatsFilters.search.trim() !== '') {
        const searchTerm = candidatsFilters.search.toLowerCase().trim();
        const fullName = `${candidat.prenom} ${candidat.nom}`.toLowerCase();
        if (!fullName.includes(searchTerm) && 
            !candidat.poste_recherche.toLowerCase().includes(searchTerm) &&
            !candidat.experience.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Poste recherché
      if (candidatsFilters.poste_recherche && candidat.poste_recherche !== candidatsFilters.poste_recherche) {
        return false;
      }

      // Salaire min/max
      if (candidatsFilters.salaire_min !== null) {
        const salaireCandidat = parseFloat(candidat.salaire_souhaite.replace(/[^\d]/g, ''));
        if (isNaN(salaireCandidat) || salaireCandidat < candidatsFilters.salaire_min) {
          return false;
        }
      }

      if (candidatsFilters.salaire_max !== null) {
        const salaireCandidat = parseFloat(candidat.salaire_souhaite.replace(/[^\d]/g, ''));
        if (isNaN(salaireCandidat) || salaireCandidat > candidatsFilters.salaire_max) {
          return false;
        }
      }

      // Âge min/max
      if (candidatsFilters.age_min !== null && candidat.age < candidatsFilters.age_min) {
        return false;
      }

      if (candidatsFilters.age_max !== null && candidat.age > candidatsFilters.age_max) {
        return false;
      }

      // Ethnie
      if (candidatsFilters.ethnie && candidat.ethnie !== candidatsFilters.ethnie) {
        return false;
      }

      // Religion
      if (candidatsFilters.religion && candidat.religion !== candidatsFilters.religion) {
        return false;
      }

      return true;
    });
  }, [candidatsFilters]);

  // Méthode pour extraire les options de filtres dynamiques
  const extractFilterOptions = useCallback((offres: OffreEmploi[], candidats: ProfilCandidat[]) => {
    const options = {
      locations: [...new Set(offres
        .map(offre => offre.lieu)
        .filter((lieu): lieu is string => !!lieu && lieu.trim() !== '')
      )].sort(),

      postesRecherches: [...new Set(candidats
        .map(candidat => candidat.poste_recherche)
        .filter((poste): poste is string => !!poste && poste.trim() !== '')
      )].sort(),

      ethniesDisponibles: [...new Set(candidats
        .map(candidat => candidat.ethnie)
        .filter((ethnie): ethnie is string => !!ethnie && ethnie.trim() !== '')
      )].sort(),

      religionsDisponibles: [...new Set(candidats
        .map(candidat => candidat.religion)
        .filter((religion): religion is string => !!religion && religion.trim() !== '')
      )].sort(),

      typesContrat: [...new Set(offres
        .map(offre => offre.type_contrat)
        .filter((type): type is string => !!type && type.trim() !== '')
      )].sort(),

      metiersDisponibles: [...new Set([
        ...offres.map(offre => offre.titre).filter((titre): titre is string => !!titre && titre.trim() !== ''),
        ...candidats.map(candidat => candidat.poste_recherche).filter((poste): poste is string => !!poste && poste.trim() !== '')
      ])].sort()
    };

    return options;
  }, []);

  // Méthode pour obtenir les filtres nettoyés
  const getCleanOffresFilters = useCallback(() => {
    return Object.fromEntries(
      Object.entries(offresFilters).filter(([_, value]) => 
        value !== '' && value !== null && value !== undefined
      )
    );
  }, [offresFilters]);

  const getCleanCandidatsFilters = useCallback(() => {
    const cleanFilters: any = {};
    Object.entries(candidatsFilters).forEach(([key, value]) => {
      if (key === 'salaire_min' || key === 'salaire_max' || key === 'age_min' || key === 'age_max') {
        if (value !== null && value !== undefined && value !== '') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            cleanFilters[key] = numValue;
          }
        }
      } else {
        if (value !== '' && value !== null && value !== undefined) {
          cleanFilters[key] = value;
        }
      }
    });
    return cleanFilters;
  }, [candidatsFilters]);

  return {
    // États
    offresFilters,
    candidatsFilters,
    
    // Getters
    hasOffresFilters,
    hasCandidatsFilters,
    
    // Méthodes de mise à jour
    updateOffresFilters,
    updateCandidatsFilters,
    
    // Méthodes de nettoyage
    clearOffresFilters,
    clearCandidatsFilters,
    
    // Méthodes utilitaires
    applyCandidatsFilters,
    extractFilterOptions,
    getCleanOffresFilters,
    getCleanCandidatsFilters
  };
};
