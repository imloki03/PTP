import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/journeys', pathMatch: 'full' },
  {
    path: 'journeys',
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
  },
];
