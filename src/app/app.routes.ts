import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { GradosComponent } from './components/grados/grados.component';
import { MatriculasComponent } from './components/matriculas/matriculas.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { ProfesorDetailComponent } from './components/profesor-detail/profesor-detail.component';
import { GradoDetailComponent } from './components/grado-detail/grado-detail.component';
import { MatriculaDetailComponent } from './components/matricula-detail/matricula-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumnos/:id', component: AlumnoDetailComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'profesores/:id', component: ProfesorDetailComponent },
  { path: 'grados', component: GradosComponent },
  { path: 'grados/:id', component: GradoDetailComponent },
  { path: 'matriculas', component: MatriculasComponent },
  { path: 'matriculas/:id', component: MatriculaDetailComponent },
];
