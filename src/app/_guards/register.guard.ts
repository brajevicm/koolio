import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
/**
 * Created by brajevicm on 8/06/17.
 */

@Injectable()
export class RegisterGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            this._router.navigate(['/hot'], {queryParams: {returnUrl: state.url}});
            return false;
        }

        return true;
    }
}