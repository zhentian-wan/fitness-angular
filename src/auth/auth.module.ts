///<reference path="shared/services/auth/auth.service.ts"/>
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {SharedModule} from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'}
    ]
  }
];

export const forebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCCyjkp0T9MTznnqzvcvD1SMC_B-eCkfpg",
  authDomain: "fitness-app-a26ed.firebaseapp.com",
  databaseURL: "https://fitness-app-a26ed.firebaseio.com",
  projectId: "fitness-app-a26ed",
  storageBucket: "fitness-app-a26ed.appspot.com",
  messagingSenderId: "781493219422"
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(forebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
    RouterModule.forChild(ROUTES)
  ]
})
export class AuthModule {}
