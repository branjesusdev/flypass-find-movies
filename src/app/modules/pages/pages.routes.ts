import { Routes } from '@angular/router';
import { posterDetailResolver } from './poster-details/resolvers/poster-detail.resolver';

export const routesPages: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@pages/onboarding/components/onbording-master/onbording-master.component'),
  },
  {
    path: 'poster-detail/:mediaType/:id',
    loadComponent: () =>
      import(
        '@pages/poster-details/components/poster-detail-master/poster-detail-master.component'
      ),
    resolve: {
      posterDetail: posterDetailResolver,
    },
  },
  {
    path: 'failed',
    loadComponent: () => import('@pages/handlers/failed-service/failed-service.component'),
  },
];

export default routesPages;
