import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterModule,ActivatedRoute } from '@angular/router';
import { ApiService, CompanyInfo, Service } from '../../services/api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // Données de l'entreprise
  companyInfo: CompanyInfo | null = null;
  isVideoPlaying = false;
private videoElement: HTMLVideoElement | null = null;


  // Section About
  aboutCommitments = [
    {
      icon: '💬',
      title: 'On vous écoute vraiment',
      description: 'On prend le temps de comprendre vos besoins réels, sans vous presser. Votre situation nous intéresse.'
    },
    {
      icon: '✅',
      title: 'On est honnête',
      description: 'Pas de fausses promesses. On vous dit clairement ce qu\'on peut faire pour vous, sans exagérer.'
    },
    {
      icon: '🤝',
      title: 'On vous accompagne',
      description: 'De la première rencontre jusqu\'à la signature, on est là pour vous guider à chaque étape.'
    }
  ];

  // Section Contact
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  contactItems = [
    { icon: '📞', title: 'Téléphone', value: '+225 05 03 97 47 75' },
    { icon: '✉️', title: 'Email', value: 'christroiagence@gmail.com' },
    { icon: '📍', title: 'Agence', value: 'Abidjan, Côte d\'Ivoire' },
    { icon: '🕒', title: 'Horaires', value: 'Lun - Ven: 8h00 - 18h00' }
  ];

  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      service: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    // Chargement des données de l'entreprise
    this.apiService.getCompanyInfo().subscribe({
      next: (data) => {
        this.companyInfo = data;
      },
      error: (err) => {
        console.error('Erreur chargement company info:', err);
        this.companyInfo = {
          name: 'Christ-Roi Agence',
          description: 'Votre partenaire de confiance pour trouver un emploi ou un candidat à Abidjan. On travaille avec honnêteté et simplicité.',
          email: 'christroiagence@gmail.com',
          phone: '+225 05 03 97 47 75',
          location: 'Abidjan, Côte d\'Ivoire',
          hours: 'Lun - Ven: 8h00 - 18h00',
          values: ['Honnêteté', 'Accompagnement', 'Simplicité', 'Confiance'],
          stats: {
            clients: '500+',
            projects: '1000+',
            experience: '5+ ans',
            support: '24/7'
          }
        };
      }
    });
  }

  // ===== MÉTHODES HERO =====
  heroBtnHover(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    button.classList.add('hover');
  }

  heroBtnLeave(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    button.classList.remove('hover');
  }

  scrollToNext() {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // ===== MÉTHODES SERVICES =====
  servicesCardHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.add('hover');
  }

  servicesCardLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.remove('hover');
  }

  navigateToCandidats() {
  // Navigue vers personnel avec l'onglet "offres" actif (candidats cherchent des offres)
  this.router.navigate(['/personnel'], { queryParams: { view: 'offres' } });
}


  navigateToRecruteurs() {
  // Navigue vers personnel avec l'onglet "candidats" actif (recruteurs cherchent des candidats)
  this.router.navigate(['/personnel'], { queryParams: { view: 'candidats' } });
}

  // ===== MÉTHODES ABOUT =====
  aboutVideoHover(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    container.classList.add('hover');
  }

  aboutVideoLeave(event: MouseEvent) {
    const container = event.currentTarget as HTMLElement;
    container.classList.remove('hover');
  }

  aboutCardHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.add('hover');
  }

  aboutCardLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.remove('hover');
  }

  // ===== MÉTHODES CONTACT =====
  contactItemHover(event: MouseEvent) {
    const item = event.currentTarget as HTMLElement;
    item.classList.add('hover');
  }

  contactItemLeave(event: MouseEvent) {
    const item = event.currentTarget as HTMLElement;
    item.classList.remove('hover');
  }

  contactSubmitHover(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    if (!this.isSubmitting && !this.contactForm.invalid) {
      button.classList.add('hover');
    }
  }

  contactSubmitLeave(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    if (!this.isSubmitting) {
      button.classList.remove('hover');
    }
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.showSuccessMessage = false;

    try {
      await this.simulateApiCall();
      this.handleSuccess();
    } catch (error: any) {
      console.error('Erreur envoi message:', error);
      this.handleError();
    }
  }

  private simulateApiCall(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve();
        } else {
          reject(new Error('Erreur de réseau simulée'));
        }
      }, 2000);
    });
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  private handleSuccess() {
    this.isSubmitting = false;
    this.showSuccessMessage = true;
    this.contactForm.reset();

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }

  private handleError() {
    this.isSubmitting = false;
    this.openFallbackEmail(this.contactForm.value);
  }

  private openFallbackEmail(formData: any): void {
    const sujet = formData.service === 'candidat' ? 'Je cherche un emploi' : 'Je cherche un candidat';
    const subject = `Contact Christroi: ${sujet}`;
    const body = `
Prénom: ${formData.firstName || ''}
Nom: ${formData.lastName || ''}
Email: ${formData.email || ''}
Téléphone: ${formData.phone || ''}
Statut: ${formData.service === 'candidat' ? 'Je cherche un emploi' : 'Je cherche un candidat'}

Message:
${formData.message || ''}
    `.trim();

    const mailtoLink = `mailto:christroiagence@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
  ngAfterViewInit() {
  this.setupVideoIntersectionObserver();
}

private setupVideoIntersectionObserver() {
  this.videoElement = document.querySelector('.founder-video');
  
  if (this.videoElement && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.videoElement) {
            // La vidéo est visible, on peut la lire
            this.videoElement.play().then(() => {
              this.isVideoPlaying = true;
            }).catch(error => {
              console.log('Lecture automatique bloquée:', error);
            });
          } else if (this.videoElement && !entry.isIntersecting) {
            // La vidéo n'est plus visible, on la met en pause
            this.videoElement.pause();
            this.isVideoPlaying = false;
          }
        });
      },
      {
        threshold: 0.5 // Déclenche quand 50% de la vidéo est visible
      }
    );

    observer.observe(this.videoElement);
  }
}

onVideoLoaded(event: Event) {
  console.log('Vidéo chargée et prête');
}

toggleVideoPlayback() {
  if (this.videoElement) {
    if (this.videoElement.paused) {
      this.videoElement.play().then(() => {
        this.isVideoPlaying = true;
      });
    } else {
      this.videoElement.pause();
      this.isVideoPlaying = false;
    }
  }
}

scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
}