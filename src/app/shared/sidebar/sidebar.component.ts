import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';

declare function int_plugins();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  constructor(public sideBarService: SidebarService, public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
