import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';

/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isLoggedIn()) {
      return true;
    }

    this._router.navigate(['/hot'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
