import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/login';
import { DefaultResponse } from '../Models/default-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiURL = `${environment.API_URL}Auth/`;

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<DefaultResponse<Login>> {
    return this.http.post<DefaultResponse<Login>>(`${this.apiURL}Login`, login);
  }
}
