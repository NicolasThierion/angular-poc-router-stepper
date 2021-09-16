import { Inject, Injectable } from '@angular/core';
import { Route, ROUTES } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { StepperRoute } from './stepper-route.model';

@Injectable({
  providedIn: 'root',
})
export class RouteStepperService {
  private readonly _steppers = new Map<string, Subject<Set<StepperRoute>>>();
  constructor(
    @Inject(ROUTES) private _stepperRoutes: (Route | StepperRoute)[]
  ) {
    this.addRoutes(...this._stepperRoutes.flatMap((routes) => routes));
  }

  addRoutes(...routes: Route[]) {
    routes.forEach((route) => {
      if (!route.data?.stepper) {
        return;
      }
      const stepperRoute = route as StepperRoute;
      const entry$ = this._getEntry(stepperRoute.data.stepper.name);
      entry$.pipe(first()).subscribe((routes) => {
        entry$.next(routes.add(stepperRoute));
      });
    });
  }

  getSteps(stepperName = 'default'): Observable<StepperRoute[]> {
    return this._getEntry(stepperName)
      .asObservable()
      .pipe(take(1))
      .pipe(map((routes) => [...routes]));
  }

  private _getEntry(stepperName: string) {
    if (!this._steppers.has(stepperName)) {
      this._steppers.set(stepperName, new BehaviorSubject(new Set()));
    }

    return this._steppers.get(stepperName);
  }
}
