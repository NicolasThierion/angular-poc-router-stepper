import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteStepperComponent } from './route-stepper.component';
import {
  BASE_ROUTES,
  DummyAComponent,
  DummyBComponent,
  STEPPER_1_ROUTES,
  STEPPER_DEFAULT_ROUTES,
} from './route-stepper.spec-helper';

async function configureTestingModulesWithRoutes(...routes: Route[]) {
  await TestBed.configureTestingModule({
    declarations: [RouteStepperComponent, DummyAComponent, DummyBComponent],
    imports: [RouterTestingModule.withRoutes(routes)],
  }).compileComponents();
}
describe('RouteStepperComponent', () => {
  let component: RouteStepperComponent;
  let fixture: ComponentFixture<RouteStepperComponent>;
  let ul: HTMLUListElement;
  beforeEach(async () => {});

  beforeEach(async () => {
    await configureTestingModulesWithRoutes(...STEPPER_DEFAULT_ROUTES, ...STEPPER_1_ROUTES, ...BASE_ROUTES);
    fixture = TestBed.createComponent(RouteStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ul = fixture.nativeElement.querySelector('ul');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when called with no stepper name', () => {
    it('should display steps from the stepper with name "default"', () => {
      fixture.detectChanges();
      const li: HTMLElement[] = [...(ul.querySelectorAll('li') as any)];
      expect(li.length === STEPPER_DEFAULT_ROUTES.length);
      li.forEach((el, i) => {
        expect(el.textContent.trim()).toEqual(STEPPER_DEFAULT_ROUTES[i].data.stepper.title());
      });
    });
  });
});
