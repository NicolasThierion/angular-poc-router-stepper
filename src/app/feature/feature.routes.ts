import { Route } from '@angular/router';

export const FEATURE_ROUTES: Route[] = [
  {
    path: 'feature',
    loadChildren: () => import('./feature.module').then((m) => m.FeatureModule),
  },
];
