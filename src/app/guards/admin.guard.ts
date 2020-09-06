import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor( private _UsuarioServices:UsuariosService,
              private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    



    if (this._UsuarioServices.role==='ADMN_ROLE'){

      
      return true;

    }else{
      this.router.navigateByUrl('')
      return false;

    }

  }
  
}
