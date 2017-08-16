
import {Component} from '@angular/core';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Router} from '@angular/router';
@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg" alt="Food">
          <span>Create meal</span>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading">
        <meal-form
          (create)="addMeal($event)"
        ></meal-form>
      </div>
      <ng-template>
        <div class="message">
          <img src="/img/loading.svg" alt="loading">
          Fetching Meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent {
  constructor(
    private mealsService: MealsService,
    private router: Router
  ) {

  }

  async addMeal(meal: Meal) {
    await this.mealsService.addMeal(meal);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals'])
  }
}
