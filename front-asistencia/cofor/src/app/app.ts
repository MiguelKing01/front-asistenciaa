import { Component, signal } from '@angular/core';
import { Auth } from './componentes/auth/auth';
import { Alumnos } from './componentes/alumnos/alumnos';
import { Registrarse } from './componentes/registrarse/registrarse';
import { Sesiones } from './componentes/sesiones/sesiones';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Auth, Alumnos, Sesiones, Registrarse, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
