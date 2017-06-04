import {Component, OnInit} from "@angular/core";
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _authService: AuthService,
                private _alertService: AlertService) {
    }

    ngOnInit() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this._authService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    let timer = TimerObservable.create(1000, 500);
                    timer.subscribe(t => {
                        location.reload();
                        this._router.navigate(['returnUrl']);
                    });
                },
                error => {
                    this._alertService.error(error);
                    this.loading = false;
                }
            );
    }

}
