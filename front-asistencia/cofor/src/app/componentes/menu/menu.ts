import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly esAdmin = () => true;
  protected readonly esDocente = this.authService.esDocente;
  protected readonly esAlumno = () => true;

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
