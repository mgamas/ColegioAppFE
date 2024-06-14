import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent {
  constructor(private alumnosService: AlumnosService, private router: Router) { 
    this.obtenerAlumnos();
  }
  public listalumnos: Alumno[] = [];
  public displayedColumns: string[] = ['idAlumno', 'nombre', 'apellido', 'fechaNacimiento', 'genero','Acciones'];
  @ViewChild(MatTable) tabla!: MatTable<Alumno>;
  obtenerAlumnos() {
    this.alumnosService.getAlumnos().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.listalumnos = result;
          this.tabla.renderRows();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    }
    nuevo() {
      this.router.navigate(['/alumnos',0]);
    }

    back() {
      this.router.navigate(['/']);
    }

    editar(objeto: Alumno) {
      this.router.navigate(['/alumnos', objeto.idAlumno]);
    }


    eliminar(objeto: Alumno) {
      if (confirm('¿Está seguro de eliminar el registro? ' + objeto.nombre)) {
        this.alumnosService.deleteAlumno(objeto.idAlumno).subscribe({
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
