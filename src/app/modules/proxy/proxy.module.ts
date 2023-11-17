import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProxyRoutingModule } from './proxy-routing.module';
import { ProxyComponent } from './proxy.component';
import { AtencionesModule } from '../../../../projects/atenciones/src/lib/atenciones.module';


@NgModule({
  declarations: [
    ProxyComponent
  ],
  imports: [
    CommonModule,
    ProxyRoutingModule,
    AtencionesModule
  ],
  exports: [],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProxyModule { }
