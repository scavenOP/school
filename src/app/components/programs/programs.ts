import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({ selector: 'app-programs', standalone: true, imports: [CommonModule], templateUrl: './programs.html', styleUrl: './programs.css' })
export class Programs {
  private toast = inject(ToastService);
  programs = [
    { emoji: '👶', age: '1.5 – 2.5 Years', name: 'Playgroup', desc: 'First step into school life. Sensory play, basic social skills and separation in a loving environment.', features: ['Sensory Play Activities','Music & Movement','Story Time Daily','3 Hours / Day'], fee: '₹3,500', popular: false, gradient: 'linear-gradient(135deg,#FF6B35,#FF9A3C)', value: 'playgroup' },
    { emoji: '🎨', age: '2.5 – 3.5 Years', name: 'Nursery',   desc: 'Building foundations with alphabets, numbers, and creative expression through art and craft.', features: ['Alphabet & Numbers','Art & Craft Projects','Computer Basics','4 Hours / Day'], fee: '₹4,500', popular: true, gradient: 'linear-gradient(135deg,#7B2FBE,#A855F7)', value: 'nursery' },
    { emoji: '📚', age: '3.5 – 4.5 Years', name: 'LKG',      desc: 'Reading readiness, number concepts, and preparation for formal schooling ahead.', features: ['Reading Readiness','Math Concepts','Science Exploration','5 Hours / Day'], fee: '₹5,500', popular: false, gradient: 'linear-gradient(135deg,#1A73E8,#06B6D4)', value: 'lkg' },
    { emoji: '🎓', age: '4.5 – 5.5 Years', name: 'UKG',      desc: 'Advanced literacy, numeracy, and complete school readiness skills for young learners.', features: ['Advanced Literacy','Critical Thinking','Sports & Fitness','5 Hours / Day'], fee: '₹6,000', popular: false, gradient: 'linear-gradient(135deg,#10B981,#34D399)', value: 'ukg' },
  ];
  enquire(p: typeof this.programs[0]): void {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setTimeout(() => { const s = document.getElementById('childAge') as HTMLSelectElement; if (s) s.value = p.value; }, 600);
    this.toast.show('Enquiry for ' + p.name + ' selected! Fill the form below.', 'info', 3500);
  }
}
