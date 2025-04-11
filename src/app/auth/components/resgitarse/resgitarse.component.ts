import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Estudiante } from '../../../Models/estudiante';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-resgitarse',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './resgitarse.component.html',
  styleUrl: './resgitarse.component.scss'
})
export class ResgitarseComponent {
  private fb = inject (FormBuilder );
  
  public formRegister:FormGroup = this.fb.group({
    idEstudiante: ['', [ Validators.required ]],
    nombresEstudiante: ['', [ Validators.required ]],
    apellidosEstudiante: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(5) ]]
  });

  constructor(private estudianteService: EstudianteService, private router: Router) {}

  registrarEstudiante() {
    if (this.formRegister.valid) {
      const datosEstudiante: Estudiante = {
        idEstudiante: this.formRegister.value.idEstudiante,
        nombresEstudiante: this.formRegister.value.nombresEstudiante,
        apellidosEstudiante: this.formRegister.value.apellidosEstudiante,
        email: this.formRegister.value.email,
        contrasena: this.formRegister.value.password
      };
      
      this.estudianteService.registrarse(datosEstudiante).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          console.error(err);
          alert("El usuario ya esta registrado");
        }
      });
    }
  }
}