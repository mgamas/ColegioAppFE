import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../models/profesor';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl+'/profesor';

  getAlumnos(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  getAlumno(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Profesor): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.apiUrl, alumno);
  }

  updateAlumno(Profesor: Profesor): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.apiUrl}/${Profesor.idProfesor}`, Profesor);
  }

  deleteAlumno(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
