import { Component, OnInit } from '@angular/core';
import { medicos } from '../../../models/medicos.models';
import { MedicosService } from '../../../services/medicos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  public Medicos:medicos[];
  public desde:number=0;
  public total:number;
  public cargando:boolean=true;
  constructor(private _MedicosService:MedicosService,
              private router:Router) { }

  ngOnInit(): void {

    this.TraerDatos();

  }


  TraerDatos(){
    this.cargando=true;
    this._MedicosService.traerUsuarios(this.desde).subscribe((resp:any)=>{
      
      this.Medicos = resp;
      this.total = resp.length;
      this.cargando=false;
      console.log(this.Medicos)
    })

  }

  EliminarMedicos(id:string){

    console.log(id)

    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {

        this._MedicosService.EliminarUsuarios(id).subscribe(resp=>{

          Swal.fire(
            'Borrado!',
            'EL médico fue borrado.',
            'success'
          )
          
          this.TraerDatos();
    
        });
    

       
      }
    })
    
  }

  PasarPagina(desde:number){
    console.log(this.total);
    this.desde+=desde;
    if (this.desde<0){
      this.desde=0;
    }

    if (this.desde>this.total){
      this.desde=0;
    }

    this.TraerDatos();

  }


  Navegar(){
    
    this.router.navigateByUrl('/dashboard/medico/nuevo');
  }

}
