import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-pas-reset',
  templateUrl: './pas-reset.component.html',
  styles: []
})
export class PasResetComponent implements OnInit {
  forma1: FormGroup;
  usuario: Usuario;



  constructor(
    public _usuarioService: UsuarioService,
    public router: Router ) { 
      this.usuario = this._usuarioService.usuario;
    }

  matchPass(campo1: string, campo2: string ) {

    return(group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2 ) {
        return null;
      }
      return {
        matchPass: true
      };
    };
  }

  ngOnInit() {

  }

  guardar(usuario: Usuario) {
  if ( usuario._id ) {
    console.log('Guardando', usuario);
    if ( !this.usuario.google ) {
      if ( this.matchPass('paswd1', 'paswd1') ) {
          this.usuario.password = usuario.password;
      }
    }
    this._usuarioService.actualizarUsuario( this.usuario )
          .subscribe();
    }
  }
}
