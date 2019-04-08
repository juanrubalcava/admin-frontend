import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatPaginatorIntl, MatSortModule } from '@angular/material';

import { EMPRESAS_ROUTES } from './empresas.routes';

import { SharedModule } from '../../shared/shared.module';

import { AlumnosComponent } from './alumnos/alumnos.component';
import { EmpresasComponent } from './empresas/empresas.component';

import { CustomPaginatorConfig } from './custom-paginator-config';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';
import { FormAlumnoComponent } from './form-alumno/form-alumno.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EMPRESAS_ROUTES,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule
  ],
  declarations: [
    AlumnosComponent,
    EmpresasComponent,
    FormEmpresaComponent,
    FormAlumnoComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginatorConfig() }
  ]
})
export class EmpresasModule { }
