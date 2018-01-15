import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';
import { API_URL, AUTH, TOKEN } from '../../constants';
import { IUser } from '../_models/user';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
  private token: string;
  private user: IUser;
  isLoginSubject = new BehaviorSubject<boolean>(this._sharedService.hasToken());

  constructor(private _http: Http,
              private _sharedService: SharedService) {
  }

  public login(username: string, password: string): Observable<boolean> {
    const data = JSON.stringify({username: username, password: password});
    const options = this._sharedService.getOptions();
    const url = API_URL + AUTH;

    return this._http.post(url, data, options)
      .map((response: Response) => {
          const token = response.json() && response.json().token;
          if (token) {
            this.token = token;
            this._sharedService.setToken(token);
            const timer = TimerObservable.create(2000, 500);
            timer.subscribe(t => {
              this.isLoginSubject.next(true);
              return true;
            });
          } else {
            return false;
          }
        }
      );
  }

  public logout() {
    localStorage.removeItem(TOKEN);
    this.isLoginSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
