import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly bgMap: Record<ToastType, string> = {
    success: 'linear-gradient(135deg, #10B981, #34D399)',
    error:   'linear-gradient(135deg, #EF4444, #F87171)',
    warning: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    info:    'linear-gradient(135deg, #1A73E8, #06B6D4)',
  };
  private readonly iconMap: Record<ToastType, string> = {
    success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️',
  };

  show(message: string, type: ToastType = 'success', duration = 4000): void {
    Toastify({
      text: `${this.iconMap[type]}  ${message}`,
      duration,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      close: true,
      style: {
        background: this.bgMap[type],
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '600',
        fontSize: '14px',
        padding: '14px 20px',
        minWidth: '280px',
      },
    }).showToast();
  }
}
