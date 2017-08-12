
import {Component} from '@angular/core';
import {Meal} from '../../../shared/services/meals/meals.service';
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
      <div>
        <meal-form
          (create)="addMeal($event)"
        ></meal-form>
      </div>
    </div>
  `
})
export class MealComponent {
  constructor() {

  }

  addMeal(meal: Meal) {
    console.log("meal", JSON.stringify(meal, null, 2))
  }
}
