import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';
import { gsap } from 'gsap';

interface Particle { x: number; y: number; r: number; vx: number; vy: number; alpha: number; colour: string; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('typedEl')   typedRef!: ElementRef<HTMLSpanElement>;

  private typed!: Typed;
  private animId = 0;
  private particles: Particle[] = [];

  readonly shapes = ['⭐','🎈','🌸','🎨','🌟','🦋','🎭','🌈','🎠','🧩'];

  ngAfterViewInit(): void {
    this.initCanvas();
    this.initTyped();
    this.initGsap();
  }

  private initTyped(): void {
    this.typed = new Typed(this.typedRef.nativeElement, {
      strings: ['Playgroup Programs','Nursery Classes','LKG &amp; UKG','Creative Activities','Safe Learning','Montessori Methods','Fun &amp; Education'],
      typeSpeed: 60, backSpeed: 35, backDelay: 1800, loop: true, smartBackspace: true,
    });
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const colours = ['255,213,102','255,107,53','123,47,190','6,182,212','255,255,255'];

    let logW = 0, logH = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      logW = rect.width;
      logH = rect.height;
      canvas.width  = Math.floor(logW * dpr);
      canvas.height = Math.floor(logH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const makeParticle = (): Particle => ({
      x: Math.random() * logW, y: Math.random() * logH,
      r: Math.random() * 2 + 0.5, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.2, colour: colours[Math.floor(Math.random() * colours.length)],
    });
    this.particles = Array.from({ length: 120 }, makeParticle);

    const draw = () => {
      ctx.clearRect(0, 0, logW, logH);
      this.particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > logW || p.y < 0 || p.y > logH) Object.assign(p, makeParticle());
        ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = `rgba(${p.colour},1)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x, dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.save(); ctx.globalAlpha = (1 - dist / 80) * 0.07; ctx.strokeStyle = 'rgba(255,255,255,1)'; ctx.lineWidth = 0.4;
            ctx.beginPath(); ctx.moveTo(this.particles[i].x, this.particles[i].y); ctx.lineTo(this.particles[j].x, this.particles[j].y); ctx.stroke(); ctx.restore();
          }
        }
      }
      this.animId = requestAnimationFrame(draw);
    };
    draw();
  }

  private initGsap(): void {
    gsap.from('.hero-badge',    { opacity: 0, y: -30, duration: 0.7, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-heading',  { opacity: 0, y: 40,  duration: 0.8, delay: 0.4, ease: 'power3.out' });
    gsap.from('.hero-para',     { opacity: 0, y: 30,  duration: 0.7, delay: 0.6, ease: 'power3.out' });
    gsap.from('.hero-typed-line',{ opacity: 0, y: 20, duration: 0.6, delay: 0.7, ease: 'power3.out' });
    gsap.from('.hero-btns',     { opacity: 0, y: 20,  duration: 0.6, delay: 0.8, ease: 'power3.out' });
    gsap.from('.hero-trust-bar',{ opacity: 0, y: 20,  duration: 0.6, delay: 0.9, ease: 'power3.out' });
    gsap.from('.hero-img-frame',{ opacity: 0, scale: 0.8, rotate: -5, duration: 1.2, delay: 0.5, ease: 'back.out(1.2)' });
    gsap.from('.hero-float-card',{ opacity: 0, scale: 0.5, duration: 0.6, stagger: 0.2, delay: 1.2, ease: 'back.out(1.5)' });
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.typed?.destroy();
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
