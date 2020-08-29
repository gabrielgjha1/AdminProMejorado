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
  public usuario:Usuario;
  public auth2:any


  constructor(public http:HttpClient,private route:Router,private ngZone:NgZone) { 
    this.googleInit
  }


  get Token():string{

    return localStorage.getItem('token') || '';

  }

  validarTOken():Observable <boolean>{
    
    const url  = environment.url+'/login/renew';
    const token = this.Token ;

    return  this.http.get(url,{headers:{'token':token}}).pipe(

      tap((resp:any)=>{
      
      console.log(resp)
      const {nombre,email,role,google,_id,img} = resp.usuario;
      
      this.usuario=new Usuario(nombre,email,'',img,role,google,_id);
      
        
      }),

      map( resp=> true ),

      catchError(error =>{
        this.route.navigateByUrl('/login')
        return of(false)
      }  )

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

  ActualizarUsuario(data:{email:string,nombre:string},id){

    const url = `${environment.url}/usuario/${id}`

    return this.http.put(url,data,{headers:{token:this.Token}})

  }
  ActualizarRole(data:{role:string},id){

    const url = `${environment.url}/usuario/${id}`

    return this.http.put(url,data,{headers:{token:this.Token}})

  }


    ///login
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

        localStorage.setItem('token',resp.token)

      })

    );

  }

  TraerUsuarios(desde?:number){
    const url  = environment.url+'/usuario?desde='+desde;
    
    return this.http.get(url,{headers:{
      'token':localStorage.getItem('token')
    }}).pipe(

      map(  (resp:any) =>{
        const usuarios = resp.usuarios.map(
          resp=>new Usuario(resp.nombre,resp.email,'',resp.img,resp.role,resp.google,resp._id)
         
        )
        const Total = resp.Total
     
        return {
          usuarios,
          Total
        }

      })
     

    )
    /*
    try {
      
      const respuesta= await fetch(url,{
        method:'GET',
        headers:{
          'token':localStorage.getItem('token')
        },

      });

      const data = await respuesta.json();
      
     return data;
      
    } catch (error) {
      console.log(error)
    }
    */

  }

  BorrarUsuarios(id:string){
    const url  = environment.url+'/usuario/'+id;

    return this.http.delete(url,{headers:{'token':this.Token}});
  
  }
}

