import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRoutingModule } from './c-routing.module';
import { RouteStepperModule } from 'src/router-stepper/route-stepper.module';
import { CComponent } from './c.component';

@NgModule({
  declarations: [CComponent],
  imports: [CommonModule, CRoutingModule, RouteStepperModule],
})
export class CModule {}
