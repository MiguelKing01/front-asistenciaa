import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menu } from '../menu/menu';
import { AlumnosService } from '../../services/alumnos.service';
import { GrupoService } from '../../services/grupo.service';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-asignar-alumno',
  imports: [FormsModule, Menu],
  templateUrl: './asignar-alumno.html',
  styleUrl: './asignar-alumno.css',
})
export class AsignarAlumno {
  private readonly alumnosService = inject(AlumnosService);
  private readonly grupoService = inject(GrupoService);
  private readonly asignacionService = inject(AsignacionService);

  protected readonly alumnos = this.alumnosService.alumnos;
  protected readonly grupos = this.grupoService.grupos;
  protected readonly asignaciones = this.asignacionService.asignaciones;

  protected readonly search = signal('');
  protected readonly selectedAlumno = signal<number | null>(null);
  protected readonly selectedGrupo = signal<number | null>(null);
  protected readonly actionMessage = signal('');
  protected readonly errorMsg = signal('');

  protected readonly filteredAlumnos = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.alumnos().filter((a) =>
      `${a.nombre} ${a.correo}`.toLowerCase().includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.search.set(value);
    this.selectedAlumno.set(null);
  }

  protected selectAlumno(id: number): void {
    this.selectedAlumno.set(id);
    this.errorMsg.set('');
  }

  protected asignar(): void {
    if (this.selectedAlumno() === null || this.selectedGrupo() === null) {
      this.errorMsg.set('Selecciona un alumno y un grupo.');
      return;
    }
    this.errorMsg.set('');
    this.actionMessage.set('Alumno asignado correctamente.');
    this.selectedAlumno.set(null);
    this.selectedGrupo.set(null);
  }

  protected getAlumnoNombre(id: number): string {
    return this.alumnos().find((a) => a.id === id)?.nombre ?? 'Desconocido';
  }

  protected getGrupoNombre(id: number): string {
    return this.grupos().find((g) => g.id === id)?.nombre ?? 'Desconocido';
  }
}
