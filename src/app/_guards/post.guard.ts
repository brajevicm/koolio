import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AlertService} from "../_services/alert.service";
/**
 * Created by brajevicm on 4/06/17.
 */

@Injectable()
export class PostGuard implements CanActivate {

    constructor(private _router: Router,
                private _alertService: AlertService) {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            this._alertService.error('Invalid post id.');
            this._router.navigate(['']);
            return false;
        }
        return true;
    }
}