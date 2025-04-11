import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { ProgramasComponent } from './programas/components/programas/programas.component';
import { MateriasComponent } from './materias/components/materias/materias.component';
import { ResgitarseComponent } from './auth/components/resgitarse/resgitarse.component';
import { EstudiantesComponent } from './estudiantes/components/estudiantes/estudiantes.component';
import { ClasesComponent } from './clases/components/clases/clases.component';
import { ListMateriasComponent } from './materias/components/list-materias/list-materias.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent, title: 'Iniciar Sesión' },
    { path: 'registrarse', component: ResgitarseComponent, title: 'Resgistarse' },
    
    
    { path: '', component: LayoutComponent, children: [
        //Programas
        { path: 'programas/:idEstudiante', component: ProgramasComponent, title: 'Programas' },

        //Materias
        { path: 'materias/:idEstudiante/:idPrograma', component: MateriasComponent, title: 'Materias' },
        { path: 'materias', component: ListMateriasComponent, title: 'Materias Resgitradas' },

        { path: 'estudiantes', component: EstudiantesComponent, title: 'Estudiantes' },
        // { path: 'estudiantes/:idPrograma', component: EstudiantesComponent, title: 'Estudiantes' },

        { path: 'clases', component: ClasesComponent, title: 'Clases' },
    ]},
];
