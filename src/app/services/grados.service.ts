import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grado } from '../models/grado';
import { Observable } from 'rxjs';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class GradosService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl+'/Grado';

  getAlumnos(): Observable<Grado[]> {
    return this.http.get<Grado[]>(this.apiUrl);
  }

  getAlumno(id: number): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/${id}`);
  }

  createAlumno(Grado: Grado): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.apiUrl, Grado);
  }

  updateAlumno(Grado: Grado): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.apiUrl}/${Grado.idgrado}`, Grado);
  }

  deleteAlumno(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
