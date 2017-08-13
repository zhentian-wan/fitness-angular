
import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from '@angular/forms';
import {Meal} from '../../../shared/services/meals/meals.service';
@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form"> 
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input type="text" 
                   formControlName="name"
                   placeholder="e.g. English Breakfast">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>
        
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button 
              type="button" 
              (click)="addIngredient()"
              class="meal-form__add">
              <img src="/img/add-white.svg" alt="Add food">
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i;">
              <input type="text" [formControlName]="i" placeholder="e.g Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)"
              ></span>
            </label>
          </div>
        </div>
        
        <div class="meal-form__submit">
          <div>
            <button type="button" class="button" (click)="createMeal()">
              Create Meal
            </button>
            <a 
              [routerLink]="['../']"
              class="button button--cancel">
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  `
})
export class MealFormComponent {

  @Output()
  create = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  get ingredients () {
    // Type check for ingredients, mark as FormArray
    // Therefore when we use 'ingredients',
    // We can get auto complete
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
        this.form.get('name').touched
    );
  }

  constructor(private fb: FormBuilder) {

  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  addIngredient() {
    // Add a new FormControl to FormArray
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
}
