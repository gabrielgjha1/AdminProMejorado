import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { hospital } from '../models/hospital.model';
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

  busquedaGlobar(busqueda:string){
    const url = `${environment.url}/buscar/${busqueda}`

   return this.http.get(url);



  }

  transformarAmodeloHospital( resp:any[] ):hospital[] {
    console.log('aqui 2');
    return resp.map((resp)=>
    new hospital(resp.nombre,resp.img,resp._id,resp.usuario) )

  }

  Buscar(tipo:string,dato:string){
    const url = `${environment.url}/buscar/coleccion/${tipo}/${dato}`
    
    return this.http.get(url,{headers:{'token':localStorage.getItem('token')}}).pipe(


      map((resp:any)=>{
        
        if (tipo==='usuarios'){
        
       return  this.transformarAmodelo(resp.data); 

        }

        if (tipo==='hospitales'){
          console.log('aqui 1');
          console.log(resp)
          return  this.transformarAmodeloHospital(resp.data);

        }

      
      })

    )

  }
  

}
