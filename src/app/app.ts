import { Component, OnInit, OnDestroy } from '@angular/core';
import AOS from 'aos';
import { Preloader } from './components/preloader/preloader';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Ticker } from './components/ticker/ticker';
import { Stats } from './components/stats/stats';
import { About } from './components/about/about';
import { Programs } from './components/programs/programs';
import { WhyUs } from './components/why-us/why-us';
import { Gallery } from './components/gallery/gallery';
import { Testimonials } from './components/testimonials/testimonials';
import { Faculty } from './components/faculty/faculty';
import { Admissions } from './components/admissions/admissions';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { FloatingElements } from './components/floating-elements/floating-elements';
import { Chatbot } from './components/chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Preloader, Navbar, Hero, Ticker, Stats, About, Programs,
    WhyUs, Gallery, Testimonials, Faculty, Admissions,
    Contact, Footer, FloatingElements, Chatbot
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  ngOnInit(): void {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });
  }
  ngOnDestroy(): void {}
}
