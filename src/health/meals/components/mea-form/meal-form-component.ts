import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, FormControl, Validators} from '@angular/forms';
import {Meal} from '../../../shared/services/meals/meals.service';
import {NoSpecialCharsValidator} from '../../../shared/directives/validators/no-special-chars';


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
                   no-special-chars
                   formControlName="name"
                   placeholder="e.g. English Breakfast">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
            <div class="error" *ngIf="noSpecial">
              Cannot contain special characters
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

          <div class="meal-form__submit">
            <div>
              <button
                *ngIf="!exists"
                type="button" class="button" (click)="createMeal()">
                Create Meal
              </button>
              <button 
                *ngIf="exists"
                type="button" class="button" (click)="updateMeal()">
                Save
              </button>
              <a
                [routerLink]="['../']"
                class="button button--cancel">
                Cancel
              </a>
            </div>
            <div class="meal-form__delete" *ngIf="exists">
              <div *ngIf="toggled">
                <p>Delete item?</p>
                <button
                  class="confirm"
                  type="button"
                  (click)="removeMeal()">
                  Yes
                </button>
                <button
                  class="cancel"
                  type="button"
                  (click)="toggle()">
                  No
                </button>
              </div>

              <button
                class="button button--delete"
                type="button"
                (click)="toggle()">
                Delete
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `
})
export class MealFormComponent implements OnChanges {

  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', [
      Validators.required
    ]],
    ingredients: this.fb.array([''])
  });

  get ingredients() {
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

  get noSpecial() {
    return (
      this.form.get('name').hasError('special') &&
        this.form.get('name').touched
    );
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      this.exists = true;

      this.emptyIngredients();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  emptyIngredients() {
    while (this.ingredients.controls.length > 0) {
      this.ingredients.removeAt(0);
    }
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    // Add a new FormControl to FormArray
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
