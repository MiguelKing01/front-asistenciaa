import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SesionesService } from '../../services/sesiones-service';
import { SesionesModel } from '../../models/Sesiones';
import { GruposService } from '../../services/grupos-service';
import { GruposModel } from '../../models/Grupos';

@Component({
  selector: 'app-sesiones',
  imports: [RouterLink],
  templateUrl: './sesiones.html',
  styleUrl: './sesiones.css',
})
export class Sesiones {
  private sesionesService = inject(SesionesService);
  sesiones: SesionesModel[] = [];
  private gruposService = inject(GruposService);
  grupos: GruposModel[] = [];
  idGrupos: number[] = [];

  getGrupo(id: number): GruposModel | undefined {
    return this.grupos.find(grupo => grupo.id_group === id);
  }

  ngOnInit() {
    this.sesionesService.getSessions().subscribe({
      next: (data) => {
        this.sesiones = data;
        this.idGrupos = data.map((session) => session.id_group);
        console.log('Todas las sesiones');
        console.log(this.sesiones);
        this.idGrupos.forEach((id) => {
          this.gruposService.getGroupById(id).subscribe({
            next: (data) => {
              this.grupos.push(data);
              console.log('Todas las sesiones');
              console.log(this.grupos);
            },
            error: (err) => {
              console.error(err);
            },
          });
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
