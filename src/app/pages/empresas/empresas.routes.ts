import { RouterModule, Routes } from '@angular/router';

import { AlumnosComponent } from './alumnos/alumnos.component';
import { EmpresasComponent } from './empresas/empresas.component';


const routes: Routes = [
    { path: '', component: EmpresasComponent, data: { titulo: 'Empresas', content: 'Lista de empresas' } },
    { path: ':id/alumnos', component: AlumnosComponent, data: { titulo: 'Alumnos' } },
];


export const EMPRESAS_ROUTES = RouterModule.forChild(routes);
