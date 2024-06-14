import { Component, OnInit, ViewChild } from '@angular/core';
import { GradosService } from '../../services/grados.service';
import { Grado } from '../../models/grado';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-grados',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './grados.component.html',
  styleUrl: './grados.component.css'
})
export class GradosComponent {
  constructor(private gradoService: GradosService, private router: Router) { 
    this.obtenerAlumnos();
  }
  public listagrado: Grado[] = [];
  public displayedColumns: string[] = ['idgrado', 'nombre', 'idprofesor','Acciones'];
  @ViewChild(MatTable) tabla!: MatTable<Grado>;
  obtenerAlumnos() {
    this.gradoService.getAlumnos().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.listagrado = result;
          this.tabla.renderRows();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
    }
    nuevo() {
      this.router.navigate(['/grados',0]);
    }

    back() {
      this.router.navigate(['/']);
    }

    editar(objeto: Grado) {
      this.router.navigate(['/grados', objeto.idgrado]);
    }


    eliminar(objeto: Grado) {
      if (confirm('¿Está seguro de eliminar el registro? ' + objeto.nombre)) {
        this.gradoService.deleteAlumno(objeto.idgrado).subscribe({
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
