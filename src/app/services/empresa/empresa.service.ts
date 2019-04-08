import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { RestService } from '../rest.service';
import { Empresa } from '../../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  IMG_PATH = `${environment.apiUrl}/img/empresas/`;

  constructor(private restService: RestService) { }

  getEmpresas(): Observable<{}> {
    return this.restService.get('empresas');
  }

  getEmpresa(id: string): Observable<{}> {
    return this.restService.get(`empresas/${id}`);
  }

  postEmpresa(data: Empresa): Observable<any> {
    return this.restService.post('empresas/', data);
  }

  putEmpresa(id: string, data: Empresa): Observable<any> {
    return this.restService.put(`empresas/${id}`, data);
  }

  deleteEmpresa(id: string): Observable<any> {
    return this.restService.delete(`empresas/${id}`);
  }
}
