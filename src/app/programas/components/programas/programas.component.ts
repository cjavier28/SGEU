import { ProgramasService } from './../../../services/programas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultResponse } from '../../../Models/default-response';
import { ProgramaDTO } from '../../../Models/programaDTO';
import { EstudianteService } from '../../../services/estudiante.service';



@Component({
  selector: 'app-programas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.scss'
})
export class ProgramasComponent implements OnInit{
  programas: ProgramaDTO[] = []
  idEstudiante: string | null = null;

  constructor(
    private programasService: ProgramasService,
    private estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.getProgramas();

    this.route.paramMap.subscribe(params => {
      this.idEstudiante = params.get('idEstudiante'); 
      console.log('ID Estudiante:', this.idEstudiante);
    });
  }

  getProgramas(): void{
    this.programasService.getProgramas().subscribe({
      next: (response: DefaultResponse<ProgramaDTO[]>) => {
        if (response.success) {
          this.programas = response.data;
        }
      },
      error: (err) => {
        console.log('Error al obtener los programas: ' + err.message);  
      }
    })
  }  

  seleccionarPrograma(idPrograma: number): void {
    localStorage.setItem('idP', idPrograma.toString());
    this.estudianteService.updateEstudiante(this.idEstudiante!, idPrograma).subscribe({
      next: (response) => {
        console.log('Estudiante actualizado con el nuevo programa:', response);
      },
      error: (err) => {
        console.log('Error al actualizar el estudiante:', err.message);
      }
    });
  }
}
