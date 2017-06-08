import {Component, OnInit} from "@angular/core";
import {IUser} from "../_models/user";
import {AuthService} from "app/_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {UserService} from "../_services/user.service";
// ...

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: IUser;
    user: IUser;

    constructor(private _userService: UserService,
                private _authService: AuthService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _title: Title) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // if (this.currentUser) {
        //     this.getUser(localStorage.getItem('currentUser'));
        // }
    }

    // getUser(token: string) {
    //     this._userService.getUser(token)
    //         .subscribe(user => {
    //             this.user = user;
    //         });
    // }

    logout() {
        this._authService.logout();
    }

    public setTitle(newTitle: string) {
        this._title.setTitle(newTitle);
    }
}
