import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../models/profesor';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {
  constructor(private profesorService: ProfesoresService, private router: Router) { 
    this.obtenerAlumnos();
  }
  public listaprofesor: Profesor[] = [];
  public displayedColumns: string[] = ['idProfesor', 'nombre', 'apellido', 'genero','Acciones'];
  @ViewChild(MatTable) tabla!: MatTable<Profesor>;
  obtenerAlumnos() {
    this.profesorService.getAlumnos().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.listaprofesor = result;
          this.tabla.renderRows();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    }
    nuevo() {
      this.router.navigate(['/profesores',0]);
    }

    back() {
      this.router.navigate(['/']);
    }

    editar(objeto: Profesor) {
      this.router.navigate(['/profesores', objeto.idProfesor]);
    }


    eliminar(objeto: Profesor) {
      if (confirm('¿Está seguro de eliminar el registro? ' + objeto.nombre)) {
        this.profesorService.deleteAlumno(objeto.idProfesor).subscribe({
          next: (result) => {
            if (result.isSuccess) {
              this.obtenerAlumnos();
            }else{
              alert(result.message);
            }
          },
          error: (error) => {
            console.error(error);
            alert('Error al eliminar el registro');
          }
        });
      }
      
    }
}
