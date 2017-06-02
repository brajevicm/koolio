import {Component, OnInit} from "@angular/core";
import {IUser} from "../_models/user";
import {AuthService} from "app/_services/auth.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: IUser;

    constructor(private _authService: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    logout() {
        this._authService.logout();
    }
}
