
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Store} from 'store';
@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/img/food.svg" alt="Food">
          Your meals
        </h1>
        <a [routerLink]="[
            '../meals/new'
        ]" class="btn__add">
          <img src="/img/add-white.svg" alt="New meal">
          New meal
        </a>
      </div>
      
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" alt="loading...">
          Fetching meals...
        </div>
      </ng-template>
      
      <div *ngIf="meals$ | async as meals; else loading;">
         <div class="message" *ngIf="!meals.length">
           <img src="/img/face.svg" alt="no meals">
           No meals, add new meal to add
         </div>
        
        <list-item
          [item]="meal"
          *ngFor="let meal of meals"
        ></list-item>
      </div>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy{

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private mealsService: MealsService,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select<Meal[]>('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
