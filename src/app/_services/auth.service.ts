import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';
import { API_URL, AUTH, TOKEN } from '../../constants';

/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
  public token: string;

  constructor(private _http: Http,
              private _sharedService: SharedService) {
  }

  public login(username: string, password: string): Observable<boolean> {
    const data = JSON.stringify({username: username, password: password});
    const options = this._sharedService.getOptions();
    const url = API_URL + AUTH;

    return this._http.post(url, data, options)
      .map((response: Response) => {
          let token = response.json() && response.json().token;
          if (token) {
            this.token = token;
            token = JSON.stringify({username: username, token: token});
            this._sharedService.setToken(token);
            // localStorage.setItem('token', JSON.stringify({username: username, token: token}));
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        }
      );
  }

  public logout() {
    localStorage.removeItem(TOKEN);
  }
}
