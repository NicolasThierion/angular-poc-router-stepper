import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteStepperComponent } from './route-stepper.component';
import { RouteStepperService } from './route-stepper.service';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [RouteStepperComponent],
  exports: [RouteStepperComponent],
})
export class RouteStepperModule {
  constructor() {}

  static forRoot(): ModuleWithProviders<RouteStepperModule> {
    return {
      ngModule: RouteStepperModule,
      providers: [RouteStepperService],
    };
  }

  static forChild(): ModuleWithProviders<RouteStepperModule> {
    return {
      ngModule: RouteStepperModule,
      providers: [RouteStepperService],
    };
  }
}
