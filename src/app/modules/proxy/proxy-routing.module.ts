import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProxyComponent } from './proxy.component';

const routes: Routes = [
  {
    path: '',
    component: ProxyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProxyRoutingModule { }
