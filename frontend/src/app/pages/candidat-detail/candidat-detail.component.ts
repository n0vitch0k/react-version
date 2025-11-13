import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService, ProfilCandidat } from '../../services/api.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-candidat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TruncatePipe],
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css']
})
export class CandidatDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  candidat: ProfilCandidat | null = null;
  loading = true;
  error = '';
  relatedCandidats: ProfilCandidat[] = [];
  
  // Nouvelles propriétés pour les interactions
  isScrolled = false;
  showSuccessMessage = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.loadCandidatDetail(+id);
        }
      });
  }

  // 🔄 Nouvelle méthode pour le scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 100;
  }

  loadCandidatDetail(id: number) {
    this.loading = true;
    this.error = '';

    this.apiService.getCandidat(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (candidat) => {
          this.candidat = candidat;
          this.loading = false;
          this.loadRelatedCandidats(candidat);
          this.triggerAnimations();
        },
        error: (err) => {
          this.error = this.getHumanErrorMessage(err);
          this.loading = false;
          console.error('Erreur détail candidat:', err);
        }
      });
  }

  loadRelatedCandidats(currentCandidat: ProfilCandidat) {
    this.apiService.getCandidats({ 
      poste_recherche: currentCandidat.poste_recherche,
      page_size: 4 
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.relatedCandidats = response
          .filter(candidat => candidat.id !== currentCandidat.id)
          .slice(0, 3);
      },
      error: (err) => {
        console.error('Erreur candidats similaires:', err);
      }
    });
  }

  // 🆕 Méthodes améliorées pour les interactions
  contacter() {
    if (!this.candidat) return;
    
    this.isSubmitting = true;
    
    // Simulation d'envoi
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccessMessage = true;
      
      // Message de confirmation humain
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
      
      // Logique réelle à implémenter
      console.log(`Contact initié avec ${this.candidat?.prenom} ${this.candidat?.nom}`);
    }, 1500);
  }

  partager() {
    if (!this.candidat) return;

    const shareData = {
      title: `${this.candidat.prenom} ${this.candidat.nom} - ${this.candidat.poste_recherche}`,
      text: `Découvrez le profil de ${this.candidat.prenom}, ${this.candidat.poste_recherche} avec ${this.candidat.annees_experience} ans d'expérience.`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Partage réussi'))
        .catch((err) => console.log('Erreur partage:', err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          // Feedback visuel pour le copié
          this.showTempMessage('Lien copié dans le presse-papier !');
        })
        .catch(() => {
          // Fallback pour anciens navigateurs
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          this.showTempMessage('Lien copié !');
        });
    }
  }

  // 🆕 Méthode pour messages temporaires
  private showTempMessage(message: string) {
    // Créer un toast temporaire
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-success);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // 🆕 Gestion d'erreurs humaine
  private getHumanErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'Nous n\'avons pas trouvé le profil recherché. Il a peut-être été retiré.';
    } else if (error.status === 500) {
      return 'Un problème technique empêche l\'affichage du profil. Notre équipe est prévenue.';
    } else if (error.status === 0) {
      return 'Connexion perdue. Vérifiez votre connexion internet.';
    } else {
      return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
    }
  }

  // 🆕 Animations au chargement
  private triggerAnimations() {
    setTimeout(() => {
      const elements = this.elementRef.nativeElement.querySelectorAll('[data-animate]');
      elements.forEach((el: HTMLElement, index: number) => {
        setTimeout(() => {
          el.style.animation = `slideUpFade 0.6s ease-out ${index * 0.1}s both`;
        }, 100);
      });
    }, 500);
  }

  // 🆕 Méthode pour le favori
  toggleFavorite() {
    if (!this.candidat) return;
    
    
    // Animation de cœur
    const heartBtn = this.elementRef.nativeElement.querySelector('.favorite-btn i');
    if (heartBtn) {
      heartBtn.classList.toggle('far');
      heartBtn.classList.toggle('fas');
      heartBtn.style.transform = 'scale(1.3)';
      setTimeout(() => {
        heartBtn.style.transform = 'scale(1)';
      }, 300);
    }
  }

  // 🆕 Navigation améliorée
  navigateToCandidat(id: number) {
    this.router.navigate(['/personnel/candidat', id]);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 🆕 Formatage amélioré
  formatPrice(price: string | number): string {
    if (!price) return '0';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('fr-FR').format(numPrice);
  }

  formatRelativeDate(dateString: string): string {
    if (!dateString) return 'récemment';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    if (diffInDays === 0) return 'aujourd\'hui';
    if (diffInDays === 1) return 'hier';
    if (diffInDays < 7) return `il y a ${diffInDays} jours`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `il y a ${months} mois`;
    }
    
    const years = Math.floor(diffInDays / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }

  getPhoto(c: ProfilCandidat): string | null {
    const raw = c.photo;
    if (!raw) return this.generateDefaultAvatar(c.prenom, c.nom);
    if (/^https?:\/\//i.test(raw)) return raw;
    return raw.startsWith('/') ? `${window.location.origin}${raw}` : `${window.location.origin}/${raw}`;
  }

  // 🆕 Avatar par défaut personnalisé
  private generateDefaultAvatar(prenom: string, nom: string): string {
    const initials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    const colors = ['#1e3a8a', '#3b82f6', '#d4af37', '#10b981', '#8b5cf6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Créer un SVG d'avatar par défaut
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="${color}" rx="20"/><text x="80" y="95" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
  }

  // 🆕 Méthode pour le téléchargement CV
  downloadCV() {
    if (!this.candidat) return;
    
    // Simulation de téléchargement
    this.showTempMessage('Préparation du téléchargement...');
    
    // Logique réelle à implémenter
    setTimeout(() => {
      this.showTempMessage('CV téléchargé avec succès !');
    }, 1000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}