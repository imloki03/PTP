import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/journeys', pathMatch: 'full' },
  {
    path: 'journeys',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
  },
  {
    path: 'journeys/new',
    loadComponent: () =>
      import('./pages/journey-form/journey-form').then((m) => m.JourneyForm),
  },
  {
    path: 'journeys/:id/edit',
    loadComponent: () =>
      import('./pages/journey-form/journey-form').then((m) => m.JourneyForm),
  },
];
