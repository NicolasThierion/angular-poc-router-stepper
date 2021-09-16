import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  Type,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  combineLatest,
  forkJoin,
  from,
  isObservable,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { RouteStepperService } from './route-stepper.service';
import { StepperRoute } from './stepper-route.model';

interface Step {
  path: string;
  enabled: boolean;
  title: string;
}

@Component({
  selector: 'app-route-stepper',
  templateUrl: './route-stepper.component.html',
  styleUrls: ['./route-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteStepperComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  name: string = 'default';

  @Input()
  relativeTo = '..';

  steps: Step[] = [];
  stepsSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly routeStepperService: RouteStepperService,
    private readonly injector: Injector,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  navigateTo(path: string) {
    this.router.navigate([path], {
      relativeTo: this.route,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      this.updateSteps();
    }
  }
  private updateSteps() {
    this.stepsSubscription?.unsubscribe();
    this.stepsSubscription = this.routeStepperService
      .getSteps(this.name)
      .subscribe((steps) => {
        forkJoin(
          steps
            .sort(
              (s1, s2) =>
                (s1.data.stepper.order ?? Infinity) -
                (s1.data.stepper.order ?? Infinity)
            )
            .map((r) =>
              forkJoin({
                enabled: this.isRouteEnabled(r),
                path: of(r.path),
                title: of(r.data.stepper.title),
              })
            )
        ).subscribe((steps) => {
          this.steps = steps.map((s) => {
            return {
              ...s,
              path: [this.relativeTo, s.path].join('/'),
              title: s.title?.() ?? s.path,
            };
          });
          this._cdr.detectChanges();
        });
      });
  }

  /**
   *
   * @param r Call route's canActivate to determine if the step is enabled.
   *
   * @returns true is route's canActivate returns true, or if method canActivate does not exist.
   */
  private isRouteEnabled(r: StepperRoute): Observable<boolean> {
    const enabled$ = (
      r.canActivate
        ?.map((canActivateClass: Type<any>) =>
          this.injector.get(canActivateClass)
        )
        .map((canActivate: CanActivate) => {
          const result = canActivate.canActivate(
            {
              routeConfig: r,
              data: r.data,
            } as Partial<ActivatedRouteSnapshot> as ActivatedRouteSnapshot,
            undefined
          );
          let result$: Observable<boolean | UrlTree>;
          if (isObservable(result)) {
            result$ = result;
          } else if (result instanceof Promise) {
            result$ = from(result).pipe(first());
          } else {
            result$ = of(result);
          }

          return result$.pipe(map((v) => v === true));
        }) ?? []
    ).concat(of(true));

    return combineLatest(enabled$).pipe(
      map((enabled) => enabled.every((e: any) => e === true))
    );
  }

  ngOnInit(): void {
    this.updateSteps();
  }

  ngOnDestroy(): void {
    this.stepsSubscription?.unsubscribe();
  }
}
