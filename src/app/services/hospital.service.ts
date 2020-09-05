import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }


  ConvertirObjetos(hospitals:any[]):hospital[]{
  
    return hospitals.map((resp)=>  new hospital(resp.nombre,resp.img,resp._id,resp.usuario) )


  }

  async TraerDatos(desde:number){

    const url = `${environment.url}/hospitales?desde=${desde}`;

    try {
      const hospitales = await fetch(url,{
        method:'GET',
        headers:{'token':localStorage.getItem('token')}
      });
      const resp  = await hospitales.json();

      return this.ConvertirObjetos(resp.hospitales);

    } catch (err) {
      console.log(err)
    }  

  }

  agregarDatos(data:{nombre:string}){

    const url = `${environment.url}/hospitales`;

    return this.http.post(url,data,{headers:{'token':localStorage.getItem('token')}});

  }

  EliminarDatos(id:string){

    const url = `${environment.url}/hospitales/${id}`;
    return this.http.delete(url,{headers:{'token':localStorage.getItem('token')}})

  }

  ActualizarHospital(data:{nombre},id:string){
    const url = `${environment.url}/hospitales/${id}`;
    return this.http.put(url,data,{headers:{'token':localStorage.getItem('token')}});
    


  }


}

