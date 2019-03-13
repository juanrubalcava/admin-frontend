import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
