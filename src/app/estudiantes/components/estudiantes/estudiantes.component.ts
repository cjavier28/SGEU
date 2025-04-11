import { Component } from '@angular/core';
import { EstudianteService } from '../../../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesPrograma } from '../../../Models/estudiantes-programa';
import { DefaultResponse } from '../../../Models/default-response';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.scss'
})
export class EstudiantesComponent {
  estudiantes: EstudiantesPrograma[] = [];
  idEstudiante: string | null = null;
    
    constructor(      
      private estudianteService: EstudianteService,
      private route: ActivatedRoute,
      private router: Router
    ){}

  ngOnInit(){

    
    this.route.paramMap.subscribe(params => {
      this.idEstudiante = params.get('idEstudiante'); 
    });
    
    this.getEstudiantes();
  }

  getEstudiantes() {
    const idPrograma = localStorage.getItem('idPrograma');
    console.log("IdPrograma desde localStorage:", idPrograma);

    if (idPrograma) {
      this.estudianteService.getEstudiantes(Number(idPrograma)).subscribe({
        next: (response: DefaultResponse<EstudiantesPrograma[]>) => {
          this.estudiantes = response.data;
          console.log('Estudiantes:', this.estudiantes);
        },
        error: (err) => {
          console.log('Error al obtener los datos:', err.message);
        }
      })
    } 
  }  
}
