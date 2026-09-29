import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-crear-sesion',
  imports: [RouterLink, Menu],
  templateUrl: './crear-sesion.html',
  styleUrl: './crear-sesion.css',
})
export class CrearSesion {

}
