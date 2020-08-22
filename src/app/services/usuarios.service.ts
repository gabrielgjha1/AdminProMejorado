import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import {environment} from '../../environments/environment';
import {tap, map, catchError} from 'rxjs/operators'
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
declare const  gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public auth2:any
  constructor(public http:HttpClient,private route:Router,private ngZone:NgZone) { 
    this.googleInit
  }


  validarTOken():Observable <boolean>{
    
    const url  = environment.url+'/login/renew';
    const token = localStorage.getItem('token') || '' ;

    return  this.http.get(url,{headers:{'token':token}}).pipe(

      map( resp=> true ),
      catchError(error => of(false) )

    );

  }

  googleInit(){
    gapi.load('auth2', ()=>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '545679237972-cujtlc3rg7pouvf104jrej6crja6chka.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      
    });
  }

  Logout(){

    localStorage.removeItem('token');
    
    this.auth2.signOut().then(()=> {

      this.ngZone.run(()=>{
        
        this.route.navigateByUrl('/login');

      })

    });

  }



  guardarUsuario(usuario:Usuario){

    const url  = environment.url+'/usuario';


    return this.http.post(url,usuario).pipe(

      tap((resp:any)=>{

        localStorage.setItem('token',resp.token)

      })

    );

  }

  Login(usuario:Usuario){

    const url  = environment.url+'/login';

    return this.http.post(url,usuario).pipe(

      tap((resp:any)=>{

        localStorage.setItem('token',resp.token)

      })

    );

  }
  
  LoginGOogle(token:string){

    const url  = environment.url+'/login/google';

    return this.http.post(url,{token}).pipe(

      tap((resp:any)=>{
        console.log(resp)
        localStorage.setItem('token',resp.token)

      })

    );

  }

}
