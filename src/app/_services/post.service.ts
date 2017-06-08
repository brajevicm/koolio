import {Headers, Http, Response} from "@angular/http";
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
    private _url = 'http://127.0.0.1:80/koolio-api/api/posts/get.php';
    private _url_user = 'http://127.0.0.1:80/koolio-api/api/posts/user.php';
    private _url_upvoted = 'http://127.0.0.1:80/koolio-api/api/posts/upvoted.php';

    constructor(private _http: Http) {
    }

    getFilteredPosts(): Observable<IPost[]> {
        return this._http.get(this._url)
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPostsFromUser(token: string): Observable<IPost[]> {
        token = token.replace(/['"]+/g, '');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        return this._http.get(this._url_user, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            .do(data => console.log('getPostsFromUser: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUpvotedPosts(token: string): Observable<IPost[]> {
        token = token.replace(/['"]+/g, '');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        return this._http.get(this._url_upvoted, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPost(id: number): Observable<IPost> {
        return this.getFilteredPosts()
            .map((posts: IPost[]) => posts.find(post => post.id === id));
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}