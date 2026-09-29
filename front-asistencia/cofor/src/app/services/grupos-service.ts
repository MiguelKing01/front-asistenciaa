import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GruposModel } from '../models/Grupos';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  private http = inject(HttpClient);

  private apiGrupos = 'http://localhost:4000/api/grupos';

  getGroups(){
    return this.http.get<GruposModel[]>(this.apiGrupos);
  }

  getGroupById(id_group: number){
    return this.http.get<GruposModel>(`${this.apiGrupos}/id/${id_group}`);
  }

  getGroupBySubject(id_subjects: number){
    return this.http.get<GruposModel[]>(`${this.apiGrupos}/materias/id/${id_subjects}`);
  }

  getGroupByProgram(id_programs: number){
    return this.http.get<GruposModel[]>(`${this.apiGrupos}/programas/id/${id_programs}`);

  }

  getGroupByPromotion(id_promotion: number){
    return this.http.get<GruposModel[]>(`${this.apiGrupos}/promociones/id/${id_promotion}`);

  }

  getUsersByGroup(id: number){
    return this.http.get<GruposModel[]>(`${this.apiGrupos}/estudiantes/id/${id}`);

  }
  
  postGroup(group: Omit<GruposModel, "id">){
    return this.http.post<GruposModel>(this.apiGrupos, group);
  } 

  putGroup(id_group: number, group: Partial<GruposModel>){
    return this.http.put<GruposModel>(`${this.apiGrupos}/actualizar/id_group/${id_group}`, group);
  }

  deleteGroup(id_group: number){
    return this.http.put<GruposModel>(`${this.apiGrupos}/eliminar/id/${id_group}`, {})
  }
}
