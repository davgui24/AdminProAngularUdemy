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

    

  constructor(public http: HttpClient){
  }

  login(usuario: Usuario, recordar: boolean = false){

    if(recordar){
       localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) =>{
       localStorage.setItem('id', resp.id);
       localStorage.setItem('token', resp.token);
       localStorage.setItem('usuario', JSON.stringify(resp.usuario));

       return true;
    }))
  }

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
}
