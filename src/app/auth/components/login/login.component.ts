import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../Models/login';
export interface UserInfoFromToken {
  sub?: string;
  email?: string;
  nombre?: string;
  exp?: number; // Timestamp Unix en segundos
  iss?: string;
  aud?: string;
  [key: string]: any; // Permite otras propiedades no conocidas
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private fb = inject (FormBuilder );

  public formLogin: FormGroup = this.fb.group({
    id: ['', [  ]] ,
    email: ['', [ Validators.required, Validators.email ]] ,
    password: ['', [ Validators.required, Validators.minLength(5) ]]
  });

   constructor(private loginService: LoginService, private router: Router) {}

   login() {

      // ✅ Verifica si el formulario es inválido y marca todos los campos como tocados
  if (this.formLogin.invalid) {
    this.formLogin.markAllAsTouched();
    return;
  }

  
    if (this.formLogin.valid) {
      const datosLogin: Login = {
        Email: this.formLogin.value.email,
        Contrasena: this.formLogin.value.password
      };

      this.loginService.login(datosLogin).subscribe({
        next: (response) => {
          if (response.success && response.data) {

           let salida: UserInfoFromToken= {};
           if(response!=null){
            salida = this.getPayloadFromToken(response!.data!.tokenBearer!)  ;
           }

           localStorage.setItem("id", salida.sub|| "");
           localStorage.setItem("nombre", salida.nombre||"");
           localStorage.setItem("tokenBearer",response.data.tokenBearer|| "")

           if(salida == null){
            alert("Credenciales invalidas");
           }else{
            this.router.navigate([`/programas/${salida.sub}`]);
           }

          }
        },
        error: (err) => {
          alert("Credenciales invalidas");
          console.error(err);
        },
      });
    }
  }


/**
 *
 * @param token
 * @returns
 */
   getPayloadFromToken(token: string): UserInfoFromToken {
   let userInfoFromToken = {} as UserInfoFromToken ;
    try {
      const base64Url = token.split('.')[1]; // Obtiene la segunda parte (payload)
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplaza caracteres para Base64 estándar
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
     return userInfoFromToken;
    }
  }

}
