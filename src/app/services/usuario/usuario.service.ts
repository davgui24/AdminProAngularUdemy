import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import swal from "sweetalert";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

  constructor(public http: HttpClient){
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  // ---------------

  login(usuario: Usuario, recordar: boolean = false){

    if(recordar){
       localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((res: any) =>{

      this.guardarStorage(res.id, res.token, res.uausrioBD);

       return res;
    }))
  }


  // -------------------

  crearUsuario(usuario: Usuario){
    let url =URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
    .pipe(map((res: any) => {
      swal(
        "Usuario creado",
        res.usuario.correo,
        "success"
      );
     return res.usuario;
    }));
  }


  // ---------------

  loginGoogle(token){
    let url =  URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(map((res:any) => {
       this.guardarStorage(res.id, res.token, res.uausrioBD);
       return true;
    }));
  }
}
