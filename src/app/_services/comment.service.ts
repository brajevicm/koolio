import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {IComment} from "../_models/comment";
/**
 * Created by brajevicm on 4/06/17.
 */

@Injectable()
export class CommentService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/comments/';
    private _get = 'get.php';
    private _user = 'user.php';
    private _add = 'add.php';
    private _upvote = 'upvote.php';

    constructor(private _http: Http) {
    }

    addComment(id: number, text: string) {
        let data = "post_id=" + id + "&text=" + text;
        let headers = this.getHeaders();
        this._http.post(this._url + this._add, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
    }

    upvoteComment(id: number): void {
        let data = "comment_id=" + id;
        let headers = this.getHeaders();
        this._http.post(this._url + this._upvote, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    getFilteredComments(): Observable<IComment[]> {
        return this._http.get(this._url + this._get)
            .map((response: Response) => <IComment[]> response.json())
            .catch(this.localError);
    }

    getPostComments(id: number): Observable<IComment[]> {
        if (localStorage.getItem('currentUser')) {
            let data = "post_id=" + id;
            let headers = this.getHeaders();
            return this._http.post(this._url + this._get, data, {headers: headers})
                .map((response: Response) => <IComment[]> response.json().comments)
        } else {
            let data = "post_id=" + id;
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this._url + this._get, data, {headers: headers})
                .map((response: Response) => <IComment[]> response.json().comments)
        }
    }

    getCommentsFromUser(): Observable<IComment[]> {
        let headers = this.getHeaders();
        return this._http.get(this._url + this._user, {headers: headers})
            .map((response: Response) => <IComment[]> response.json().comments)
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