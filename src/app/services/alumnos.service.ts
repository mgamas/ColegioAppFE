import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl+'/alumno';

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Alumno): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.apiUrl, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.apiUrl}/${alumno.idAlumno}`, alumno);
  }

  deleteAlumno(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
