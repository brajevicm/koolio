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
            .do(data => console.log('All: ' + JSON.stringify(data)));
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