import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { RegisterComponent } from './containers/register/register.component';
import {SharedModule} from '../shared/shared.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {}
