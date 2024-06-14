import { Component, Input, OnInit, inject, input } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno-detail',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './alumno-detail.component.html',
  styleUrl: './alumno-detail.component.css'
})
export class AlumnoDetailComponent implements OnInit {
  @Input() idAlumno! : number;
  public formBuild = inject(FormBuilder);

  public formAlumno: FormGroup = this.formBuild.group({
    idAlumno: [0],
    nombre: [''],
    apellido: [''],
    fechaNacimiento: [''],
    genero: ['']
  });

  constructor(private alumnoService: AlumnosService, private router: Router, private route: ActivatedRoute
  ) { }

 /*  ngOnInit(): void {
    console.log('entrando a OnInit idAlumno: ' + this.idAlumno);
    if (this.idAlumno > 0) {
      console.log('entrando a actualizar');
      this.alumnoService.getAlumno(this.idAlumno).subscribe({
        next: (result) => {
          this.formAlumno.patchValue(result);
        },
        error: (error) => {
          console.error(error);
        }
    });
  }
} */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.idAlumno = +params['id'];
        this.alumnoService.getAlumno(this.idAlumno).subscribe(alumno => {
          this.formAlumno.patchValue(alumno);
        });
      }
    });
  }

  guardar() {
    const alumno: Alumno = {
      idAlumno: this.formAlumno.get('idAlumno')?.value,
      nombre: this.formAlumno.get('nombre')?.value,
      apellido: this.formAlumno.get('apellido')?.value,
      fechaNacimiento: this.formAlumno.get('fechaNacimiento')?.value,
      genero: this.formAlumno.get('genero')?.value
      };
    if (alumno.idAlumno > 0) {
      this.alumnoService.updateAlumno(alumno).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.router.navigate(['/alumnos']);
          }else{
            alert("error update: " + result.message);
          }
        },
        error: (error) => {
          console.error(error);
          alert('Error al actualizar el registro');
        }
      });
      }else{
        this.alumnoService.createAlumno(alumno).subscribe({
          next: (result) => {
            if (result.isSuccess) {
              this.router.navigate(['/alumnos']);
            }else{
              alert("error save: " + result.message);
            }
          },
          error: (error) => {
            console.error(error);
            alert('Error al crear el registro');
          }
        });
      }
    }

  volver() {
    this.router.navigate(['/alumnos']);
  } 
}
