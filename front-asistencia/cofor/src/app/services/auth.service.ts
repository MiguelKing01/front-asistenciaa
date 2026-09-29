import { Injectable, signal } from '@angular/core';

export type Rol = 'admin' | 'docente' | 'alumno';

export interface Usuario {
  id: number;
  nombre: string;
  rol: Rol;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _usuario = signal<Usuario | null>(null);

  readonly usuario = this._usuario.asReadonly();

  estaAutenticado(): boolean {
    return this._usuario() !== null;
  }

  esAdmin(): boolean {
    return this._usuario()?.rol === 'admin';
  }

  esAlumno(): boolean {
    return this._usuario()?.rol === 'alumno';
  }

  esDocente(): boolean {
    return this._usuario()?.rol === 'docente';
  }

  login(usuario: Usuario): void {
    this._usuario.set(usuario);
  }

  logout(): void {
    this._usuario.set(null);
  }
}
