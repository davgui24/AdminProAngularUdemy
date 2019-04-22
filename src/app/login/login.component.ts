import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function int_plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    int_plugins();
  }

  ingresar(){
    console.log('Ingresando');
    this.router.navigate(['/dashboard']);
  }
}
