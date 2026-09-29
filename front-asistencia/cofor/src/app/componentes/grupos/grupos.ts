import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';

interface Group {
  group_id: number;
  group_acces_code: string;
  id_subjects: number;
  id_promotion: number;
  id_programs: number;
}

@Component({
  selector: 'app-grupos',
  imports: [RouterLink, Menu],
  templateUrl: './grupos.html',
  styleUrl: './grupos.css',
})
export class Grupos {
  protected readonly grupos = signal<Group[]>([
    { group_id: 1, group_acces_code: 'GRP-2024-A', id_subjects: 1, id_promotion: 1, id_programs: 1 },
    { group_id: 2, group_acces_code: 'GRP-2024-B', id_subjects: 2, id_promotion: 1, id_programs: 1 },
    { group_id: 3, group_acces_code: 'GRP-2025-A', id_subjects: 3, id_promotion: 2, id_programs: 2 },
    { group_id: 4, group_acces_code: 'GRP-2025-B', id_subjects: 1, id_promotion: 2, id_programs: 3 },
    { group_id: 5, group_acces_code: 'GRP-2026-A', id_subjects: 4, id_promotion: 3, id_programs: 2 },
  ]);

  protected readonly search = signal('');
  protected readonly selectedId = signal<number | null>(null);
  protected readonly editingId = signal<number | null>(null);
  protected readonly creating = signal(false);
  protected readonly confirmingDelete = signal(false);
  protected readonly actionMessage = signal('');

  protected readonly filteredGroups = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.grupos().filter((g) =>
      `${g.group_acces_code} ${g.id_subjects} ${g.id_promotion} ${g.id_programs}`
        .toLowerCase()
        .includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.search.set(value);
    this.selectedId.set(null);
  }

  protected selectGrupo(id: number): void {
    this.selectedId.set(id);
    this.confirmingDelete.set(false);
    this.actionMessage.set('');
  }

  protected addGrupo(): void {
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

  protected createGrupo(code: string, subjects: string, promotion: string, programs: string): void {
    const id = Math.max(0, ...this.grupos().map((g) => g.group_id)) + 1;
    this.grupos.update((gs) => [
      ...gs,
      {
        group_id: id,
        group_acces_code: code,
        id_subjects: Number(subjects),
        id_promotion: Number(promotion),
        id_programs: Number(programs),
      },
    ]);
    this.creating.set(false);
    this.actionMessage.set('Grupo creado correctamente.');
  }

  protected saveGrupo(id: number, code: string, subjects: string, promotion: string, programs: string): void {
    this.grupos.update((gs) =>
      gs.map((g) =>
        g.group_id === id
          ? { ...g, group_acces_code: code, id_subjects: Number(subjects), id_promotion: Number(promotion), id_programs: Number(programs) }
          : g,
      ),
    );
    this.editingId.set(null);
    this.actionMessage.set('Grupo actualizado correctamente.');
  }

  protected deleteSelected(): void {
    this.confirmingDelete.set(true);
  }

  protected cancelDelete(): void { this.confirmingDelete.set(false); }

  protected confirmDelete(): void {
    const selectedId = this.selectedId();
    if (selectedId === null) return;
    this.grupos.update((gs) => gs.filter((g) => g.group_id !== selectedId));
    this.selectedId.set(null);
    this.confirmingDelete.set(false);
    this.actionMessage.set('Grupo eliminado correctamente.');
  }
}
