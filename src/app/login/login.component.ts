import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService

    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '724621382187-3p3nacteor1mogbik071mt918s9b59fa.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

// tslint:disable-next-line:no-shadowed-variable
attachSignin( element ) {
  this.auth2.attachClickHandler(element, {}, googleUser => {

    // const profile = googleUser.getBasicProfile();

    const token = googleUser.getAuthResponse().id_token;

    this._usuarioService.loginGoogle( token )
          .subscribe( () => this.router.navigate(['/dashboard']));

    console.log( token );

  });
}

ingresar( forma: NgForm) {

  if (forma.invalid) {
    return;
  }

  const usuario = new Usuario( null, forma.value.email, forma.value.password );
  this._usuarioService.login(usuario, forma.value.recuerdame )
                .subscribe( correcto => this.router.navigate(['/dashboard']));
  console.log( forma.valid);
  console.log( forma.value);
  // this.router.navigate([ '/dashboard' ]);
}
}
