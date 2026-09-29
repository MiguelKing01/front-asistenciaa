import { Injectable, signal } from '@angular/core';

export interface Asignacion {
  id: number;
  alumno: string;
  grupo: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class AsignacionService {
  private readonly _asignaciones = signal<Asignacion[]>([]);

  readonly asignaciones = this._asignaciones.asReadonly();

  // Métodos preparados para conexión al backend
  cargarAsignaciones(asignaciones: Asignacion[]): void {
    this._asignaciones.set(asignaciones);
  }

  agregarAsignacion(asignacion: Asignacion): void {
    this._asignaciones.update((as) => [...as, asignacion]);
  }

  limpiarAsignaciones(): void {
    this._asignaciones.set([]);
  }
}
