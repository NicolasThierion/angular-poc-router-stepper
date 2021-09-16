import { InjectionToken } from '@angular/core';
import { Data, Route } from '@angular/router';

export type StepperRouteData = {
  stepper: {
    name: string;
    order?: number;
    title?: () => string;
  };
};
export interface StepperRoute extends Route {
  data: Data & StepperRouteData;
}

export const STEPPER_ROUTES = new InjectionToken('STEPPER_ROUTES');
