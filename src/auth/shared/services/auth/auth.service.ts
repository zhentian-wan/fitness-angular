
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Store} from 'store';

import 'rxjs/add/operator/do';

export interface User {
  uid: string;
  email: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  // handle on every auth state changes
  auth$ = this.af.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    });

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {

  }

  get authState() {
    return this.af.authState;
  }

  get user() {
    return this.af.auth.currentUser;
  }

  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password)
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
