import { StepperRoute } from 'src/router-stepper/stepper-route.model';

export const A_ROUTES: StepperRoute[] = [
  {
    path: 'a',
    loadChildren: () => import('./a.module').then((module) => module.AModule),
    data: {
      stepper: {
        name: 'stepper-1',
        title: () => 'Step A',
      },
    },
  },
];
