import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestService } from '../rest.service';
import { Alumno } from '../../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private restService: RestService) { }

  getAlumnos(): Observable<{}> {
    return this.restService.get('alumnos');
  }

  getAlumno(id: string): Observable<{}> {
    return this.restService.get(`alumnos/${id}`);
  }

  postAlumno(data: Alumno): Observable<any> {
    return this.restService.post('alumnos/', data);
  }

  putAlumno(id: string, data: Alumno): Observable<any> {
    return this.restService.put(`alumnos/${id}`, data);
  }

  deleteAlumno(id: string): Observable<any> {
    return this.restService.delete(`alumnos/${id}`);
  }
}
