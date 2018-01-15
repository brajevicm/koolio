import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

/**
 * Created by brajevicm on 8/06/17.
 */

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/hot'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    return true;
  }
}
