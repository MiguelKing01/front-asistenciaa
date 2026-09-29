import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';
import { GruposModel } from '../../models/Grupos';
import { GruposService } from '../../services/grupos-service';

@Component({
  selector: 'app-crear-asistencia',
  imports: [RouterLink, Menu],
  templateUrl: './crear-asistencia.html',
  styleUrl: './crear-asistencia.css',
})
export class CrearAsistencia {
  private gruposService = inject(GruposService);
  private route = inject(ActivatedRoute);
  usuariosGrupo: any[] = [];
  idGrupo!: number;

  ngOnInit() {

    this.idGrupo = Number(this.route.snapshot.paramMap.get('id_group'));

    console.log('ID DEL GRUPO:', this.idGrupo);

    this.gruposService.getUsersByGroup(this.idGrupo).subscribe({
      next: (data) => {
        this.usuariosGrupo = data;

        console.log('Usuarios del grupo:');
        console.log(this.usuariosGrupo);
      },
      error: (error) => {
        console.error('Error obteniendo usuarios del grupo:', error);
      }
    });
  }
} 
