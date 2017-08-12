
import {NgModule} from '@angular/core';
import {MealsComponent} from './containers/meals/meals.component';
import {MealComponent} from './containers/meal/meal.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MealFormComponent} from './components/mea-form/meal-form-component';

export const ROUTES: Routes = [
  {path: '', component: MealsComponent},
  {path: 'new', component: MealComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ]
})
export class MealsModule {

}
