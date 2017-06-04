import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
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
    private _url = 'http://127.0.0.1:80/koolio-api/api/users/get.php';
    private _url_create = 'http://127.0.0.1:80/koolio-api/users/register.php';

    constructor(private _http: Http) {
    }

    getAll() {
        return this._http.get(this._url, this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this._http.post(this._url + id, this.jwt()).map((response: Response) => response.json());
    }

    // create(user: IUser) {
    //     return this._http.post(this._url_create, user, this.jwt())
    //         .map((response: Response) => response.text());
    // }

    create(user: IUser) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._url_create, user, {headers: headers});
    }

    update(user: IUser) {
        return this._http.put(this._url, user.id, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this._http.delete(this._url + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Bearer' + currentUser.token});
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return new RequestOptions({headers: headers});
        }
    }

//


    getFilteredUsers(): Observable<IUser[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IUser[]> response.json().users)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUser(id: number): Observable<IUser> {
        return this.getFilteredUsers()
            .map((users: IUser[]) => users.find(user => user.id === id));
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}