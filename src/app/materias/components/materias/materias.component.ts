import { Component, OnInit } from '@angular/core';
import { MateriaProgramaDTO } from '../../../Models/materia-programa-dto';
import { MateriasService } from '../../../services/materias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultResponse } from '../../../Models/default-response';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']  
})
export class MateriasComponent implements OnInit {
  materias: MateriaProgramaDTO[] = [];
  idEstudiante: string | null = null;
  idPrograma: string | null = null;
  materiasSeleccionadas: number[] = [];

  constructor(
    private materiasService: MateriasService,
    private estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {


      this.idEstudiante = localStorage.getItem("id");
      this.idPrograma = params.get('idPrograma');
      console.log('ID Estudiante:', this.idEstudiante);
      console.log('ID Programa:', this.idPrograma);
    });
    
    this.actualizarEstudiante();

    const idP = this.route.snapshot.paramMap.get('idPrograma');
    
    if (idP) {
      const id = Number(idP);  

      if (!isNaN(id)) {    
        localStorage.setItem('idPrograma', id.toString());      
        this.materiasService.getMaterias(id).subscribe({
          next: (response: DefaultResponse<MateriaProgramaDTO[]>) => {
           if (response.success) {
              console.log(response)
              this.materias = response.data;
            } else {
              console.log('Error en la respuesta:', response.message);
            }
          },
          error: (err) => {            
            console.log('Error al obtener las materias:', err.message);  
          }
        });
      } 
    } 
  }

  actualizarEstudiante(): void {
    if (this.idEstudiante !== null && this.idPrograma !== null) {
        this.estudianteService.updateEstudiante(this.idEstudiante, Number(this.idPrograma)).subscribe({
            next: (response) => {
                if (response.success) {
                    console.log('Estudiante actualizado correctamente');
                } else {
                    console.log('Error al actualizar el estudiante:', response.message);
                }
            },
            error: (err) => {
                console.log('Error al actualizar el estudiante:', err.message);
            }
        });
    }
  }

  onMateriaSelect(materiaId: number, event: any): void {
    materiaId = Number(materiaId); 
    if (event.target.checked) {
      this.materiasSeleccionadas.push(materiaId);
    } else {
      const index = this.materiasSeleccionadas.indexOf(materiaId);
      if (index > -1) {
        this.materiasSeleccionadas.splice(index, 1);
      }
    }
    }

  registrarMaterias(): void {
    if (this.materiasSeleccionadas.length === 0) {
      alert("Por favor, selecciona al menos una materia.");
      return;
    }

    if (this.idEstudiante && this.idPrograma) {
      this.estudianteService.registrarMateriasEstudiante(this.idEstudiante, this.materiasSeleccionadas)
        .subscribe({
          next: (response) => {
            if (response.success) {
              alert('Materias registradas correctamente.');
            } else {
              alert('Error al registrar las materias: ' + response.message); 
            }
          },
          error: (err) => {
            console.log('Error al registrar las materias:', err.message);
            alert("Las materias seleccionadas no son válidas. Debes seleccionar un máximo de tres materias, y no puedes seleccionar más de una materia del mismo profesor.")
          }
        });
    }
  }
}
