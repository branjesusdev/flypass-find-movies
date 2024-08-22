import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@fxLayouts/default/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('@pages/pages.routes'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
