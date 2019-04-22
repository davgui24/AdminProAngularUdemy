import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {
    this.settingsService.cargarAjsutes();
  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: ElementRef) {
    console.log(link);
    this.aplicarCheck(link);
    // let url: string = `assets/css/colors/${tema}.css`;
    // this._document.getElementById("tema").setAttribute("href", url);

    // this.settingsService.ajsustes.tema = tema;
    // this.settingsService.ajsustes.temaUrl = url;
    // this.settingsService.guardarAjustes();

    this.settingsService.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");

    for(let ref of selectores){
      ref.classList.remove("working");
      link.classList.add("working");
    }
  }


  colocarCheck(){
    let selectores: any = document.getElementsByClassName("selector");
    let tema = this.settingsService.ajsustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema){
        ref.classList.add("working");
        break;
      }
       
    }
  }
}
