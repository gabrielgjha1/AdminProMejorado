import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  validar:Boolean=false;
  constructor(private _UsuarioServices:UsuariosService,private router:Router){} 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
   
    
    return this._UsuarioServices.validarTOken();


    
  }
  
}
