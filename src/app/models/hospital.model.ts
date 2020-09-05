import {environment } from '../../environments/environment';
const url = environment.url;
interface _Usuario {

    nombre:string,
    email:string,
    img:string

}

export class hospital{

    constructor(
        public nombre:string,
        public img?:string,
        public id?:string,
        public usuario?:_Usuario
    ){}

    get imagenUrl(){
        if (!this.img){

            this.img='';
       
        }
        if (this.img.includes('https')){
            return this.img;
        }

        if (this.img){
            let ruta = `${url}/subir/hospitales/${this.img}`

            return `${url}/subir/hospitales/${this.img}`;
        }else{
            return `${url}/subir/hospitales/@@@`;
        }
        

    }

    get imagenUrl2(){
        if (!this.usuario.img){

            this.usuario.img='';
       
        }
        if (this.usuario.img.includes('https')){
            return !this.usuario.img;
        }

        if (this.usuario.img){
            let ruta = `${url}/subir/usuarios/${this.usuario.img}`

            return `${url}/subir/usuarios/${this.usuario.img}`;
        }else{
            return `${url}/subir/usuarios/@@@`;
        }
        

    }

}