import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsistenciaService } from '../../services/asistenciaService';
import { AsistenciaModel } from '../../models/Asistencia';

@Component({
  selector: 'app-asistencia',
  imports: [RouterLink],
  templateUrl: './asistencia.html',
  styleUrl: './asistencia.css',
})
export class Asistencia {
  private asistenciaService = inject(AsistenciaService)

  asistencia: AsistenciaModel[] = [];
  asistencia2?: AsistenciaModel;

  // nuevaAsistencia: AsistenciaModel = {
  //   date: new Date('2023-05-27'),
  //   user_id: 2,
  //   session_id: 14,
  //   status: 1
  // }


  ngOnInit(){
    this.asistenciaService.getAttendance().subscribe({
      next: (data) => {
        this.asistencia = data;
        console.log("Todas las asistencias");
        console.log(this.asistencia);
      },
      error: (err) => {
        console.error(err);
      }
    })



    this.asistenciaService.getAttendanceById(7).subscribe({
      next: (data) => {
        this.as istencia2 = data;
        console.log("Asistencia por ID 2");
        console.log(this.asistencia2);
      },
      error: (err) => {
        console.error(err);
      }
    })

    // this.asistenciaService.postAttendance(this.nuevaAsistencia).subscribe({
    //   next: (data) => {
    //     this.asistencia2 = data;
    //     console.log("Crear asistencia");
    //     console.log(this.asistencia2);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })

  }
}
