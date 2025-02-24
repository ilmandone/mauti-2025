import { Routes } from '@angular/router';
import { ackGuard, noAckGuard } from './shared/ack.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
    data: { section: 'home' },
    canActivate: [ackGuard],
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    data: { section: 'about' },
    canActivate: [ackGuard],
  },
  {
    path: 'ack',
    loadComponent: () => import('./pages/ack/ack.component'),
    canActivate: [noAckGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/no-page-found/no-page-found.component'),
  },
];
