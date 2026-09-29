import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-explorar-grupos',
  imports: [RouterLink, Menu],
  templateUrl: './explorar-grupos.html',
  styleUrl: './explorar-grupos.css',
})
export class ExplorarGrupos {
  protected readonly grupos = [
    {
      id: 1,
      nombre: 'Ingeniería de Software',
      materia: 'Apps Móviles',
      promocion: '16A',
      codigo: 'GRP-2026-A',
      programa: 'Ingeniería de Software',
    },
    {
      id: 2,
      nombre: 'Ingeniería de Software',
      materia: 'Software Design',
      promocion: '16A',
      codigo: 'GRP-2026-B',
      programa: 'Ingeniería de Software',
    },
    {
      id: 3,
      nombre: 'Finanzas',
      materia: 'Cálculo I',
      promocion: '17A',
      codigo: 'GRP-2026-C',
      programa: 'Finanzas',
    },
    {
      id: 4,
      nombre: 'Marketing',
      materia: 'Gestión de Procesos',
      promocion: '17B',
      codigo: 'GRP-2026-D',
      programa: 'Marketing',
    },
    {
      id: 5,
      nombre: 'Ingeniería Industrial',
      materia: 'Apps Móviles',
      promocion: '16B',
      codigo: 'GRP-2026-E',
      programa: 'Ingeniería Industrial',
    },
    {
      id: 6,
      nombre: 'Ingeniería de Software',
      materia: 'Bases de Datos',
      promocion: '17A',
      codigo: 'GRP-2026-F',
      programa: 'Ingeniería de Software',
    },
  ];
}
