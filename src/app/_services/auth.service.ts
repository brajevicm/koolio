import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/users/login.php';

    constructor(private _http: Http) {
    }

    login(username: string, password: string) {
        let data = "username=" + username + "&password=" + password;
        // let data = JSON.stringify({username: username, password: password});
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._url, data, {headers: headers})
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}