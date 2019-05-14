import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { PasResetComponent } from './usuarios/pas-reset.component';


// Mantenimientos



const pageRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
        {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', content: 'Este es el dashboard de nuestra app' } },
        {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
        {path: 'graficas1', component: Graficas1Component , data: { titulo: 'Graficas' } },
        {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
        {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
        {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
        {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil De usuario' } },
        {path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasModule' },
        // Mantenimientos
        {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
        {path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Crear/Actualizar Nuevo Usuario' } },
        {path: 'contra/:id', component: PasResetComponent, data: { titulo: 'Resetear password' } },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
