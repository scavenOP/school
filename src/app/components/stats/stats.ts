import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({ selector: 'app-stats', standalone: true, imports: [CommonModule], templateUrl: './stats.html', styleUrl: './stats.css' })
export class Stats implements AfterViewInit {
  stats = [
    { emoji: 'baby', label: 'Kids Enrolled', target: 500, current: signal(0), suffix: '+' },
    { emoji: 'teacher', label: 'Expert Teachers', target: 25, current: signal(0), suffix: '+' },
    { emoji: 'trophy', label: 'Years of Excellence', target: 15, current: signal(0), suffix: '+' },
    { emoji: 'star', label: 'Awards Won', target: 30, current: signal(0), suffix: '+' },
    { emoji: 'smile', label: 'Parent Satisfaction', target: 98, current: signal(0), suffix: '%' },
  ];
  readonly emojiMap: Record<string,string> = { baby: 'baby', teacher: 'teacher', trophy: 'trophy', star: 'star', smile: 'smile' };
  readonly displayEmojis: Record<string,string> = { baby: '👶', teacher: '👩‍🏫', trophy: '🏆', star: '⭐', smile: '😊' };
  ngAfterViewInit(): void {
    const els = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting && !(e.target as HTMLElement).dataset['animated']) {
          (e.target as HTMLElement).dataset['animated'] = '1';
          this.animateCount(idx);
        }
      });
    }, { threshold: 0.4 });
    els.forEach(el => obs.observe(el));
  }
  animateCount(idx: number): void {
    const s = this.stats[idx]; const dur = 2000; const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor((1 - Math.pow(1 - p, 3)) * s.target);
      s.current.set(val);
      if (p < 1) requestAnimationFrame(step); else s.current.set(s.target);
    };
    requestAnimationFrame(step);
  }
}
