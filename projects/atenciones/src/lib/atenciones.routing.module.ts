import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { AuditoriaPageComponent } from "./pages/auditoria-page/auditoria-page.component";



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AuditoriaPageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicadoresRoutingModule {}
