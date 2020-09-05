import { Component, OnInit } from '@angular/core';
import {HospitalService} from '../../../services/hospital.service';
import {hospital} from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { FileUploadsService } from 'src/app/services/file-uploads.service';
import { BuscadorService } from 'src/app/services/buscador.service';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  public hospital:hospital[];
  public imagen:any;
  public usuarioCreado:boolean=false;
  public id:string;
  public desde:number=0;
  public TotalHospitales:number;
  public cargando:boolean=true;
  public editar:boolean=true;
  public nombreHospital:string='';
    constructor(private _hospitalService:HospitalService,private _FileUploadsService:FileUploadsService,
                private _BuscarService:BuscadorService) { }

  ngOnInit(): void {
    this.TRaerHospitales();
  }

  TRaerHospitales(){
    this.cargando=true;
    this._hospitalService.TraerDatos(this.desde).then(resp=>{

      this.TotalHospitales=resp.length;
      this.hospital = resp;
      this.cargando=false;
  
    })
  }

  GuardarImagen(evento:any){
    console.log(evento)
    this.imagen=evento;
  }


  PasarPagina(desde:number){
    this.desde+=desde;
    
    if (this.desde<0){
      this.desde=0;
    }
    if (this.desde>this.TotalHospitales){
      this.desde=this.TotalHospitales;
    }
    
    this.TRaerHospitales();

  }


  guardarHospital(nombre:string){
   
    if (!nombre){
    return  Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe ingresar el nombre!',
      })
    }
    
    const data = {nombre:nombre} 

    this._hospitalService.agregarDatos(data).subscribe((resp:any)=>{
    
      this.usuarioCreado=true;
      this.id = resp.hospitales._id;

      Swal.fire(
        'Buen Trabajo!',
        'Hospital agregado!',
        'success'
      )

    })
    
    
    if (this.usuarioCreado==true && this.imagen){
      this._FileUploadsService.actualizarFoto(this.imagen,'hospitales',this.id).then(resp=>{
 
      })

    }else{
      this.TRaerHospitales();
    }
    
    

  }

  Buscar(buscar:string){

    this._BuscarService.Buscar('hospitales',buscar).subscribe((resp:any)=>{
      console.log(resp)
      this.hospital = resp;
    })

  }

  eliminar(id:string){

    Swal.fire({
      title: 'Estas seguro?',
      text: "Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.EliminarDatos(id).subscribe((resp)=>{
          Swal.fire(
            'Borrado!',
            'Este archivo se a borrado.',
            'success'
          )
      this.TRaerHospitales();
    })
        
      }
    })

    

  }

  EditarHospital(nombre:string,id){

    
    this.editar?   this.editar=false: this.editar=true;
  
    if(nombre==this.nombreHospital){
      return;
    }
    
    if (!this.nombreHospital){
     return this.nombreHospital=nombre;

    }


    this._hospitalService.ActualizarHospital({nombre},id).subscribe(resp=>{
      this.editar=true;
      this.nombreHospital='';
    
      Swal.fire(
        'Buen trabajo!',
        'Nombre del hospital cambiado!',
        'success'
      )

    })


  }


}
