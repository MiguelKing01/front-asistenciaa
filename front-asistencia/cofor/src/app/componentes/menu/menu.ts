import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  protected isCollapsed = false;
  protected isMobileMenuOpen = false;

  ngOnInit(): void {
    this.isCollapsed = this.readCollapsedState();
    this.updatePageLayout();
  }

  protected toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('menu-collapsed', String(this.isCollapsed));
    this.updatePageLayout();
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  protected readonly esAdmin = () => true;
  protected readonly esDocente = this.authService.esDocente;
  protected readonly esAlumno = () => true;

  protected logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  private readCollapsedState(): boolean {
    try {
      return localStorage.getItem('menu-collapsed') === 'true';
    } catch {
      return false;
    }
  }

  private updatePageLayout(): void {
    const page = this.host.nativeElement.parentElement;
    if (page) {
      if (this.isCollapsed) {
        this.renderer.addClass(page, 'menu-collapsed');
      } else {
        this.renderer.removeClass(page, 'menu-collapsed');
      }
    }
  }
}
