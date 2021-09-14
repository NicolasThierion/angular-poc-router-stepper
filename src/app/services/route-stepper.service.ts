import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, RouteConfigLoadStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StepperRoute } from './stepper-route.model';

@Injectable()
export class RouteStepperService {
  private readonly _steppers = new Map<string, Subject<StepperRoute[]>>();
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(async (e) => {
      if (e instanceof RouteConfigLoadStart) {
        this.addRoutes(e.route as any);
      }
    });

    this.router.config.forEach((r: StepperRoute) => {
      this.addRoutes(r);
    });
  }

  addRoutes(...routes: Route[]) {
    routes.forEach((route) => {
      if (!route.data?.stepper) {
        return;
      }
      const stepperRoute = route as StepperRoute;
      const entry$ = this._getEntry(stepperRoute.data.stepper.name);
      entry$.pipe(first()).subscribe((routes) => {
        // prevent adding the same route twice
        if (!Reflect.getOwnPropertyDescriptor(route.data.stepper, Symbol.for('_stepAdded'))) {
          Reflect.defineProperty(route.data.stepper, Symbol.for('_stepAdded'), {
            enumerable: false,
            value: true,
          });
          entry$.next(routes.concat(stepperRoute));
        }
      });
    });
  }

  getSteps(stepperName = 'default'): Observable<StepperRoute[]> {
    return this._getEntry(stepperName).asObservable().pipe(first());
  }

  private _getEntry(stepperName: string) {
    if (!this._steppers.has(stepperName)) {
      this._steppers.set(stepperName, new BehaviorSubject([]));
    }

    return this._steppers.get(stepperName);
  }
}
