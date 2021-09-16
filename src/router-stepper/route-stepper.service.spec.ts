import { Route } from '@angular/compiler/src/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteStepperComponent } from './route-stepper.component';
import { RouteStepperService } from './route-stepper.service';
import { DummyAComponent, DummyBComponent, STEPPER_1_ROUTES, STEPPER_2_ROUTES } from './route-stepper.spec-helper';

async function confugureTestingModulesWithRoutes(...routes: Route[]) {
  await TestBed.configureTestingModule({
    declarations: [RouteStepperComponent, DummyAComponent, DummyBComponent],
    imports: [RouterTestingModule.withRoutes(routes)],
  }).compileComponents();

  return TestBed.inject(RouteStepperService);
}
describe('RouteStepperService', () => {
  let service: RouteStepperService;

  it('should create', async () => {
    await confugureTestingModulesWithRoutes(...STEPPER_1_ROUTES, ...STEPPER_2_ROUTES);
    service = TestBed.inject(RouteStepperService);

    expect(service).toBeTruthy();
  });

  describe('.getSteps(name)', () => {
    describe('when some routes declare a step with the given name', () => {
      beforeEach(async () => {
        service = await confugureTestingModulesWithRoutes(...STEPPER_1_ROUTES, ...STEPPER_2_ROUTES);
      });

      it('should get the routes registered for this stepper', async () => {
        const routes = await service.getSteps(STEPPER_1_ROUTES[0].data.stepper.name).toPromise();
        expect(routes).toEqual(STEPPER_1_ROUTES);
      });
    });

    describe('when no routes declare a step with the given name', () => {
      beforeEach(async () => {
        service = await confugureTestingModulesWithRoutes(...STEPPER_2_ROUTES);
      });

      it('should get retrieve an empty array', async () => {
        const routes = await service.getSteps(STEPPER_1_ROUTES[0].data.stepper.name).toPromise();
        expect(routes).toEqual([]);
      });
    });
  });
});
