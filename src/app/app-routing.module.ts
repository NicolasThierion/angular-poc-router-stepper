import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteStepperModule } from 'src/router-stepper/route-stepper.module';
import { FEATURE_ROUTES } from './feature/feature.routes';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feature',
  },
  ...FEATURE_ROUTES,
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouteStepperModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
