import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matricula } from '../models/matricula';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl+'/Matricula';

  getAlumnos(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  getAlumno(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Matricula): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.apiUrl, alumno);
  }

  updateAlumno(Matricula: Matricula): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.apiUrl}/${Matricula.idmatricula}`, Matricula);
  }

  deleteAlumno(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
  constructor() { }
}
