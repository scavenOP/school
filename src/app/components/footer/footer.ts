import { Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({ selector: 'app-footer', standalone: true, imports: [CommonModule, TitleCasePipe], templateUrl: './footer.html', styleUrl: './footer.css' })
export class Footer {
  private toast = inject(ToastService);
  currentYear = new Date().getFullYear();
  quickLinks = ['home','about','programs','gallery','faculty','admissions','contact'];

  subscribe(email: string, input: HTMLInputElement): void {
    if (!email.trim()) { this.toast.show('Please enter your email address.', 'warning'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { this.toast.show('Please enter a valid email address.', 'error'); return; }
    input.value = '';
    this.toast.show('Successfully subscribed to our newsletter!', 'success');
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}
