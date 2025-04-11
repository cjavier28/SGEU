import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { ProgramasComponent } from '../../../programas/components/programas/programas.component';
import { MateriasComponent } from '../../../materias/components/materias/materias.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavMenuComponent, ProgramasComponent, MateriasComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
