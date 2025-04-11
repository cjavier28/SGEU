import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../Models/default-response';
import { MateriaProgramaDTO } from '../Models/materia-programa-dto';
import { MateriaEstudiante } from '../Models/materia-estudiante';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiURL = `${environment.API_URL}Materia/`;

  constructor(private http: HttpClient) { }

  getMaterias(id: number): Observable<DefaultResponse<MateriaProgramaDTO[]>> {    
    return this.http.get<DefaultResponse<MateriaProgramaDTO[]>>(`${this.apiURL}GetMateriasByIdPrograma/${id}`)
  }

  getMateriasEstudiante(id: string): Observable<DefaultResponse<MateriaEstudiante[]>> {    
    return this.http.get<DefaultResponse<MateriaEstudiante[]>>(`${this.apiURL}GetMateriaByEstudiante/${id}`)
  }
}
