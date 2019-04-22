import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input('nombre') leyenda: string = "Leyenda";
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
    // console.log('leyenda', this.leyenda);
    // console.log("pregreso", this.progreso);
  }

  ngOnInit() {
    // console.log("leyenda ngOnInit", this.leyenda);
    // console.log("pregreso ngOnInit", this.progreso);
  }

  decrementar() {
    if (this.progreso <= 0) {
      this.progreso = 0;
    } else{
      this.progreso = this.progreso - 5;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
    return;
  }
  

  incrementar() {
    if (this.progreso >= 100) {
      this.progreso = 100;
    } else {
      this.progreso = this.progreso + 5;
    } 
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
    return;
  }


  onChanges(newValue: number){

    if (newValue > 100 || this.progreso > 100){
      newValue = 100;
      this.progreso = 100;
      this.cambioValor.emit(this.progreso);
    } else if (newValue < 0 || this.progreso < 0){
      newValue=0;
      this.progreso = 0;
      this.cambioValor.emit(this.progreso);
    }else{
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
    return;
  }
}
