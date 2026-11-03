import { Routes } from '@angular/router';

import { Home } from './shell/home/home';
import { About } from './shell/about/about';

// DEFINICION DE PATHS

/*
  Angular evalúa las rutas de arriba hacia abajo y utiliza la primera que coincide.

  Por lo tanto, las rutas más específicas deben situarse antes que las más genéricas,
   y la ruta comodín (**) debe definirse siempre en último lugar.
*/
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: Home,
  },
  /*
    Lazy loading routes
  */
  {
    path: 'ticketing',
    loadChildren: () => import('./domains/ticketing/ticketing.routes'),
  },
  /*
    Lazy loading about component
  */
  {
    path: 'about',
    loadComponent: () => import('./shell/about/about').then(c=>c.About),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
