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
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../models/profesor';

@Component({
  selector: 'app-profesor-detail',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './profesor-detail.component.html',
  styleUrl: './profesor-detail.component.css'
})
export class ProfesorDetailComponent implements OnInit{
  @Input() idProfesor! : number;
  public formBuild = inject(FormBuilder);

  public formProfesor: FormGroup = this.formBuild.group({
    idprofesor: [0],
    nombre: [''],
    apellido: [''],
    genero: ['']
  });

  constructor(private profesorService: ProfesoresService, private router: Router, private route: ActivatedRoute
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
        this.idProfesor = +params['id'];
        this.profesorService.getAlumno(this.idProfesor).subscribe(alumno => {
          this.formProfesor.patchValue(alumno);
        });
      }
    });
  }

  guardar() {
    const profesor: Profesor = {
      idProfesor: this.formProfesor.get('idprofesor')?.value,
      nombre: this.formProfesor.get('nombre')?.value,
      apellido: this.formProfesor.get('apellido')?.value,
      genero: this.formProfesor.get('genero')?.value
      };
    if (profesor.idProfesor > 0) {
      this.profesorService.updateAlumno(profesor).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.router.navigate(['/profesores']);
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
        this.profesorService.createAlumno(profesor).subscribe({
          next: (result) => {
            if (result.isSuccess) {
              this.router.navigate(['/profesores']);
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
    this.router.navigate(['/profesores']);
  } 
}
