import { Routes } from '@angular/router';
import { HelloSectionComponent } from './sections/hello-section/hello-section.component';
import { WhatSectionComponent } from './sections/what-section/what-section.component';
import { UntilNowSectionComponent } from './sections/until-now-section/until-now-section.component';
import { ackGuard } from './shared/ack.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
    data: { section: 'home' },
    canActivate: [ackGuard],
    children: [
      {
        path: '',
        component: HelloSectionComponent,
      },
      {
        path: 'what',
        component: WhatSectionComponent,
      },
      {
        path: 'now',
        component: UntilNowSectionComponent,
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
  },
  {
    path: '**',
    loadComponent: () => import('./pages/no-page-found/no-page-found.component'),
  },
];
