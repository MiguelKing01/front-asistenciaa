import { Injectable, signal } from '@angular/core';

export interface Grupo {
  id: number;
  codigo: string;
  nombre: string;
  programa: string;
}

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private readonly _misGrupos = signal<Grupo[]>([]);
  private readonly _grupos = signal<Grupo[]>([]);

  readonly misGrupos = this._misGrupos.asReadonly();
  readonly grupos = this._grupos.asReadonly();

  // Métodos preparados para conexión al backend
  cargarMisGrupos(grupos: Grupo[]): void {
    this._misGrupos.set(grupos);
  }

  cargarGrupos(grupos: Grupo[]): void {
    this._grupos.set(grupos);
  }

  agregarGrupo(grupo: Grupo): void {
    this._grupos.update((gs) => [...gs, grupo]);
  }

  limpiarGrupos(): void {
    this._grupos.set([]);
    this._misGrupos.set([]);
  }
}
