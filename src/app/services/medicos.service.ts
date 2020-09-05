import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { medicos } from '../models/medicos.models';
@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http:HttpClient) { }

  transformarDatos(medicoss:any[]):medicos[]{

    return  medicoss.map((resp)=>{

    return  new medicos(resp.nombre,resp.hospitales,resp._id,resp.img,resp.usuarios,)

    })

  }

  traerUsuarios(desde:number){
    const url = `${environment.url}/medicos?desde=${desde}`;

    return this.http.get(url).pipe(


      map( (resp:any)=> this.transformarDatos(resp.medicos) )


    )


  }


 async TraerMedico(id:string){
    const url = `${environment.url}/medicos/${id}`;
    
    
    try {
      
          const medico = await fetch(url);
      
          const resp = await medico.json();

          
          if (!resp){
            console.log('el medico no existe')
          }
          
          
  
          
          
            
          const Medico = new medicos(resp.medico.nombre,resp.medico.hospitales,resp.medico._id,resp.medico.img)
            
        
          // console.log(medico)
          return Medico;
          
        } catch (error) {

     
      
    }
    



  }


  CrearUsuario(medico:medicos){

    const url = `${environment.url}/medicos`;

    return this.http.post(url,medico,{headers:{'token':localStorage.getItem('token')}});
    

  }


  EliminarUsuarios(id:string){

    const url = `${environment.url}/medicos/${id}`;
    return this.http.delete(url,{headers:{'token':localStorage.getItem('token')}})



  }


}
