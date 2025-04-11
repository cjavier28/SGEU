import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Estudiante } from '../Models/estudiante';
import { DefaultResponse } from '../Models/default-response';
import { EstudiantesPrograma } from '../Models/estudiantes-programa';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
private apiURL = `${environment.API_URL}Estudiante/`;

  constructor(private http: HttpClient) {}

  registrarse(estudiante: Estudiante): Observable<DefaultResponse<Estudiante>> {
      return this.http.post<DefaultResponse<Estudiante>>(`${this.apiURL}CreateEstudiante`, estudiante);
    }

  updateEstudiante(idEstudiante: string, idPrograma: number): Observable<DefaultResponse<Estudiante>> {
    const url = `${this.apiURL}UpdateEstudiante/${idEstudiante}/${idPrograma}`;
    return this.http.put<DefaultResponse<Estudiante>>(url, {});
  }

  registrarMateriasEstudiante(idEstudiante: string, idMaterias: number[]): Observable<DefaultResponse<any>> {
    return this.http.post<DefaultResponse<any>>(`${this.apiURL}RegistrarMateriasEstudiante`, { idEstudiante, idMaterias });
  }
  
  getEstudiantes(idPrograma: number): Observable<DefaultResponse<EstudiantesPrograma[]>>{
    return this.http.get<DefaultResponse<EstudiantesPrograma[]>>(`${this.apiURL}GetEstudianteByPrograma/${idPrograma}`);
  }

  deleteMateriasEstudiante(idEstudiante: string, idMateria: number): Observable<DefaultResponse<string>> {
    return this.http.delete<DefaultResponse<string>>(`${this.apiURL}DeleteMateriaEstudiante?idEstudiante=${idEstudiante}&idMateria=${idMateria}`);
  }  

  updateIdPrograma(idEstudiante: string, newId: number): Observable<DefaultResponse<Estudiante>> {
    const url = `${this.apiURL}UpdateEstudiante/${idEstudiante}/${newId}`;    
    return this.http.put<DefaultResponse<Estudiante>>(url, {});
  }  

  getIdProgramaFromLocalStorage(): number | null {
    const idP = localStorage.getItem('idP');
    return idP ? Number(idP) : null;
  }
}
