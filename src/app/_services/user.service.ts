import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {IUser} from "../_models/user";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class UserService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/users/';
    private _get = 'get.php';
    private _register = 'register.php';

    constructor(private _http: Http) {
    }

    registerUser(username: string, password: string, firstname: string, lastname: string, image: string) {
        let data = "username=" + username + "&password=" + password + "&firstname="
            + firstname + "&lastname=" + lastname + "&image=" + image;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._url + this._register, data, {headers: headers})
            .map((response: Response) => {
                    let user = response.json();
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user.token));
                    }
                }
            );
    }

    getFilteredUsers(): Observable<IUser[]> {
        return this._http.get(this._url + this._get)
            .map((response: Response) => <IUser[]> response.json().users)
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUser(): Observable<IUser> {
        let headers = this.getHeaders();
        return this._http.get(this._url + this._get, {headers: headers})
            .map((response: Response) => <IUser> response.json())
            .catch(this.localError);
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', localStorage.getItem('currentUser'));
        return headers;
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}