import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    data: {section: 'home'}
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    data: {section: 'about'}
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/no-page-found/no-page-found.component')
  },
];
