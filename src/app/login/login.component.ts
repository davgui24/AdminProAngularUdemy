import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Stream } from 'stream';

declare function int_plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  email: string;

  recuerdame: boolean = false;
  constructor(private router: Router, public usuarioService: UsuarioService) {}

  ngOnInit() {
    int_plugins();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

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
