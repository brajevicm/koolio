import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this._router.navigate(['/hot'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
