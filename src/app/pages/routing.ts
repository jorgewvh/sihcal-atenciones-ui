import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: "indicadores",
    loadChildren: () => import('../modules/proxy/proxy.module').then(m => m.ProxyModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@setrass-hn/auth').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: '/indicadores',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
