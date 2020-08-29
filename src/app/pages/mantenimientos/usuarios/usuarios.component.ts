import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import {BuscadorService} from '../../../services/buscador.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuario:Usuario;
  public google:boolean;
  public desde:number=0;
  public total:number;
  public imagen:string;
  public cargando:boolean=false;
  public id_LOGEADO:string;
  public desactivarRol:boolean=false;

  constructor( private _UsuarioService:UsuariosService,private _BuscarService:BuscadorService ) {

    this.id_LOGEADO=this._UsuarioService.usuario._id;

   }

   ngOnInit() {
  
    this.traerDatos();
  }

  traerDatos(){

    this.cargando=true;
    this._UsuarioService.TraerUsuarios(this.desde).subscribe((resp:any)=>{
    this.usuario=resp.usuarios;
    this.total=resp.Total;
    this.imagen = this.usuario.imagenUrl;
    this.cargando=false;
    
    console.log(resp)
    })
   
    

  }

  PasarPagina(numero:number){

    this.desde += numero;
    if (this.desde<0){
      return  this.desde = 0;
    }
    if (this.desde>this.total){
    return  this.desde=this.total;
    
    }


    this.traerDatos();

    
  }

  Buscar(dato:string){

    if (dato.length===0){
     return this.traerDatos();
    }

    this._BuscarService.Buscar('usuarios',dato).subscribe((resp:any)=>{
      this.usuario=resp;

    })


  }

  CambiarRol(valor:string,id){
    
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este usuario sera administrador!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {


      if (result.value) {
       
        this._UsuarioService.ActualizarRole({role:valor},id).subscribe((resp)=>{
          
          Swal.fire(
            'Cambio hecho!',
            'success'
          )

        });
      }


    

    })


   

  }

  ActivarRole(){
    console.log(this.desactivarRol)
    if (this.desactivarRol===true){

   return   this.desactivarRol=false;
    }
    if (this.desactivarRol===false){
      return  this.desactivarRol=true;
    }
    

  }


  EliminarUsuario(id:string){
    console.log(id)
    console.log(this.id_LOGEADO)
    if (id===this.id_LOGEADO){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puede borrar su propio usuario!',
      })
      
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {


        this._UsuarioService.BorrarUsuarios(id).subscribe((resp)=>{

          console.log(resp);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ) 
          this.traerDatos();

    
        });

      }
    })

  }

}
