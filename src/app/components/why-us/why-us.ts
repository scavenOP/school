import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-why-us', standalone: true, imports: [CommonModule], templateUrl: './why-us.html', styleUrl: './why-us.css' })
export class WhyUs {
  items = [
    { icon: '🏫', title: 'World-Class Infrastructure', desc: 'Spacious classrooms, indoor playground, music room, art studio, computer lab and library designed for young learners.' },
    { icon: '👩‍🏫', title: 'Certified & Caring Teachers', desc: 'All faculty are B.Ed / ECE certified with specialised training in early childhood Montessori and play-based education.' },
    { icon: '🍎', title: 'Nutritious Meals', desc: 'Freshly prepared, balanced, age-appropriate meals and snacks designed by certified nutritionists every single day.' },
    { icon: '📱', title: 'Parent App & Updates', desc: 'Daily photos, progress reports, and real-time school updates through our dedicated parent communication app.' },
    { icon: '🎭', title: 'Cultural & Creative Activities', desc: 'Dance, music, drama, yoga, and art classes to nurture hidden talents and creative self-expression in every child.' },
    { icon: '🚌', title: 'Safe Transportation', desc: 'GPS-tracked, air-conditioned school buses with trained female attendants and live parent tracking for peace of mind.' },
  ];
}
