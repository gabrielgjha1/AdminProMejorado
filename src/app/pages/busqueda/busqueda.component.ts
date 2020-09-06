import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscadorService } from 'src/app/services/buscador.service';
import { Usuario } from 'src/app/models/usuario.model';
import { medicos } from 'src/app/models/medicos.models';
import { hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuario:Usuario;
  public medicos:medicos;
  public hospitales:hospital;
  constructor(public _activateRoute:ActivatedRoute,public _BusquedaServices:BuscadorService ) { }

  ngOnInit(): void {

    
    this.BuscarTermino();
  }
  
  
  BuscarTermino(){
    
    this._activateRoute.params.subscribe(({termino})=>{
      
      this._BusquedaServices.busquedaGlobar(termino).subscribe((resp:any)=>{
        
        this.hospitales=resp.hospitales;
        this.medicos=resp.medicos;
        this.usuario=resp.usuarios;
        console.log(resp)

      })
      
    })

  }

}
