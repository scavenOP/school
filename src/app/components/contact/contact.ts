import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

@Component({ selector: 'app-contact', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './contact.html', styleUrl: './contact.css' })
export class Contact {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  submitting = signal(false);

  form: FormGroup = this.fb.group({
    parentName: ['', [Validators.required, Validators.minLength(2)]],
    childName:  ['', [Validators.required, Validators.minLength(2)]],
    phone:      ['', [Validators.required, Validators.pattern(/^[+\d][\d\s\-]{9,14}$/)]],
    email:      ['', [Validators.email]],
    childAge:   ['', Validators.required],
    message:    [''],
    consent:    [false, Validators.requiredTrue],
  });

  err(field: string): string {
    const c: AbstractControl | null = this.form.get(field);
    if (!c || !c.invalid || !c.touched) return '';
    if (c.errors?.['required'])    return 'This field is required.';
    if (c.errors?.['minlength'])   return 'Too short.';
    if (c.errors?.['pattern'])     return 'Enter a valid phone number.';
    if (c.errors?.['email'])       return 'Enter a valid email address.';
    if (c.errors?.['requiredTrue'])return 'You must accept to continue.';
    return '';
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) { this.toast.show('Please fix the errors above.', 'error'); return; }
    this.submitting.set(true);
    await new Promise(r => setTimeout(r, 1800));
    this.submitting.set(false);
    this.toast.show('Thank you! We will contact you within 24 hours.', 'success', 5000);
    this.form.reset();
    this.launchConfetti();
  }

  private launchConfetti(): void {
    const colours = ['#FF6B35','#FFD166','#7B2FBE','#10B981','#1A73E8','#EC4899'];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('div');
      c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:${Math.random()*10+5}px;height:${Math.random()*10+5}px;background:${colours[Math.floor(Math.random()*colours.length)]};border-radius:${Math.random()>.5?'50%':'2px'};z-index:99999;pointer-events:none;animation:confettiFall ${Math.random()*2+2}s linear ${Math.random()}s forwards;`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }
}
