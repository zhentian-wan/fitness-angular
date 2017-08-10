
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.authState
      .map((user) => {
        if(!user) {
          this.router.navigate(['auth', 'login'])
        }
        return !!user;
      })
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
}
