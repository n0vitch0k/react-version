// Hook pour la gestion de la pagination
import { useState, useCallback } from 'react';

interface PaginationState {
  currentOffresPage: number;
  currentCandidatsPage: number;
  pageSize: number;
  totalOffresPages: number;
  totalCandidatsPages: number;
}

interface PaginationActions {
  nextPage: (type: 'offres' | 'candidats') => void;
  previousPage: (type: 'offres' | 'candidats') => void;
  goToPage: (page: number | string, type: 'offres' | 'candidats') => void;
  goToFirstPage: (type: 'offres' | 'candidats') => void;
  goToLastPage: (type: 'offres' | 'candidats') => void;
  onPageSizeChange: () => void;
  getCurrentRange: (type: 'offres' | 'candidats') => { start: number, end: number };
  getVisiblePages: (type: 'offres' | 'candidats') => (number | string)[];
  setMobilePageSize: (isMobile: boolean) => void;
  setTotalOffres: (total: number) => void;
  setTotalCandidats: (total: number) => void;
}

export const usePagination = (initialPageSize: number = 10): PaginationState & PaginationActions => {
  const [state, setState] = useState<PaginationState>({
    currentOffresPage: 1,
    currentCandidatsPage: 1,
    pageSize: initialPageSize,
    totalOffresPages: 0,
    totalCandidatsPages: 0
  });

  const updatePage = useCallback((type: 'offres' | 'candidats', newPage: number) => {
    setState(prev => ({
      ...prev,
      [type === 'offres' ? 'currentOffresPage' : 'currentCandidatsPage']: newPage
    }));
  }, []);

  const updateTotalPages = useCallback((type: 'offres' | 'candidats', totalPages: number) => {
    setState(prev => ({
      ...prev,
      [type === 'offres' ? 'totalOffresPages' : 'totalCandidatsPages']: totalPages
    }));
  }, []);

  const nextPage = useCallback((type: 'offres' | 'candidats') => {
    const currentPage = type === 'offres' ? state.currentOffresPage : state.currentCandidatsPage;
    const totalPages = type === 'offres' ? state.totalOffresPages : state.totalCandidatsPages;
    
    if (currentPage < totalPages) {
      updatePage(type, currentPage + 1);
    }
  }, [state.currentOffresPage, state.currentCandidatsPage, state.totalOffresPages, state.totalCandidatsPages, updatePage]);

  const previousPage = useCallback((type: 'offres' | 'candidats') => {
    const currentPage = type === 'offres' ? state.currentOffresPage : state.currentCandidatsPage;
    
    if (currentPage > 1) {
      updatePage(type, currentPage - 1);
    }
  }, [state.currentOffresPage, state.currentCandidatsPage, updatePage]);

  const goToPage = useCallback((page: number | string, type: 'offres' | 'candidats') => {
    const p = Number(page) || 1;
    updatePage(type, p);
  }, [updatePage]);

  const goToFirstPage = useCallback((type: 'offres' | 'candidats') => {
    updatePage(type, 1);
  }, [updatePage]);

  const goToLastPage = useCallback((type: 'offres' | 'candidats') => {
    const totalPages = type === 'offres' ? state.totalOffresPages : state.totalCandidatsPages;
    updatePage(type, totalPages);
  }, [state.totalOffresPages, state.totalCandidatsPages, updatePage]);

  const onPageSizeChange = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentOffresPage: 1,
      currentCandidatsPage: 1
    }));
  }, []);

  const getCurrentRange = useCallback((type: 'offres' | 'candidats'): { start: number, end: number } => {
    const currentPage = type === 'offres' ? state.currentOffresPage : state.currentCandidatsPage;
    const total = type === 'offres' ? state.totalOffresPages * state.pageSize : state.totalCandidatsPages * state.pageSize;
    
    const start = ((currentPage - 1) * state.pageSize) + 1;
    const end = Math.min(currentPage * state.pageSize, total);
    
    return { start, end };
  }, [state.currentOffresPage, state.currentCandidatsPage, state.totalOffresPages, state.totalCandidatsPages, state.pageSize]);

  const getVisiblePages = useCallback((type: 'offres' | 'candidats'): (number | string)[] => {
    const currentPage = type === 'offres' ? state.currentOffresPage : state.currentCandidatsPage;
    const totalPages = type === 'offres' ? state.totalOffresPages : state.totalCandidatsPages;
    
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
  }, [state.currentOffresPage, state.currentCandidatsPage, state.totalOffresPages, state.totalCandidatsPages]);

  // Méthodes pour définir les totaux (utilisées par le composant principal)
  const setTotalOffres = useCallback((total: number) => {
    setState(prev => ({
      ...prev,
      totalOffresPages: Math.ceil(total / prev.pageSize)
    }));
  }, []);

  const setTotalCandidats = useCallback((total: number) => {
    setState(prev => ({
      ...prev,
      totalCandidatsPages: Math.ceil(total / prev.pageSize)
    }));
  }, []);

  // Méthode pour ajuster le pageSize selon l'écran
  const setMobilePageSize = useCallback((isMobile: boolean) => {
    setState(prev => ({
      ...prev,
      pageSize: isMobile ? 6 : 10
    }));
  }, []);

  return {
    // État
    ...state,
    
    // Actions
    nextPage,
    previousPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    onPageSizeChange,
    getCurrentRange,
    getVisiblePages,
    
    // Méthodes de configuration
    setTotalOffres,
    setTotalCandidats,
    setMobilePageSize
  };
};
