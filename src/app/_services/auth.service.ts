import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class AuthService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/v1/login.php';

    constructor(private _http: Http) {
    }

    login(username: string, password: string) {
        return this._http.post(this._url, JSON.stringify({username: username, password: password}))
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