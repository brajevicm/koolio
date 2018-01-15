import { Component, OnChanges, OnInit } from '@angular/core';
import { IUser } from '../_models/user';
import { AuthService } from 'app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../_services/user.service';
import { SharedService } from '../_services/shared.service';
import { Observable } from 'rxjs/Observable';

// ...

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private _userService: UserService,
              private _authService: AuthService,
              private _sharedService: SharedService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _title: Title) {
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  logout() {
    this._authService.logout();
  }

  public setTitle(newTitle: string) {
    this._title.setTitle(newTitle);
  }
}
