import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StepperRoute } from 'src/router-stepper/stepper-route.model';

@Injectable({ providedIn: 'root' })
export class BRouteGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return Promise.resolve(true);
  }
}

export const B_ROUTES: StepperRoute[] = [
  {
    path: 'b',
    loadChildren: () => import('./b.module').then((module) => module.BModule),
    data: {
      stepper: {
        name: 'stepper-1',
        title: () => 'Step B',
      },
    },
    canActivate: [BRouteGuard],
  },
];
