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
import { Matricula } from '../../models/matricula';
import { MatriculasService } from '../../services/matriculas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-matricula-detail',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './matricula-detail.component.html',
  styleUrl: './matricula-detail.component.css'
})
export class MatriculaDetailComponent implements OnInit {
  @Input() idMatricula! : number;
  public formBuild = inject(FormBuilder);

  public formAlumno: FormGroup = this.formBuild.group({
    idmatricula: [0],
    idalumno: [0],
    idgrado: [0],
    fechamatricula: [''],
    seccion: ['']
  });

  constructor(private matriculaService: MatriculasService, private router: Router, private route: ActivatedRoute
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
        this.idMatricula = +params['id'];
        this.matriculaService.getAlumno(this.idMatricula).subscribe(alumno => {
          this.formAlumno.patchValue(alumno);
        });
      }
    });
  }

  guardar() {
    const matricula: Matricula = {
      idmatricula: this.formAlumno.get('idmatricula')?.value,
      idalumno: this.formAlumno.get('idalumno')?.value,
      idgrado: this.formAlumno.get('idgrado')?.value,
      fechamatricula: this.formAlumno.get('fechamatricula')?.value,
      seccion: this.formAlumno.get('seccion')?.value
      };
    if (matricula.idmatricula > 0) {
      this.matriculaService.updateAlumno(matricula).subscribe({
        next: (result) => {
          if (result.isSuccess) {
            this.router.navigate(['/matriculas']);
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
        this.matriculaService.createAlumno(matricula).subscribe({
          next: (result) => {
            if (result.isSuccess) {
              this.router.navigate(['/matriculas']);
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
    this.router.navigate(['/matriculas']);
  } 
}
