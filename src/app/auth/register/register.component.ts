import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/usuarios.service';
import {Usuario} from '../../models/usuario.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  constructor(private _UsuariosService:UsuariosService) {
    this.form=this.formulario();
   }

  formulario(){
    
    return new FormGroup({


      nombre:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required),
      password2:new FormControl('',Validators.required),
      terminos:new FormControl(null,[Validators.requiredTrue]),

    },
    { 
      validators:this.soniguales('password','password2')
    });

  }

  ngOnInit(): void {
  }

  prueba(){
    console.log('asas')
  }

  soniguales(campo1:string,campo2:string){

    return(group:FormGroup)=>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1==pass2){
          return null;
      }

      //si la validacion no se cumple se retorna un error por eso soniguales:true, es el error
      return {
        soniguales:true
      }

    };

  }

  crearUsuario(){

    if (this.form.valid){
      
        let usuario = new  Usuario( this.form.value.nombre,this.form.value.email,
                                   this.form.value.password);
        
          
         return this._UsuariosService.guardarUsuario(usuario).subscribe((resp:any)=>{

          console.log(usuario)

          Swal.fire(
            'Buen trabajo!',
            'Registrado con exito!',
            'success'
          )

         })                
                
    }else{
      
      Swal.fire({

        icon: 'error',
        title: 'Oops...',
        text: 'Error verifique los datos ingresados!'

      });

    }
      
  }

  get nombre() { return this.form.get('nombre'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get password2() { return this.form.get('password2'); }
  get terminos() { return this.form.get('terminos'); }

}
