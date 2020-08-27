import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public url:string;
  constructor( private sidebarService: SidebarService, private _UsuarioServices:UsuariosService) {
    this.menuItems = sidebarService.menu;
    
    this.url= _UsuarioServices.usuario.imagenUrl;
   
    console.log(this.menuItems)
  }

  ngOnInit(): void {
  }

}
