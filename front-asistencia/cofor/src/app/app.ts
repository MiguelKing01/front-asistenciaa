import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccesibilidadComponent } from './componentes/accesibilidad/accesibilidad';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccesibilidadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
