import {environment } from '../../environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const url = environment.url;
export class Usuario {


    constructor(

        public nombre:string,
        public email:string,
        public password?:string,
        public img?:string,
        public role?:'ADMN_ROLE' | 'USUER_ROLE',
        public google?:boolean,
        public _id?:string

    ){

  
    }
    //http://localhost:3000/api/subir/hospitales/c644845e-c01b-4a5c-bafe-8dc656ab6e60.png
    get imagenUrl(){
        if (!this.img){

            this.img='';
       
        }
        if (this.img.includes('https')){
            return this.img;
        }

        if (this.img){
            let ruta = `${url}/subir/usuarios/${this.img}`

            return `${url}/subir/usuarios/${this.img}`;
        }else{
            return `${url}/subir/usuarios/@@@`;
        }
        

    }

}