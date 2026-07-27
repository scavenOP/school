import { Component } from '@angular/core';
@Component({ selector: 'app-ticker', standalone: true, imports: [], templateUrl: './ticker.html', styleUrl: './ticker.css' })
export class Ticker {
  notices = ['Admissions Open for 2025-26 Academic Year!','Sunshine Kids wins Best Preschool in East India 2024 Award!','Annual Day Celebration - 15th August 2025','New Summer Camp registrations now open!','Call us: +91 98765 43210 for a free school tour'];
}
