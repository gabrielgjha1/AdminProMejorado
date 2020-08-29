import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private http:HttpClient) { 
  }

  transformarAmodelo( resp:any[] ):Usuario[] {
   
    return resp.map((resp)=>
      new Usuario(resp.nombre,resp.email,'',resp.img,resp.role,resp.google,resp.id)
    ) 

  }

  Buscar(tipo:string,dato:string){
    const url = `${environment.url}/buscar/coleccion/${tipo}/${dato}`
    
    return this.http.get(url,{headers:{'token':localStorage.getItem('token')}}).pipe(


      map((resp:any)=>{
        
        if (tipo==='usuarios'){
        
       return  this.transformarAmodelo(resp.data); 

        }

      
      })

    )

  }
  

}
