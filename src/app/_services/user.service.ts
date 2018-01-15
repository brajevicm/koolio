import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../_models/user';
import { API_URL, REGISTER, USER, USERS } from '../../constants';
import { SharedService } from './shared.service';

/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class UserService {

  constructor(private _http: Http,
              private _sharedService: SharedService) {
  }

  public registerUser(username: string, password: string, firstname: string, lastname: string, image: string) {
    let data = JSON.stringify({
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      profileImage: image
    });
    const options = this._sharedService.getOptions();
    const url = API_URL + REGISTER;

    return this._http.post(url, data, options)
      .map((response: Response) => {
          const user = response.json();
          if (user && user.token) {
            this._sharedService.setToken(JSON.stringify(user.token));
          }
        }
      );
  }

  public getFilteredUsers(): Observable<IUser[]> {
    const url = API_URL + USERS;

    return this._http.get(url)
      .map((response: Response) => <IUser[]> response.json().users)
      .catch(this._sharedService.localError);
  }

  public getUser(id: number): Observable<IUser> {
    const options = this._sharedService.getOptions();
    const url = API_URL + USER + id;

    return this._http.get(url, options)
      .map((response: Response) => <IUser> response.json())
      .catch(this._sharedService.localError);
  }
}
