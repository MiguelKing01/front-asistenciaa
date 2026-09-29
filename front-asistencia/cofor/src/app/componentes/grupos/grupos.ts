import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';

interface Group {
  group_id: number;
  group_acces_code: string;
  subjectName: string;
  promotionName: string;
  programName: string;
}

@Component({
  selector: 'app-grupos',
  imports: [RouterLink, Menu],
  templateUrl: './grupos.html',
  styleUrl: './grupos.css',
})
export class Grupos {
  protected readonly grupos = signal<Group[]>([
    { group_id: 1, group_acces_code: 'GRP-2024-A', subjectName: 'Aplicaciones híbridas', promotionName: '16A', programName: 'Ingeniería de software' },
    { group_id: 2, group_acces_code: 'GRP-2024-B', subjectName: 'Bases de datos', promotionName: '16B', programName: 'Ingeniería de software' },
    { group_id: 3, group_acces_code: 'GRP-2025-A', subjectName: 'Marketing digital', promotionName: '13A', programName: 'Administración de empresas' },
    { group_id: 4, group_acces_code: 'GRP-2025-B', subjectName: 'Gestión de proyectos', promotionName: '13B', programName: 'Administración de empresas' },
    { group_id: 5, group_acces_code: 'GRP-2026-A', subjectName: 'Desarrollo web', promotionName: '16A', programName: 'Ingeniería de software' },
  ]);

  protected readonly search = signal('');
  protected readonly selectedId = signal<number | null>(null);
  protected readonly editingId = signal<number | null>(null);
  protected readonly creating = signal(false);
  protected readonly confirmingDelete = signal(false);
  protected readonly actionMessage = signal('');
  protected readonly showQrModal = signal(false);

  protected readonly filteredGroups = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.grupos().filter((g) =>
      `${g.group_acces_code} ${g.subjectName} ${g.promotionName} ${g.programName}`
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

  protected createGrupo(code: string, subjectName: string, promotionName: string, programName: string): void {
    const id = Math.max(0, ...this.grupos().map((g) => g.group_id)) + 1;
    this.grupos.update((gs) => [
      ...gs,
      {
        group_id: id,
        group_acces_code: code,
        subjectName,
        promotionName,
        programName,
      },
    ]);
    this.creating.set(false);
    this.actionMessage.set('Grupo creado correctamente.');
  }

  protected saveGrupo(id: number, code: string, subjectName: string, promotionName: string, programName: string): void {
    this.grupos.update((gs) =>
      gs.map((g) =>
        g.group_id === id
          ? { ...g, group_acces_code: code, subjectName, promotionName, programName }
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

  protected selectedGroupCode(): string {
    const id = this.selectedId();
    if (id === null) return '';
    return this.grupos().find((g) => g.group_id === id)?.group_acces_code ?? '';
  }

  protected openQrModal(): void {
    this.showQrModal.set(true);
  }

  protected closeQrModal(): void {
    this.showQrModal.set(false);
  }
}
