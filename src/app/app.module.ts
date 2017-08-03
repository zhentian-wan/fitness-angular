import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}


/*
* var config = {
 apiKey: "AIzaSyCCyjkp0T9MTznnqzvcvD1SMC_B-eCkfpg",
 authDomain: "fitness-app-a26ed.firebaseapp.com",
 databaseURL: "https://fitness-app-a26ed.firebaseio.com",
 projectId: "fitness-app-a26ed",
 storageBucket: "fitness-app-a26ed.appspot.com",
 messagingSenderId: "781493219422"
 };
 firebase.initializeApp(config);
* */
