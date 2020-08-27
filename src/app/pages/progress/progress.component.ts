import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent  {

  constructor( public _UsuarioService:UsuariosService ){

    console.log(this._UsuarioService.usuario)

  }

    progreso1: number = 25;
    progreso2: number = 35;

    get getProgreso1() {
      return `${ this.progreso1 }%`;
    }

    get getProgreso2() {
      return `${ this.progreso2 }%`;
    }

}
