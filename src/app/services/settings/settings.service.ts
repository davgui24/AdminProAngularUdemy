import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  ajsustes: IAjustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjsutes();
  }

  guardarAjustes() {
    localStorage.setItem("ajsutes", JSON.stringify(this.ajsustes));
  }

  cargarAjsutes() {
    if (localStorage.getItem("ajsutes")) {
      this.ajsustes = JSON.parse(localStorage.getItem("ajsutes"));
      this.aplicarTema(this.ajsustes.tema);
    }
  }

  aplicarTema(tema: string) {
    let temaUrl: string = `assets/css/colors/${tema}.css`;
    this._document.getElementById("tema").setAttribute("href", temaUrl);

    this.ajsustes.tema = tema;
    this.ajsustes.temaUrl = temaUrl;
    this.guardarAjustes();
  }
}


interface IAjustes {
  temaUrl: string;
  tema: string;
}
