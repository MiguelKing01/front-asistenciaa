import { Injectable, signal } from '@angular/core';

export interface AlumnoLista {
  id: number;
  nombre: string;
  correo: string;
  programa: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private readonly _alumnos = signal<AlumnoLista[]>([]);

  readonly alumnos = this._alumnos.asReadonly();

  cargarAlumnos(alumnos: AlumnoLista[]): void {
    this._alumnos.set(alumnos);
  }

  agregarAlumno(alumno: AlumnoLista): void {
    this._alumnos.update((as) => [...as, alumno]);
  }

  limpiarAlumnos(): void {
    this._alumnos.set([]);
  }
}
