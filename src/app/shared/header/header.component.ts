import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private _UsuarioServices:UsuariosService) { }

  ngOnInit(): void {
  }

  Logout(){

    this._UsuarioServices.Logout();

  }

}
