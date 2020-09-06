import {hospital}  from './hospital.model';
import {environment } from '../../environments/environment';
const url = environment.url;
interface _Usuario {

    nombre:string,
    email:string,
    img:string

}

export class medicos {

    constructor(
        public nombre:string,
        public hospitales:hospital,
        public id?:string,
        public img?:string,
        public usuarios?:_Usuario,
        ){
        
    }

    get imagenUrl(){
        console.log(this.img)
        if (!this.img){

            this.img='';
       
        }
       

        if (this.img){
            let ruta = `${url}/subir/medicos/${this.img}`

            return `${url}/subir/medicos/${this.img}`;
        }else{
            return `${url}/subir/medicos/@@@`;
        }
        

    }

}