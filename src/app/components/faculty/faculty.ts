import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-faculty', standalone: true, imports: [CommonModule], templateUrl: './faculty.html', styleUrl: './faculty.css' })
export class Faculty {
  members = [
    { name: 'Mrs. Supriya Bose',    role: 'Founder & Principal',          qual: 'M.Ed • 20+ Years Experience', desc: 'Pioneer in early childhood education with international Montessori certification.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&q=85&auto=format&fit=crop&crop=face' },
    { name: 'Ms. Pritha Mukherjee', role: 'Head of Academics',            qual: 'B.Ed • 12 Years Experience',   desc: 'Specialist in innovative curriculum design and play-based learning methodologies.', img: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=300&h=300&q=85&auto=format&fit=crop&crop=face' },
    { name: 'Mr. Arnab Sen',        role: 'Sports & Activity Coordinator', qual: 'B.P.Ed • 8 Years Experience',  desc: 'Expert in child fitness, yoga for kids, outdoor education and physical confidence.', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&q=85&auto=format&fit=crop&crop=face' },
    { name: 'Ms. Taniya Roy',       role: 'Arts & Creative Lead',          qual: 'M.F.A • 10 Years Experience',  desc: 'Award-winning art educator specialising in developmental art therapy for toddlers.', img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&h=300&q=85&auto=format&fit=crop&crop=face' },
  ];
}
