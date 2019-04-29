import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router){

  }

  canActivate() {

    if(this.usuarioService.estaLogueado()){
      console.log('Paso el guard');
      return true;
    }else{
      console.log('Blokeado por el guard');}
      this.router.navigate(['/login']);
      return false;
    }  
}
