import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StepperRoute } from 'src/router-stepper/stepper-route.model';

@Injectable({ providedIn: 'root' })
export class CRouteGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return of(false);
  }
}

export const C_ROUTES: StepperRoute[] = [
  {
    path: 'c',
    loadChildren: () => import('./c.module').then((module) => module.CModule),
    data: {
      stepper: {
        name: 'stepper-1',
        title: () => 'Step C',
      },
    },
    canActivate: [CRouteGuard],
  },
];
