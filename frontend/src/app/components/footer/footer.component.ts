import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <!-- Fond continu -->
      <div class="footer-background">
        <div class="footer-crystals">
          <div class="crystal" *ngFor="let crystal of crystals"></div>
        </div>
      </div>

      <div class="container">
        <!-- Contenu principal -->
        <div class="footer-content">
          <!-- Section Logo et Description -->
          <div class="footer-section">
            <div class="footer-brand">
              <div class="brand-logo">
                <div class="crown-icon">👑</div>
                <h3 class="brand-text">Christ-Roi Agence</h3>
              </div>
              <p class="brand-description">
                Votre partenaire d'excellence pour des services professionnels sur-mesure 
                et des solutions adaptées à vos besoins.
              </p>
              <div class="brand-glow"></div>
            </div>
            
            <div class="social-links">
              <a *ngFor="let social of socialLinks" 
                 [href]="social.url" 
                 class="social-link"
                 (mouseenter)="onSocialHover($event)"
                 (mouseleave)="onSocialLeave($event)">
                <div class="social-icon">
                  <div class="icon-bg"></div>
                  <span class="icon-symbol">{{social.icon}}</span>
                </div>
                <span class="social-name">{{social.name}}</span>
              </a>
            </div>
          </div>
          
          <!-- Section Services -->
          <div class="footer-section">
            <h4 class="section-title">Nos Services</h4>
            <ul class="footer-links">
              <li *ngFor="let service of services">
                <a [href]="service.link" 
                   class="footer-link"
                   (mouseenter)="onLinkHover($event)"
                   (mouseleave)="onLinkLeave($event)">
                  <span class="link-bullet"></span>
                  <span class="link-text">{{ service.name }}</span>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Section Contact -->
          <div class="footer-section">
            <h4 class="section-title">Contact Rapide</h4>
            <div class="contact-info">
              <div *ngFor="let contact of contactInfo" 
                   class="contact-item"
                   (mouseenter)="onContactHover($event)"
                   (mouseleave)="onContactLeave($event)">
                <div class="contact-icon">
                  <div class="icon-bg"></div>
                  <span class="icon-symbol">{{contact.icon}}</span>
                </div>
                <div class="contact-details">
                  <span class="contact-value">{{ contact.value }}</span>
                </div>
                <div class="contact-glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Section inférieure -->
        <div class="footer-bottom">
          <div class="footer-divider"></div>
          <div class="footer-bottom-content">
            <p class="copyright">&copy; {{ currentYear }} Christ-Roi Agence. Tous droits réservés.</p>
            <div class="legal-links">
              <a *ngFor="let link of legalLinks" 
                 [href]="link.url" 
                 class="legal-link"
                 (mouseenter)="onLegalHover($event)"
                 (mouseleave)="onLegalLeave($event)">
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Vague de fin -->
      <div class="footer-wave"></div>
    </footer>
  `,
  styles: [`
    /* FOOTER CONTINU */
    .footer {
  position: relative;
  background: #FFFFFF;
  padding: 80px 0 40px;
  overflow: hidden;
  border-top: 3px solid;
  border-image: linear-gradient(90deg, 
    transparent, 
    #3B82F6, 
    #60A5FA, 
    #93C5FD,
    #3B82F6,
    transparent
  ) 1;
  border-image-slice: 1;
}

    .footer-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .footer-crystals {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .crystal {
      position: absolute;
      background: rgba(59, 130, 246, 0.03);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation: crystalFloat 25s linear infinite;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 2;
    }

    /* CONTENU PRINCIPAL */
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1.2fr;
      gap: 4rem;
      margin-bottom: 3rem;
    }

    /* SECTION BRAND */
    .footer-brand {
      position: relative;
      padding-right: 2rem;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .crown-icon {
      font-size: 2rem;
      filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
    }

    .brand-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: transparent;
      background: linear-gradient(135deg, #1E293B 0%, #3B82F6 50%, #1E293B 100%);
      -webkit-background-clip: text;
      background-clip: text;
      background-size: 200% auto;
      animation: titleFlow 6s ease-in-out infinite;
      margin: 0;
    }

    .brand-description {
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 2.5rem;
      font-size: 1rem;
    }

    .brand-glow {
      position: absolute;
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      background: radial-gradient(circle at center, 
        rgba(59, 130, 246, 0.03) 0%, 
        transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .footer-brand:hover .brand-glow {
      opacity: 1;
    }

    /* LIENS SOCIAUX */
    .social-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 
        0 4px 15px rgba(59, 130, 246, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }

    .social-link:hover {
      transform: translateX(8px);
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 
        0 8px 25px rgba(59, 130, 246, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.95);
    }

    .social-icon {
      position: relative;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
    }

    .icon-bg {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
      border-radius: 50%;
      box-shadow: 
        0 4px 12px rgba(59, 130, 246, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }

    .icon-symbol {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.1rem;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    }

    .social-link:hover .icon-bg {
      transform: scale(1.1);
    }

    .social-name {
      color: #374151;
      font-weight: 500;
      font-size: 0.95rem;
    }

    /* SECTIONS LATÉRALES */
    .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 1.5rem;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #3B82F6, transparent);
      border-radius: 1px;
    }

    /* LIENS DE SERVICES */
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #64748B;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .link-bullet {
      width: 6px;
      height: 6px;
      background: #3B82F6;
      border-radius: 50%;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    .link-text {
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      background: rgba(59, 130, 246, 0.05);
      color: #1E40AF;
      padding-left: 1.25rem;
    }

    .footer-link:hover .link-bullet {
      width: 8px;
      height: 8px;
      background: #1E40AF;
    }

    /* INFORMATIONS DE CONTACT */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 
        0 4px 15px rgba(59, 130, 246, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    }

    .contact-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, 
        rgba(59, 130, 246, 0.05) 0%, 
        transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .contact-item:hover {
      transform: translateX(5px);
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 
        0 6px 20px rgba(59, 130, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.95);
    }

    .contact-item:hover .contact-glow {
      opacity: 1;
    }

    .contact-icon {
      position: relative;
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .contact-details {
      flex: 1;
    }

    .contact-value {
      color: #475569;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* SECTION INFÉRIEURE */
    .footer-bottom {
      margin-top: 3rem;
    }

    .footer-divider {
      height: 1px;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(59, 130, 246, 0.2), 
        transparent);
      margin-bottom: 2rem;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .copyright {
      color: #64748B;
      font-size: 0.9rem;
      margin: 0;
    }

    .legal-links {
      display: flex;
      gap: 2rem;
    }

    .legal-link {
      color: #64748B;
      text-decoration: none;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      position: relative;
      padding: 0.5rem 0;
    }

    .legal-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: #3B82F6;
      transition: width 0.3s ease;
    }

    .legal-link:hover {
      color: #1E40AF;
    }

    .legal-link:hover::after {
      width: 100%;
    }

    /* VAGUE DE FIN */
    .footer-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, 
        #3B82F6, 
        #60A5FA, 
        #93C5FD, 
        #3B82F6);
      background-size: 200% 100%;
      animation: waveFlow 3s ease-in-out infinite;
    }

    /* ANIMATIONS */
    @keyframes titleFlow {
      0%, 100% { background-position: 0% center; }
      50% { background-position: 200% center; }
    }

    @keyframes crystalFloat {
      0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
      10% { opacity: 0.3; }
      90% { opacity: 0.1; }
      100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }

    @keyframes waveFlow {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 200% 0%; }
    }

    /* RESPONSIVE AMÉLIORÉ */
    @media (max-width: 1024px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
      }
      
      .footer-brand {
        grid-column: 1 / -1;
        text-align: center;
        padding-right: 0;
      }
      
      .brand-logo {
        justify-content: center;
      }
      
      .social-links {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 60px 0 30px;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        text-align: center;
      }

      .section-title::after {
        left: 50%;
        transform: translateX(-50%);
      }

      .footer-bottom-content {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .legal-links {
        flex-direction: column;
        gap: 1rem;
      }

      .contact-item {
        justify-content: center;
        text-align: center;
      }

      .container {
        padding: 0 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 50px 0 25px;
      }

      .brand-text {
        font-size: 1.3rem;
      }

      .social-links {
        flex-direction: column;
        align-items: center;
      }

      .social-link {
        width: 100%;
        max-width: 250px;
      }

      .footer-links {
        align-items: center;
      }

      .footer-link {
        width: 100%;
        max-width: 250px;
        justify-content: center;
      }

      .container {
        padding: 0 1rem;
      }
    }

    @media (max-width: 360px) {
      .contact-item {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }
      
      .contact-icon {
        margin-right: 0;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  crystals: any[] = [];

  socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' }
  ];

  services = [
    { name: 'Placement de Personnel', link: '#services' },
    { name: 'Consultation sur Mesure', link: '#contact' },
    { name: 'Accompagnement Personnalisé', link: '#contact' },
    { name: 'Opportunités d\'Emploi', link: '#services' }
  ];

  contactInfo = [
    { icon: '✉️', value: 'christroiagence@gmail.com' },
    { icon: '📞', value: '+225 05 03 97 47 75' },
    { icon: '📍', value: 'Côte d\'Ivoire' }
  ];

  legalLinks = [
    { name: 'Politique de Confidentialité', url: '#' },
    { name: 'Conditions d\'Utilisation', url: '#' },
    { name: 'Mentions Légales', url: '#' }
  ];

  constructor() {
    this.initializeCrystals();
  }

  initializeCrystals() {
    this.crystals = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      delay: Math.random() * 25,
      duration: Math.random() * 20 + 25
    }));
  }

  // Micro-interactions
  onSocialHover(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.transform = 'translateX(8px)';
  }

  onSocialLeave(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.transform = 'translateX(0)';
  }

  onLinkHover(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.paddingLeft = '1.25rem';
  }

  onLinkLeave(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.paddingLeft = '1rem';
  }

  onContactHover(event: MouseEvent) {
    const item = event.currentTarget as HTMLElement;
    item.style.transform = 'translateX(5px)';
  }

  onContactLeave(event: MouseEvent) {
    const item = event.currentTarget as HTMLElement;
    item.style.transform = 'translateX(0)';
  }

  onLegalHover(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.color = '#1E40AF';
  }

  onLegalLeave(event: MouseEvent) {
    const link = event.currentTarget as HTMLElement;
    link.style.color = '#64748B';
  }
}