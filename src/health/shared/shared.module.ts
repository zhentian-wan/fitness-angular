
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MealsService} from './services/meals/meals.service';
import {CommonModule} from '@angular/common';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ListItemComponent} from './components/list-item/list-item.component';
import {RouterModule} from '@angular/router';
import {WorkoutsService} from './services/workouts/workouts.service';
import {ScheduleService} from './services/schedule/schedule.service';
import {JoinPipe} from './pipes/join.pipe';
import {WorkoutPipe} from './pipes/workout.pipe';
import {NoSpecialCharsValidator} from './directives/validators/no-special-chars';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe,
    NoSpecialCharsValidator
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe,
    NoSpecialCharsValidator
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService,
        ScheduleService
      ]
    }
  }
}
