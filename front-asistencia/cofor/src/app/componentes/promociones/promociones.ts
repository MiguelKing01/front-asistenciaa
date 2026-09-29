import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';

interface Promotion {
  promotion_id: number;
  promotion_name: string;
  id_programs: number;
}

@Component({
  selector: 'app-promociones',
  imports: [RouterLink, Menu],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css',
})
export class Promociones {
  protected readonly promociones = signal<Promotion[]>([
    { promotion_id: 1, promotion_name: '2024-A', id_programs: 1 },
    { promotion_id: 2, promotion_name: '2024-B', id_programs: 1 },
    { promotion_id: 3, promotion_name: '2025-A', id_programs: 2 },
    { promotion_id: 4, promotion_name: '2025-B', id_programs: 3 },
    { promotion_id: 5, promotion_name: '2026-A', id_programs: 2 },
  ]);

  protected readonly search = signal('');
  protected readonly selectedId = signal<number | null>(null);
  protected readonly editingId = signal<number | null>(null);
  protected readonly creating = signal(false);
  protected readonly confirmingDelete = signal(false);
  protected readonly actionMessage = signal('');

  protected readonly filteredPromociones = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.promociones().filter((p) =>
      `${p.promotion_name} ${p.id_programs}`.toLowerCase().includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.search.set(value);
    this.selectedId.set(null);
  }

  protected selectPromocion(id: number): void {
    this.selectedId.set(id);
    this.confirmingDelete.set(false);
    this.actionMessage.set('');
  }

  protected addPromocion(): void {
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

  protected createPromocion(name: string, programs: string): void {
    const id = Math.max(0, ...this.promociones().map((p) => p.promotion_id)) + 1;
    this.promociones.update((ps) => [
      ...ps,
      { promotion_id: id, promotion_name: name, id_programs: Number(programs) },
    ]);
    this.creating.set(false);
    this.actionMessage.set('Promoción creada correctamente.');
  }

  protected savePromocion(id: number, name: string, programs: string): void {
    this.promociones.update((ps) =>
      ps.map((p) =>
        p.promotion_id === id
          ? { ...p, promotion_name: name, id_programs: Number(programs) }
          : p,
      ),
    );
    this.editingId.set(null);
    this.actionMessage.set('Promoción actualizada correctamente.');
  }

  protected deleteSelected(): void {
    this.confirmingDelete.set(true);
  }

  protected cancelDelete(): void { this.confirmingDelete.set(false); }

  protected confirmDelete(): void {
    const selectedId = this.selectedId();
    if (selectedId === null) return;
    this.promociones.update((ps) => ps.filter((p) => p.promotion_id !== selectedId));
    this.selectedId.set(null);
    this.confirmingDelete.set(false);
    this.actionMessage.set('Promoción eliminada correctamente.');
  }
}
