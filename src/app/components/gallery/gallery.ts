import { Component, AfterViewInit, signal, computed } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import GLightbox from 'glightbox';

@Component({ selector: 'app-gallery', standalone: true, imports: [CommonModule, TitleCasePipe], templateUrl: './gallery.html', styleUrl: './gallery.css' })
export class Gallery implements AfterViewInit {
  activeFilter = signal('all');
  filters = ['all', 'classroom', 'activities', 'events', 'outdoor'];
  items = [
    { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=450&q=80&auto=format&fit=crop', label: 'Happy Kids',         cat: 'classroom',  cls: '' },
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=450&q=80&auto=format&fit=crop', label: 'Modern Classroom',   cat: 'classroom',  cls: 'tall' },
    { src: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=450&q=80&auto=format&fit=crop', label: 'Outdoor Fun',        cat: 'outdoor',    cls: '' },
    { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=450&q=80&auto=format&fit=crop', label: 'Interactive Learning', cat: 'classroom', cls: 'wide' },
    { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=450&q=80&auto=format&fit=crop', label: 'Art & Craft',        cat: 'activities', cls: '' },
    { src: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=450&q=80&auto=format&fit=crop', label: 'Story Time',         cat: 'activities', cls: '' },
    { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=450&q=80&auto=format&fit=crop', label: 'Annual Day',         cat: 'events',     cls: 'tall' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=450&q=80&auto=format&fit=crop', label: 'Playground',         cat: 'outdoor',    cls: '' },
    { src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=90', thumb: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=450&q=80&auto=format&fit=crop', label: 'Parent-Child Day',   cat: 'events',     cls: 'wide' },
  ];

  visibleItems = computed(() => {
    const f = this.activeFilter();
    return this.items.filter(i => f === 'all' || i.cat === f);
  });

  setFilter(f: string): void { this.activeFilter.set(f); setTimeout(() => this.initLightbox(), 50); }

  ngAfterViewInit(): void { this.initLightbox(); }

  private initLightbox(): void {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true, openEffect: 'zoom', closeEffect: 'fade', type: 'image' } as any);
  }
}
