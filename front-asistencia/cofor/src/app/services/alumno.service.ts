import { Injectable, signal } from '@angular/core';

export interface Alumno {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  programa: string;
  codigo_estudiante: string;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private readonly _alumno = signal<Alumno | null>(null);

  readonly alumno = this._alumno.asReadonly();

  // Métodos preparados para conexión al backend
  cargarAlumno(alumno: Alumno): void {
    this._alumno.set(alumno);
  }

  actualizarAlumno(alumno: Partial<Alumno>): void {
    this._alumno.update((a) => (a ? { ...a, ...alumno } : a));
  }

  limpiarAlumno(): void {
    this._alumno.set(null);
  }
}
