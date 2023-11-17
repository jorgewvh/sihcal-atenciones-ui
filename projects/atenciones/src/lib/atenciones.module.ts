import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AuditoriaPageComponent } from './pages/auditoria-page/auditoria-page.component';
import { GridAuditoriaComponent } from './components/grid-auditoria/grid-auditoria.component';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsModule } from '@setrass-hn/partials';
import { ServicesModule } from './services/services.module';
import { AtencionesRoutingModule } from './atenciones.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AtencionesComponent } from './atenciones.component';
import { DateFromDatetime, TimeFromDatetime } from './utils/gestion-atenciones.pipe';
import { RegistroAtencionesComponent } from './components/registro-atenciones/registro-atenciones.component';
import { RegistroAtencionesPageComponent } from './pages/registro-atenciones-page/registro-atenciones-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './services/toolbar/toolbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    AtencionesComponent,
    RegistroAtencionesComponent,
    RegistroAtencionesPageComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    WidgetsModule,
    ServicesModule,
    NgbModule,
    DataTablesModule,
    AngularEditorModule,
    CurrencyMaskModule,
    NgxDropzoneModule,
    NgxPrintModule,
    NgxMaterialTimepickerModule,
    AtencionesRoutingModule
  ],
  exports: [
    RegistroAtencionesPageComponent,
    RegistroAtencionesComponent
  ],
  providers:[
    DateFromDatetime, TimeFromDatetime
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AtencionesModule { }
