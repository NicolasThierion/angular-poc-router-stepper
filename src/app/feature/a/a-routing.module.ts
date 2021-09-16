import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AComponent } from './a.component';

const routes: Route[] = [
  {
    path: '',
    component: AComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ARoutingModule {}
