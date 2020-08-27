import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public url:string='';
  public correo:string;
  public nombre:string;
  public usuario:Usuario;
  constructor(private _UsuarioServices:UsuariosService) {
    this.usuario=this._UsuarioServices.usuario;
    
  }
  
  ngOnInit(): void {
    this.url= this._UsuarioServices.usuario.imagenUrl;
    this.nombre=this.usuario.nombre;
    this.correo=this._UsuarioServices.usuario.email;
  }

  Logout(){

    this._UsuarioServices.Logout();

  }

}
