import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

type AccessibilityPreferences = {
  fontScale: number;
  highContrast: boolean;
};

@Component({
  selector: 'app-accesibilidad',
  standalone: true,
  templateUrl: './accesibilidad.html',
  styleUrl: './accesibilidad.css'
})
export class AccesibilidadComponent implements OnInit {
  readonly minimumScale = 90;
  readonly maximumScale = 130;
  readonly scaleStep = 10;
  isOpen = false;
  fontScale = 100;
  highContrast = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    this.restorePreferences();
    this.applyPreferences();
  }

  togglePanel(): void {
    this.isOpen = !this.isOpen;
  }

  changeFontSize(change: number): void {
    const nextScale = this.fontScale + change * this.scaleStep;
    this.fontScale = Math.min(this.maximumScale, Math.max(this.minimumScale, nextScale));
    this.saveAndApply();
  }

  toggleContrast(): void {
    this.highContrast = !this.highContrast;
    this.saveAndApply();
  }

  reset(): void {
    this.fontScale = 100;
    this.highContrast = false;
    this.saveAndApply();
  }

  private restorePreferences(): void {
    try {
      const stored = localStorage.getItem('accessibility-preferences');
      if (!stored) return;

      const preferences = JSON.parse(stored) as Partial<AccessibilityPreferences>;
      if (typeof preferences.fontScale === 'number') {
        this.fontScale = Math.min(this.maximumScale, Math.max(this.minimumScale, preferences.fontScale));
      }
      this.highContrast = preferences.highContrast === true;
    } catch {
      // Las preferencias son opcionales: la aplicación sigue funcionando si no se pueden leer.
    }
  }

  private saveAndApply(): void {
    try {
      localStorage.setItem(
        'accessibility-preferences',
        JSON.stringify({ fontScale: this.fontScale, highContrast: this.highContrast })
      );
    } catch {
      // Algunos navegadores pueden bloquear el almacenamiento; el cambio actual se mantiene.
    }
    this.applyPreferences();
  }

  private applyPreferences(): void {
    this.document.documentElement.style.fontSize = `${this.fontScale}%`;
    this.document.body.classList.toggle('high-contrast', this.highContrast);
  }
}
