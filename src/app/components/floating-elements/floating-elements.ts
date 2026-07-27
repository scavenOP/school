import { Component, OnInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { inject } from '@angular/core';

@Component({ selector: 'app-floating-elements', standalone: true, imports: [CommonModule], templateUrl: './floating-elements.html', styleUrl: './floating-elements.css' })
export class FloatingElements implements OnInit {
  private toast = inject(ToastService);
  showBTT    = signal(false);
  showCookie = signal(false);

  ngOnInit(): void {
    if (!localStorage.getItem('sk_cookies')) {
      setTimeout(() => this.showCookie.set(true), 3000);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void { this.showBTT.set(window.scrollY > 400); }

  scrollTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  acceptCookies(): void {
    localStorage.setItem('sk_cookies', '1');
    this.showCookie.set(false);
    this.toast.show('Preferences saved! Enjoy your visit.', 'success', 2500);
  }
  declineCookies(): void { this.showCookie.set(false); }
}
