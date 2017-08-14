
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" alt="Food">
          <span *ngIf="meal$ | async as meal; else title">
            {{meal.name ? 'Edit': 'Create'}} Meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div>
        <meal-form
          (create)="addMeal($event)"
        ></meal-form> 
      </div>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy{

  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$= this.route.params
      .switchMap((param) =>  this.mealsService.getMeal(param.id))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(meal: Meal) {
    await this.mealsService.addMeal(meal);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals'])
  }
}
