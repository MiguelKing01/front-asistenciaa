import { Component, computed, signal } from '@angular/core';
import { Menu } from '../menu/menu';

interface Usuario {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  program_id: number;
  status_id: number;
}

interface Rol {
  id: number;
  nombre: string;
}

interface Programa {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [Menu],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  protected readonly usuarios = signal<Usuario[]>([
    { id: 1, first_name: 'Mariana', last_name: 'Torres', email: 'mariana.torres@uni.edu.co', password: 'pass123', role_id: 3, program_id: 1, status_id: 1 },
    { id: 2, first_name: 'Juan David', last_name: 'Ruiz', email: 'juan.ruiz@uni.edu.co', password: 'pass123', role_id: 3, program_id: 1, status_id: 1 },
    { id: 3, first_name: 'Sofía', last_name: 'Hernández', email: 'sofia.hernandez@uni.edu.co', password: 'pass123', role_id: 3, program_id: 2, status_id: 1 },
    { id: 4, first_name: 'Carlos', last_name: 'Mendoza', email: 'carlos.mendoza@uni.edu.co', password: 'pass123', role_id: 2, program_id: 2, status_id: 1 },
    { id: 5, first_name: 'Valentina', last_name: 'Castro', email: 'valentina.castro@uni.edu.co', password: 'pass123', role_id: 1, program_id: 1, status_id: 1 },
  ]);

  protected readonly roles = signal<Rol[]>([
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Docente' },
    { id: 3, nombre: 'Alumno' },
  ]);

  protected readonly programas = signal<Programa[]>([
    { id: 1, nombre: 'Ingeniería de Sistemas' },
    { id: 2, nombre: 'Administración de Empresas' },
    { id: 3, nombre: 'Contaduría Pública' },
  ]);

  protected readonly search = signal('');
  protected readonly selectedId = signal<number | null>(null);
  protected readonly editingId = signal<number | null>(null);
  protected readonly creating = signal(false);
  protected readonly confirmingDelete = signal(false);
  protected readonly actionMessage = signal('');

  protected readonly filteredUsuarios = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.usuarios().filter((u) =>
      `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.search.set(value);
    this.selectedId.set(null);
  }

  protected selectUsuario(id: number): void {
    this.selectedId.set(id);
    this.confirmingDelete.set(false);
    this.actionMessage.set('');
  }

  protected addUsuario(): void {
    this.creating.set(true);
    this.editingId.set(null);
    this.confirmingDelete.set(false);
    this.actionMessage.set('');
  }

  protected editSelected(): void {
    this.editingId.set(this.selectedId());
    this.actionMessage.set('');
  }

  protected cancelEdit(): void { this.editingId.set(null); }
  protected cancelCreate(): void { this.creating.set(false); }

  protected createUsuario(firstName: string, lastName: string, email: string, password: string, roleId: string, programId: string): void {
    const id = Math.max(0, ...this.usuarios().map((u) => u.id)) + 1;
    this.usuarios.update((usuarios) => [
      ...usuarios,
      {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role_id: Number(roleId),
        program_id: Number(programId),
        status_id: 1,
      },
    ]);
    this.creating.set(false);
    this.actionMessage.set('Usuario creado correctamente.');
  }

  protected saveUsuario(id: number, firstName: string, lastName: string, email: string, password: string, roleId: string, programId: string): void {
    this.usuarios.update((usuarios) =>
      usuarios.map((u) =>
        u.id === id
          ? { ...u, first_name: firstName, last_name: lastName, email, password, role_id: Number(roleId), program_id: Number(programId) }
          : u,
      ),
    );
    this.editingId.set(null);
    this.actionMessage.set('Usuario actualizado correctamente.');
  }

  protected deleteSelected(): void {
    this.confirmingDelete.set(true);
  }

  protected cancelDelete(): void { this.confirmingDelete.set(false); }

  protected confirmDelete(): void {
    const selectedId = this.selectedId();
    if (selectedId === null) return;
    this.usuarios.update((usuarios) => usuarios.filter((u) => u.id !== selectedId));
    this.selectedId.set(null);
    this.confirmingDelete.set(false);
    this.actionMessage.set('Usuario eliminado correctamente.');
  }

  protected getRolNombre(id: number): string {
    return this.roles().find((r) => r.id === id)?.nombre ?? 'Desconocido';
  }

  protected getProgramaNombre(id: number): string {
    return this.programas().find((p) => p.id === id)?.nombre ?? 'Sin programa';
  }

  protected getEstadoNombre(id: number): string {
    return id === 1 ? 'Activo' : 'Inactivo';
  }
}
