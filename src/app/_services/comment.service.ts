import {Headers, Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {IComment} from "../_models/comment";
/**
 * Created by brajevicm on 4/06/17.
 */

@Injectable()
export class CommentService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/comments/get.php';
    private _url_user = 'http://127.0.0.1:80/koolio-api/api/comments/user.php';

    constructor(private _http: Http) {
    }

    getFilteredcomments(): Observable<IComment[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IComment[]> response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPostComments(id: number): Observable<IComment[]> {
        let data = "post_id=" + id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._url, data, {headers: headers})
            .map((response: Response) => <IComment[]> response.json().comments)
            .do(data => console.log('getPostComments: ' + JSON.stringify(data)));
    }

    getCommentsFromUser(token: string): Observable<IComment[]> {
        token = token.replace(/['"]+/g, '');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        return this._http.get(this._url_user, {headers: headers})
            .map((response: Response) => <IComment[]> response.json().comments)
            .do(data => console.log('getCommentsFromUser: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getComment(id: number): Observable<IComment> {
        return this.getFilteredcomments()
            .map((comments: IComment[]) => comments.find(comment => comment.id === id));
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}