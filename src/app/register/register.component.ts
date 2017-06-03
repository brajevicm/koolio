import {Component, OnInit} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {AlertService} from "../_services/alert.service";

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
                private alertService: AlertService) {
    }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        let data =
            "username=" + this.model.username + "&password=" + this.model.password + "&firstname="
            + this.model.firstname + "&lastname=" + this.model.lastname + "&image=" + this.model.image;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._http.post('http://127.0.0.1:80/koolio-api/api/v1/register.php', data, {headers: headers})
            .map(res => res)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this._router.navigate(['/hot']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
        // console.log(this.model);
        // this._userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this._router.navigate(['/hot']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         }
        //     );
    }

}
