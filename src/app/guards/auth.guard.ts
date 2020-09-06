import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
}) 
export class AuthGuard implements CanActivate,CanLoad{
  validar:Boolean=false;
  constructor(private _UsuarioServices:UsuariosService,private router:Router){} 

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._UsuarioServices.validarTOken();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
 
    return this._UsuarioServices.validarTOken();


    
  }
  
}
