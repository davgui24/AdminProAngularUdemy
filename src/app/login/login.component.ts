import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';


declare function int_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(private router: Router, public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.googleInit();
    int_plugins();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }



  // -------------------------



  googleInit(){
    gapi.load('auth2', () => {
       this.auth2 = gapi.auth2.init({
        client_id: '1021113510695-d7akg1d8qm0jimn44q5qsndrqejv28r3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
    });

    this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }


  // -------

  attachSignIn(element){
   this.auth2.attachClickHandler(element, {}, (googleUser) => {

    //  let profile = googleUser.getBasicProfile();
     let token  = googleUser.getAuthResponse().id_token;

     console.log(token);
   });
  }



  // ---------------

  ingresar(forma: NgForm){

     if(forma.invalid){
       return;
     }

     let usuario: Usuario = new Usuario(null, forma.value.email, forma.value.password);

     this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(correcto => {
       this.router.navigate(['/dashboard'])
     })
    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }
}
