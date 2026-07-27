import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private toast = inject(ToastService);

  scrolled  = signal(false);
  menuOpen  = signal(false);
  activeSection = signal('home');

  readonly navLinks = [
    { label: 'Home',       href: 'home'       },
    { label: 'About',      href: 'about'      },
    { label: 'Programs',   href: 'programs'   },
    { label: 'Gallery',    href: 'gallery'    },
    { label: 'Faculty',    href: 'faculty'    },
    { label: 'Admissions', href: 'admissions' },
    { label: 'Contact',    href: 'contact'    },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
    this.updateActive();
  }

  private updateActive(): void {
    const ids = this.navLinks.map(l => l.href);
    for (const id of [...ids].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) {
        this.activeSection.set(id); return;
      }
    }
    this.activeSection.set('home');
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  scrollTo(id: string): void {
    this.closeMenu();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  }

  scrollToEnroll(): void {
    this.scrollTo('admissions');
    this.toast.show('Admissions are open! Fill the form below.', 'info', 3500);
  }
}
