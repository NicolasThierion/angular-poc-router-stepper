import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BRoutingModule } from './b-routing.module';
import { RouteStepperModule } from 'src/router-stepper/route-stepper.module';
import { BComponent } from './b.component';

@NgModule({
  declarations: [BComponent],
  imports: [CommonModule, BRoutingModule, RouteStepperModule],
})
export class BModule {}
