import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CComponent } from './c.component';

const routes: Route[] = [
  {
    path: '',
    component: CComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRoutingModule {}
