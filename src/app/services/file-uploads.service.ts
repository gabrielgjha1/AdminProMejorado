import { Injectable } from '@angular/core';
import  {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadsService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo:'usuarios'|'medicos'|'hospitales',
    id:string
    ){
    
      try {
        console.log(id)
        let ids=id;

        let url = `${environment.url}/subir/${tipo}/${ids}`;
   
        const formData = new FormData();
        formData.append('imagen',archivo);  
        const resp = await fetch(url,{
          method:'PUT',
          headers:{
            'token':localStorage.getItem('token')
          },
          body:formData
        });

        const data= await resp.json();
   
        if (data.status){
         
          return data.nombreArchivo;
          
        }else {
   
          console.log(data.mensaje); 
          return false;
        }





    } catch (error) {
      
      console.log(error)

      return false;
    }

  }

}
