import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { CargandoComponent } from './cargando/cargando.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    CargandoComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    CargandoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
