import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(private _router: Router,
                private _http: Http,
                private _userService: UserService,
                private _alertService: AlertService) {
    }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        this._userService.registerUser(
            this.model.username,
            this.model.password,
            this.model.firstname,
            this.model.lastname,
            this.model.image
        )
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
            )
        ;
    }

}
