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
import { Grado } from '../../models/grado';
import { GradosService } from '../../services/grados.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-grado-detail',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './grado-detail.component.html',
  styleUrl: './grado-detail.component.css'
})
export class GradoDetailComponent implements OnInit{
  @Input() idGrado! : number;
  public formBuild = inject(FormBuilder);

  public formProfesor: FormGroup = this.formBuild.group({
    idgrado: [0],
    nombre: [''],
    idprofesor: [0],
  });

  constructor(private gradoService: GradosService, private router: Router, private route: ActivatedRoute
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
        this.idGrado = +params['id'];
        this.gradoService.getAlumno(this.idGrado).subscribe(alumno => {
          this.formProfesor.patchValue(alumno);
        });
      }
    });
  }

  guardar() {
    const grado: Grado = {
      idgrado: this.formProfesor.get('idgrado')?.value,
      nombre: this.formProfesor.get('nombre')?.value,
      idprofesor: this.formProfesor.get('idprofesor')?.value
      };
    if (grado.idgrado > 0) {
      this.gradoService.updateAlumno(grado).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.router.navigate(['/grados']);
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
        this.gradoService.createAlumno(grado).subscribe({
          next: (result) => {
            if (result.isSuccess) {
              this.router.navigate(['/grados']);
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
    this.router.navigate(['/grados']);
  } 
}
