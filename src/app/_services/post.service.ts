import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IPost} from "../_models/post";
import "rxjs/operator/map";
import "rxjs/operator/do";
import "rxjs/operator/catch";
import {Injectable} from "@angular/core";
/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class PostService {
    private _url = 'http://127.0.0.1:80/koolio-api/api/v1/posts.php';

    constructor(private _http: Http) {
    }

    getFilteredPosts(): Observable<IPost[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IPost[]> response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPost(id: number): Observable<IPost> {
        return this.getFilteredPosts()
            .map((users: IPost[]) => users.find(user => user.id === id));
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}