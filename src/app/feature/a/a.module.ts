import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ARoutingModule } from './a-routing.module';
import { RouteStepperModule } from 'src/router-stepper/route-stepper.module';
import { AComponent } from './a.component';

@NgModule({
  declarations: [AComponent],
  imports: [CommonModule, ARoutingModule, RouteStepperModule],
})
export class AModule {}
