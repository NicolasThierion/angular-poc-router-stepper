import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteStepperModule } from 'src/router-stepper/route-stepper.module';
import { A_ROUTES } from './a/a.routes';
import { B_ROUTES } from './b/b.routes';
import { C_ROUTES } from './c/c.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'a',
  },
  ...A_ROUTES,
  ...B_ROUTES,
  ...C_ROUTES,
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouteStepperModule.forChild()],
  exports: [RouterModule],
})
export class FeatureRoutingModule {}
