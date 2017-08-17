
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MealsService} from './services/meals/meals.service';
import {CommonModule} from '@angular/common';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ListItemComponent} from './components/list-item/list-item.component';
import {RouterModule} from '@angular/router';
import {WorkoutsService} from './services/workouts/workouts.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent
  ],
  exports: [
    ListItemComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    }
  }
}
