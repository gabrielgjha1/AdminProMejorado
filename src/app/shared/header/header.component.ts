import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private _UsuarioServices:UsuariosService, public _activateRoute:ActivatedRoute,
              private Router:Router) {
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

 

  Buscador(valor:string){
    this.Router.navigateByUrl('/dashboard/busqueda/'+valor)
  }


}
