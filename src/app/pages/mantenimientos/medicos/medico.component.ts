import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { hospital } from 'src/app/models/hospital.model';
import { MedicosService } from 'src/app/services/medicos.service';
import { medicos } from 'src/app/models/medicos.models';
import { FileUploadsService } from 'src/app/services/file-uploads.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  form:FormGroup;
  public hospitales:hospital[];
  public hospitalSeleccionado:hospital;
  public medico:medicos;
  public imagen:File;
  public usuarioCreado:boolean=false;
  public id:string="";
  public medicoSeleccionado:medicos;
  public imagenMedico:string="";
  constructor(public _HospitalesService:HospitalService,public _MedicoService:MedicosService,
              public _FileUploadService:FileUploadsService,public activateROute:ActivatedRoute,
              public router:Router ) { }


  formulario(){

    return new  FormGroup({

      nombre: new FormControl('123',Validators.required),
      hospital:new FormControl('',Validators.required)


    });

  }



  ngOnInit(): void {

    this.activateROute.params.subscribe(({id})=>{

    
      this.TraerMedicoId(id);
    });

    this.TraerHospitales();
    this.form=this.formulario();

    this.form.get('hospital').valueChanges.subscribe(resp=>{

      this.hospitalSeleccionado = this.hospitales.find(h  => h.id===resp);
     

    });

  }

  TraerHospitales(){

    this._HospitalesService.TraerDatos(0).then((resp:any)=>{
      
      this.hospitales=resp;
      
    })
  }

TraerMedicoId(id:string){

 

  this._MedicoService.TraerMedico(id).then(resp=>{
    this.medicoSeleccionado = resp;
    this.imagenMedico=this.medicoSeleccionado.imagenUrl;
    

    console.log(resp)
  }).catch((err)=>{
    
    

  })

 

  }

  CrearImagen(imagen:File){

    this.imagen=imagen;
   
  }

  AsignarImagen(id:string){

    return new Promise((resolve,reject)=>{

      this._FileUploadService.actualizarFoto(this.imagen,'medicos',id).then(resp=>{
        console.log(resp)
      
        resolve(true)

      });

      reject(false)

    }).catch(err=>{
      console.log(err)
    })


  }

  TraerMedico(id){

  }

 async GuardarDatos(){
  
     if (this.form.valid){
      
      
      let Medicos = new medicos(this.form.value.nombre,this.form.value.hospital)
      
    this._MedicoService.CrearUsuario(Medicos).subscribe(    async (  resp:any) =>{
        console.log('hola')
        this.usuarioCreado=true;

        this.id = resp.medicos._id;
        
        Swal.fire(
          'Buen trabajo!',
          'Medico creado!',
          'success'
          )
          
          if (this.imagen){
            await this.AsignarImagen(this.id);
            console.log('hola2')
            console.log(this.id)
            
            
          }
          console.log('hola1')
          this.router.navigateByUrl('/dashboard/medico/'+this.id);

      })
      

    }
    

    
    


  }

  get nombre() { return this.form.get('nombre'); }
  get hospital() { return this.form.get('hospital'); }


}
