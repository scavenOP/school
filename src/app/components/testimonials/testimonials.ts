import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({ selector: 'app-testimonials', standalone: true, imports: [], templateUrl: './testimonials.html', styleUrl: './testimonials.css' })
export class Testimonials implements AfterViewInit {
  reviews = [
    { text: 'My daughter Aanya has blossomed completely since joining Sunshine Kids. The teachers are incredibly patient and caring. She wakes up every morning so excited to go to school!', name: 'Priya Sharma', role: 'Parent of Aanya • Nursery Class', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&q=80&auto=format&fit=crop' },
    { text: 'The infrastructure is world-class and the methodology is truly international. My son Rohan learned to read and write 6 months ahead of his peers. Highly recommended!', name: 'Amit Banerjee', role: 'Parent of Rohan • LKG Class', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop' },
    { text: "As a working mom, I was worried about my child's safety. The CCTV access, regular app updates and dedicated staff have given me complete peace of mind. Truly a school I can trust!", name: 'Subha Chatterjee', role: 'Parent of Diya • Playgroup', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&auto=format&fit=crop' },
    { text: 'My twins Arjun and Aarav have been here for 3 years. The individual attention even in group settings is remarkable. The annual day performances are simply magical!', name: 'Rajesh Gupta', role: 'Parent of Arjun & Aarav • UKG', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&auto=format&fit=crop' },
    { text: 'Best decision we made for our daughter Ishika! The multilingual environment, nutritious food, and after-school activities make it truly a home away from home. 5 stars!', name: 'Moumita Das', role: 'Parent of Ishika • Nursery Class', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&auto=format&fit=crop' },
  ];
  ngAfterViewInit(): void {
    new Swiper('.testimonials-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1, spaceBetween: 28, loop: true, grabCursor: true,
      autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 640: { slidesPerView: 1 }, 900: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } },
    });
  }
}
