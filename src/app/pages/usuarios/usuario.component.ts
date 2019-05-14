import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  forma1: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }
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

    this.forma1 = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),
    }, {validators: this.matchPass('password', 'password2') } );
  }

  crearUsuario() {

    if ( this.forma1.invalid ) {
      return;
    }
    if ( !this.forma1.value.condiciones ) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    const usuario = new Usuario(
      this.forma1.value.nombre,
      this.forma1.value.email,
      this.forma1.value.password
    );

    this._usuarioService.crearUsuario(usuario)
              .subscribe( resp => this.router.navigate(['/usuarios']));

            }

}
