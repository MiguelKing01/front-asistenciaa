import { Component, inject, signal } from '@angular/core';
import { Menu } from '../menu/menu';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno',
  imports: [Menu],
  templateUrl: './alumno.html',
  styleUrl: './alumno.css',
})
export class Alumno {
  private readonly alumnoService = inject(AlumnoService);

  protected readonly alumno = this.alumnoService.alumno;
  protected readonly editing = signal(false);
  protected readonly actionMessage = signal('');

  protected startEdit(): void {
    this.editing.set(true);
    this.actionMessage.set('');
  }

  protected cancelEdit(): void {
    this.editing.set(false);
    this.actionMessage.set('');
  }

  protected saveAlumno(firstName: string, lastName: string, email: string): void {
    this.alumnoService.actualizarAlumno({
      first_name: firstName,
      last_name: lastName,
      email,
    });
    this.editing.set(false);
    this.actionMessage.set('Datos actualizados correctamente.');
  }
}
