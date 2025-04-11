import { Component, OnInit } from '@angular/core';
import { MateriaProgramaDTO } from '../../../Models/materia-programa-dto';
import { MateriasService } from '../../../services/materias.service';
import { DefaultResponse } from '../../../Models/default-response';
import { CommonModule } from '@angular/common';
import { MateriaEstudiante } from '../../../Models/materia-estudiante';
import { EstudianteService } from '../../../services/estudiante.service';

@Component({
  selector: 'app-list-materias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-materias.component.html',
  styleUrl: './list-materias.component.scss',
})
export class ListMateriasComponent implements OnInit {
  materias: MateriaEstudiante[] = [];
  selectedMateria: number | null = null;

  constructor(
    private materiasService: MateriasService,
    private estudianteService: EstudianteService
  ) {}
  ngOnInit(): void {
    this.getMateriasEstudiante();
  }

  getMateriasEstudiante() {
    const idEstudiante = localStorage.getItem('id');
    if (idEstudiante) {
      this.materiasService.getMateriasEstudiante(idEstudiante).subscribe({
        next: (response: DefaultResponse<MateriaEstudiante[]>) => {
          this.materias = response.data;
          console.log('Estudiantes:', this.materias);
        },
        error: (err) => {
          console.log('Error al obtener los datos:', err.message);
        },
      });
    }
  }

  onMateriaSelect(idMateria: number) {
    if (this.selectedMateria !== null) {
      alert('Solo puede eliminar una materia a la vez.');
    } else {
      this.selectedMateria = idMateria;
    }
  }
  
  quitarMateria() {
    if (this.selectedMateria !== null) {
      const idEstudiante = localStorage.getItem('id');
      if (idEstudiante) {
        this.estudianteService.deleteMateriasEstudiante(idEstudiante, this.selectedMateria).subscribe({
          next: (response) => {
            console.log('Materia eliminada correctamente:', response.data);
            this.getMateriasEstudiante(); 
            this.selectedMateria = null; 
          },
          error: (err) => {
            console.log('Error al eliminar la materia:', err.message);
          },
        });
      }
    } else {
      alert('Por favor selecciona una materia para eliminar.');
    }
  }
  
}
