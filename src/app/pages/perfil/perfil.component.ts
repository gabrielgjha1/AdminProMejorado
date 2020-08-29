import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import {FileUploadsService} from  '../../services/file-uploads.service' ;
import { HeaderComponent } from 'src/app/shared/header/header.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public url:string='';
  public usuario:Usuario;
  public imagenSubir:File;
  public google:boolean;
  form:FormGroup;
  
  constructor(private _UsuarioServices:UsuariosService,private _FileUpload:FileUploadsService,) {   
    this.url= _UsuarioServices.usuario.imagenUrl;
    this.usuario=_UsuarioServices.usuario;
    this.google = this.usuario.google;
    console.log(this.google)

  }
  ngOnInit(): void {

    this.form=this.Formulario();

  }

  CambiarImagen(file:File){
    this.imagenSubir=file;

  }

  SubirImagen(){
    this._FileUpload.actualizarFoto(this.imagenSubir,'usuarios',this.usuario._id)
      .then(img=>console.log(img)).catch(err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe llenar todos los campos!',
        })
        
      })

    return  Swal.fire(
        'Buen trabajo!',
        ' Imagen actualizada!',
        'success'
      )
  }

  Formulario(){

    return new FormGroup({

      nombre:new FormControl(this.usuario.nombre,Validators.required),
      email:new FormControl(this.usuario.email,Validators.required)

    });

  }


  ActualizarDatos(){
      
    if (this.form.invalid){


      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe llenar todos los campos!',
      })
      

      return;
      
    }
    
    const data = {nombre:this.form.value.nombre,email:this.form.value.email}
    
    this._UsuarioServices.ActualizarUsuario(data,this._UsuarioServices.usuario._id).subscribe((resp:any)=>{
      
      Swal.fire(
        'Buen trabajo!',
        'Información actualizada!',
        'success'
      )

      this.usuario.nombre=this.form.value.nombre;
      

    })



  }

  
}
