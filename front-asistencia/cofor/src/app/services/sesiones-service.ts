import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SesionesModel } from '../models/Sesiones';

@Injectable({
  providedIn: 'root',
})
export class SesionesService {
  private http = inject(HttpClient);

  private apiSesiones = 'http://localhost:4000/api/sesiones';

  getSessions(){
    return this.http.get<SesionesModel[]>(this.apiSesiones);
  }

  getSessionById(id: number){
    return this.http.get<SesionesModel>(`${this.apiSesiones}/id/${id}`);
  }

  getSessionByDate(date: Date){
    return this.http.get<SesionesModel[]>(`${this.apiSesiones}/date/${date}`);
  }

  getSessionsByGroup(id_group: number){
    return this.http.get<SesionesModel[]>(`${this.apiSesiones}/id_group/${id_group}`);

  }
  
  postSessions(sesion: Omit<SesionesModel, "id">){
    return this.http.post<SesionesModel>(this.apiSesiones, sesion);
  } 

  putSession(id: number, sesion: Partial<SesionesModel>){
    return this.http.put<SesionesModel>(`${this.apiSesiones}/actualizar/id/${id}`, sesion);
  }

  deleteSession(id: number){
    return this.http.put<SesionesModel>(`${this.apiSesiones}/eliminar/id/${id}`, {})
  }
}
