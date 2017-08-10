
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MealsService} from './services/meals/meals.service';
import {CommonModule} from '@angular/common';
import {AngularFireDatabaseModule} from 'angularfire2/database';
@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    }
  }
}
