import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {SharedService} from './shared.service';
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
  private _url = 'http://127.0.0.1:8080/';
  private _login = 'auth';
  public token: string;

  constructor(private _http: Http, private _sharedService: SharedService) {
  }

  login(username: string, password: string) {
    let data = JSON.stringify({ username: username, password: password });
    return this._http.post(this._url + this._login, data, this._sharedService.getOptions())
      .map((response: Response) => {
          let token = response.json() && response.json().token;
          console.log(token);
          if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private localError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}
