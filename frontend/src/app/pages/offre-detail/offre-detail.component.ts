import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { ApiService, OffreEmploi } from '../../services/api.service';

@Component({
  selector: 'app-offre-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.scss']
})
export class OffreDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  offre: OffreEmploi | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadOffreDetail();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadOffreDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id || isNaN(+id)) {
      this.error = 'Identifiant d\'offre invalide';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.apiService.getOffreEmploi(+id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (offre) => {
          if (!offre) {
            this.error = 'Offre non trouvée';
          } else {
            this.offre = offre;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur chargement détail offre:', err);
          this.error = err.status === 404 
            ? 'Cette offre n\'existe pas ou a été supprimée'
            : err.message || 'Erreur lors du chargement des détails de l\'offre';
          this.loading = false;
        }
      });
  }

  // Getters pour les données formatées
  get heroGradient(): string {
    return 'linear-gradient(135deg, #1e3a8a 0%, #2d4a9e 50%, #3b82f6 100%)';
  }

  // Getters sécurisés pour le template
  get safeOffre() {
    return this.offre || {} as Partial<OffreEmploi>;
  }

  get typeContrat(): string {
    return this.offre?.type_contrat || '';
  }

  get experienceRequise(): string {
    return this.offre?.experience_requise || '';
  }

  get conditionsParticulieres(): string {
    return this.offre?.conditions_particulieres || '';
  }

  get horaires(): string {
    return this.offre?.horaires || '';
  }

  get dureeContrat(): string {
    return this.offre?.duree_contrat || '';
  }

  get disponibilite(): string {
    return this.offre?.disponibilite || '';
  }

  get salaire(): string | number {
    return this.offre?.salaire || '0';
  }

  get datePublication(): string {
    return this.offre?.date_publication || '';
  }

  get dateModification(): string | undefined {
    return this.offre?.date_modification;
  }

  get photo(): string | undefined {
    return this.offre?.photo;
  }

  get titre(): string {
    return this.offre?.titre || '';
  }

  get lieu(): string {
    return this.offre?.lieu || 'Proche de chez vous';
  }

  get description(): string {
    return this.offre?.description || '';
  }

  // Méthodes utilitaires
  getCompetencesList(): string[] {
    if (!this.offre?.competences) return [];
    return this.offre.competences.split(',').map(c => c.trim()).filter(c => c.length > 0);
  }

  getQualitesList(): string[] {
    if (!this.offre?.qualites) return [];
    return this.offre.qualites.split(',').map(q => q.trim()).filter(q => q.length > 0);
  }

  getAvantagesList(): string[] {
    if (!this.offre?.avantages) return [];
    return this.offre.avantages.split(',').map(a => a.trim()).filter(a => a.length > 0);
  }

  // Utilitaires de formatage
  formatPrice(price: string | number | undefined): string {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR').format(numPrice);
  }

  formatRelativeDate(dateString: string | undefined): string {
    if (!dateString) return 'Date inconnue';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

      if (diffInDays === 0) return 'aujourd\'hui';
      if (diffInDays === 1) return 'hier';
      if (diffInDays < 7) return `il y a ${diffInDays} jours`;
      if (diffInDays < 30) return `il y a ${Math.floor(diffInDays / 7)} semaines`;
      if (diffInDays < 365) return `il y a ${Math.floor(diffInDays / 30)} mois`;
      return `il y a ${Math.floor(diffInDays / 365)} ans`;
    } catch {
      return 'Date inconnue';
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Date inconnue';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return 'Date inconnue';
    }
  }

  getPhotoUrl(photoPath: string | undefined): string {
    if (!photoPath) return '/assets/images/default-offre.jpg';
    
    // Si c'est une URL complète
    if (/^https?:\/\//i.test(photoPath)) return photoPath;
    
    // Si c'est un chemin relatif
    if (photoPath.startsWith('/')) {
      return `${window.location.origin}${photoPath}`;
    }
    
    // Chemin relatif sans slash
    return `${window.location.origin}/${photoPath}`;
  }

  isUrgent(offre: OffreEmploi | null): boolean {
    if (!offre?.date_publication) return false;
    const publicationDate = new Date(offre.date_publication);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - publicationDate.getTime()) / (1000 * 3600 * 24));
    return diffInDays < 3;
  }

  // Actions
  postuler() {
    if (!this.offre) return;
    
    // Redirection vers la page de candidature ou ouverture modal
    alert(`Postulation pour l'offre: ${this.titre}\n\nCette fonctionnalité sera implémentée prochainement.`);
    
    // TODO: Implémenter la logique de postulation réelle
    // this.router.navigate(['/candidature', this.offre.id]);
  }

  partager() {
    if (!this.offre) return;

    if (navigator.share) {
      navigator.share({
        title: this.titre,
        text: this.description.substring(0, 100) + '...',
        url: window.location.href
      }).catch(() => this.fallbackShare());
    } else {
      this.fallbackShare();
    }
  }

  private fallbackShare() {
    // Fallback pour les navigateurs sans Web Share API
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Lien copié dans le presse-papier !');
    }).catch(() => {
      // Fallback ultime
      prompt('Copiez ce lien pour partager:', url);
    });
  }

  retourListe() {
    this.router.navigate(['/personnel'], { 
      queryParams: { view: 'offres' } 
    });
  }
}