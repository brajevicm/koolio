import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {NavigationStart, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private _router: Router) {
        _router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'success', text: message});
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'error', text: message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}