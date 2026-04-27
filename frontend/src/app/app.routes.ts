import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'farmer-register',
    pathMatch: 'full',
  },

  {
    path: 'farmer-register',
    loadComponent: () =>
      import('./farmer-reg/farmer-reg.component').then(
        (m) => m.FarmerRegComponent,
      ),
  },
];
