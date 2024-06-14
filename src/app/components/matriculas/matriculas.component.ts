import { Component, OnInit, ViewChild } from '@angular/core';
import { MatriculasService } from '../../services/matriculas.service';
import { Matricula } from '../../models/matricula';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent {
  constructor(private matriculasService: MatriculasService, private router: Router) { 
    this.obtenerAlumnos();
  }
  public listaMatricula: Matricula[] = [];
  public displayedColumns: string[] = ['idmatricula', 'idalumno', 'idgrado', 'fechamatricula', 'seccion','Acciones'];
  @ViewChild(MatTable) tabla!: MatTable<Matricula>;
  obtenerAlumnos() {
    this.matriculasService.getAlumnos().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.listaMatricula = result;
          this.tabla.renderRows();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    }
    nuevo() {
      this.router.navigate(['/matriculas',0]);
    }

    back() {
      this.router.navigate(['/']);
    }

    editar(objeto: Matricula) {
      this.router.navigate(['/matriculas', objeto.idmatricula]);
    }


    eliminar(objeto: Matricula) {
      if (confirm('¿Está seguro de eliminar el registro? ' + objeto.idmatricula)) {
        this.matriculasService.deleteAlumno(objeto.idmatricula).subscribe({
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
