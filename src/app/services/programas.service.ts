import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultResponse } from '../Models/default-response';
import { Observable } from 'rxjs';
import { ProgramaDTO } from '../Models/programaDTO';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  private apiURL = `${environment.API_URL}Programa/`;
  
    constructor(private http: HttpClient) {}
  
    getProgramas(): Observable<DefaultResponse<ProgramaDTO[]>> {
      return this.http.get<DefaultResponse<ProgramaDTO[]>>(`${this.apiURL}GetProgramas`);
    }
}
