import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuditoriaPageComponent } from './pages/auditoria-page/auditoria-page.component';
import { GridAuditoriaComponent } from './components/grid-auditoria/grid-auditoria.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '@setrass-hn/partials';
import { ServicesModule } from './services/services.module';
import { IndicadoresRoutingModule } from './atenciones.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AuditoriaComponent } from './atenciones.component';
import { DateFromDatetime, TimeFromDatetime } from './utils/gestion-atenciones.pipe';

@NgModule({
  declarations: [
    AuditoriaPageComponent,
    AuditoriaComponent,
    GridAuditoriaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WidgetsModule,
    ServicesModule,
    IndicadoresRoutingModule,
    NgbModule,
    DataTablesModule,
    AngularEditorModule,
    CurrencyMaskModule,
    NgxDropzoneModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    AuditoriaPageComponent,
    GridAuditoriaComponent
  ],
  providers:[
    DateFromDatetime, TimeFromDatetime
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IndicadoresModule { }
