import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsistenciaModel } from '../models/Asistencia';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {

  private http = inject(HttpClient);

  private apiAsistencia = 'http://localhost:4000/api/asistencias';

  getAttendance(){
    return this.http.get<AsistenciaModel[]>(this.apiAsistencia);
  }

  getAttendanceById(id: number){
    return this.http.get<AsistenciaModel>(`${this.apiAsistencia}/id/${id}`);
  }

  getAttendanceByDate(date: Date){
    return this.http.get<AsistenciaModel[]>(`${this.apiAsistencia}/date/${date}`);
  }

  getAttendanceByUser(id: number){
    return this.http.get<AsistenciaModel[]>(`${this.apiAsistencia}/userid/${id}`);
  }

  getAttendanceBySession(id: number){
    return this.http.get<AsistenciaModel[]>(`${this.apiAsistencia}/sesionid/${id}`);

  }
  
  postAttendance(asistencia: Omit<AsistenciaModel, "id">){
    return this.http.post<AsistenciaModel>(this.apiAsistencia, asistencia);
  } 

  putAttendance(id: number, asistencia: Partial<AsistenciaModel>){
    return this.http.put<AsistenciaModel>(`${this.apiAsistencia}/actualizar/id/${id}`, asistencia)
  }

  deleteAttendance(id: number){
    return this.http.put<AsistenciaModel>(`${this.apiAsistencia}/eliminar/id/${id}`, {})
  }
  
}
