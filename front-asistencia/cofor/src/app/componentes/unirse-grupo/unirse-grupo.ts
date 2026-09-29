import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menu } from '../menu/menu';
import { GrupoService } from '../../services/grupo.service';

@Component({
  selector: 'app-unirse-grupo',
  imports: [FormsModule, Menu],
  templateUrl: './unirse-grupo.html',
  styleUrl: './unirse-grupo.css',
})
export class UnirseGrupo {
  private readonly grupoService = inject(GrupoService);

  protected readonly misGrupos = this.grupoService.misGrupos;
  protected readonly codigoAcceso = signal('');
  protected readonly loading = signal(false);
  protected readonly actionMessage = signal('');
  protected readonly errorMsg = signal('');

  protected unirseGrupo(): void {
    const codigo = this.codigoAcceso().trim();
    if (!codigo) {
      this.errorMsg.set('Ingresa un código de acceso.');
      return;
    }
    this.loading.set(true);
    this.errorMsg.set('');
    this.actionMessage.set('');

    // TODO: Llamar al backend para unirse al grupo
    // this.grupoService.unirseGrupo(codigo).subscribe(...)
  }
}
