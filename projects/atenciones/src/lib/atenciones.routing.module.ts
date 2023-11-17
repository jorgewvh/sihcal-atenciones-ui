import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { AuditoriaPageComponent } from "./pages/auditoria-page/auditoria-page.component";
import { RegistroAtencionesPageComponent } from "./pages/registro-atenciones-page/registro-atenciones-page.component";
import { RegistroAtencionesComponent } from "./components/registro-atenciones/registro-atenciones.component";


const routes: Routes = [
  {
    //falta montar bien la ruta
    path: '',
    children: [
      { path: '', component: RegistroAtencionesPageComponent},
      { path: 'atenciones-formulario', component: RegistroAtencionesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionesRoutingModule {}
