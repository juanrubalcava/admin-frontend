import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestService } from './rest.service';
import { SettingsService, SidebarService, SharedService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { EmpresaService } from './empresa/empresa.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RestService,
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    EmpresaService
  ],
  declarations: []
})
export class ServiceModule { }
