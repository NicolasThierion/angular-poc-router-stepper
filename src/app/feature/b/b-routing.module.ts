import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BComponent } from './b.component';

const routes: Route[] = [
  {
    path: '',
    component: BComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BRoutingModule {}
