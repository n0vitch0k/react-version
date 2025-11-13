import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <nav class="navbar">
        <div class="container">
          <!-- Logo cristallin -->
          <div class="nav-brand">
            <a routerLink="/" class="brand-link">
              <div class="crown-icon">👑</div>
              <span class="brand-text">Christ-Roi Agence</span>
              <div class="brand-glow"></div>
            </a>
          </div>

          <!-- Menu élégant -->
          <div class="nav-menu" [class.active]="isMenuOpen">
            <a routerLink="/" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact:true}" 
               class="nav-link"
               (click)="closeMenu()">
              <span class="link-text">Accueil</span>
              <span class="link-underline"></span>
            </a>
            
            <a routerLink="/personnel" 
               routerLinkActive="active" 
               class="nav-link"
               (click)="closeMenu()">
              <span class="link-text">Placement de Personnel</span>
              <span class="link-underline"></span>
            </a>
            
            <a href="/#about" 
               class="nav-link"
               (click)="closeMenu()">
              <span class="link-text">À propos</span>
              <span class="link-underline"></span>
            </a>
            
            <a href="/#contact" 
               class="nav-link"
               (click)="closeMenu()">
              <span class="link-text">Contact</span>
              <span class="link-underline"></span>
            </a>
          </div>

          <!-- Hamburger animé -->
          <div class="nav-toggle" 
               (click)="toggleMenu()"
               [class.active]="isMenuOpen">
            <span class="toggle-line line-1"></span>
            <span class="toggle-line line-2"></span>
            <span class="toggle-line line-3"></span>
            <div class="toggle-glow"></div>
          </div>
        </div>
      </nav>

      <!-- Effet de brillance sur le header -->
      <div class="header-shine"></div>
    </header>
  `,
  styles: [`
    /* HEADER LAITEUX AVEC EFFET DE VERRE */
    .header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  z-index: 1000;
  box-shadow: 
    0 4px 20px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

    .header.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 4px 30px rgba(59, 130, 246, 0.1);
    }

    .header-shine {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(59, 130, 246, 0.3), 
        transparent);
    }

    .navbar {
      padding: 1rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* LOGO CRISTALLIN */
    .nav-brand {
      display: flex;
      align-items: center;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      position: relative;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .brand-link:hover {
      transform: translateY(-1px);
    }

    .crown-icon {
      font-size: 1.8rem;
      filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
      animation: crownShine 3s ease-in-out infinite;
    }

    @keyframes crownShine {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.1) rotate(5deg); }
    }

    .brand-text {
      font-size: 1.4rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1E293B 0%, #3B82F6 50%, #1E293B 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: textShine 4s ease-in-out infinite;
    }

    @keyframes textShine {
      0%, 100% { background-position: 0% center; }
      50% { background-position: 200% center; }
    }

    .brand-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .brand-link:hover .brand-glow {
      width: 120%;
      height: 120%;
    }

    /* MENU ÉLÉGANT */
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link {
      color: #475569;
      text-decoration: none;
      font-weight: 500;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .link-text {
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }

    .link-underline {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #3B82F6, #60A5FA);
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: #1E40AF;
      background: rgba(59, 130, 246, 0.05);
    }

    .nav-link:hover .link-underline {
      width: 60%;
    }

    .nav-link.active {
      color: #1E40AF;
      background: rgba(59, 130, 246, 0.08);
    }

    .nav-link.active .link-underline {
      width: 80%;
      background: linear-gradient(90deg, #1E40AF, #3B82F6);
    }

    /* BOUTON HAMBURGER ANIMÉ */
    .nav-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 6px;
      padding: 0.5rem;
      border-radius: 8px;
      position: relative;
      transition: all 0.3s ease;
    }

    .nav-toggle:hover {
      background: rgba(59, 130, 246, 0.05);
    }

    .toggle-line {
      width: 25px;
      height: 2px;
      background: #3B82F6;
      border-radius: 2px;
      transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
      position: relative;
      z-index: 2;
    }

    .line-1 { transform-origin: center; }
    .line-2 { transform-origin: center; }
    .line-3 { transform-origin: center; }

    .nav-toggle.active .line-1 {
      transform: rotate(45deg) translate(6px, 6px);
      background: #1E40AF;
    }

    .nav-toggle.active .line-2 {
      transform: scale(0);
      opacity: 0;
    }

    .nav-toggle.active .line-3 {
      transform: rotate(-45deg) translate(6px, -6px);
      background: #1E40AF;
    }

    .toggle-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%);
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .nav-toggle.active .toggle-glow {
      width: 200%;
      height: 200%;
    }

    /* VERSION MOBILE */
    @media (max-width: 768px) {
      .container {
        padding: 0 1.5rem;
      }

      .brand-text {
        font-size: 1.2rem;
      }

      .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(30px);
        flex-direction: column;
        padding: 2rem;
        gap: 0.5rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border-top: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
      }

      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .nav-link {
        width: 100%;
        text-align: center;
        padding: 1.25rem;
        font-size: 1.1rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.08);
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.12);
      }

      .nav-toggle {
        display: flex;
      }
    }

    /* PETITS ÉCRANS */
    @media (max-width: 480px) {
      .container {
        padding: 0 1rem;
      }

      .brand-text {
        font-size: 1.1rem;
      }

      .crown-icon {
        font-size: 1.5rem;
      }

      .nav-menu {
        padding: 1.5rem;
      }

      .nav-link {
        padding: 1rem;
        font-size: 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}