import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/users/';
    private _login = 'login.php';

    constructor(private _http: Http) {
    }

    login(username: string, password: string) {
        let data = "username=" + username + "&password=" + password;
        let headers = this.getHeaders();
        return this._http.post(this._url + this._login, data, {headers: headers})
            .map((response: Response) => {
                    let user = response.json();
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user.token));
                    }
                }
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
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