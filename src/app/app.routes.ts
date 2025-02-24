import { Routes } from '@angular/router';
import { ackGuard, noAckGuard } from './shared/ack.guard';
import HomeComponent from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
    canActivate: [ackGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { section: 'home' },
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component'),
        data: { section: 'about' },
      },
    ],
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
