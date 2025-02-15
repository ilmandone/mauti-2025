import { Routes } from '@angular/router';
import { HelloSectionComponent } from './sections/hello-section/hello-section.component';
import { WhatSectionComponent } from './sections/what-section/what-section.component';
import { UntilNowSectionComponent } from './sections/until-now-section/until-now-section.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
    data: { section: 'home' },
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
    path: '**',
    loadComponent: () =>
      import('./pages/no-page-found/no-page-found.component'),
  },
];
