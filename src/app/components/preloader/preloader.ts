import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({ selector: 'app-preloader', standalone: true, imports: [CommonModule], templateUrl: './preloader.html', styleUrl: './preloader.css' })
export class Preloader implements OnInit {
  hidden = signal(false);
  ngOnInit(): void {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.hidden.set(true);
      document.body.style.overflow = '';
    }, 2200);
  }
}
