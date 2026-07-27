import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-admissions', standalone: true, imports: [CommonModule], templateUrl: './admissions.html', styleUrl: './admissions.css' })
export class Admissions {
  steps = [
    { num: '01', icon: '📋', title: 'Fill Inquiry Form', desc: 'Fill our simple online inquiry form below or call us to express your interest in enrollment.' },
    { num: '02', icon: '🏫', title: 'School Visit',     desc: 'Schedule a free school tour. Meet our teachers, explore facilities and see your child\'s future classroom.' },
    { num: '03', icon: '🎮', title: 'Child Assessment', desc: 'A friendly, play-based interaction to understand your child\'s development level and best-fit class.' },
    { num: '04', icon: '🎉', title: 'Confirm & Join!',  desc: 'Submit documents, complete payment, and welcome your little one to the Sunshine Kids family!' },
  ];
  scrollToContact(): void {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}
