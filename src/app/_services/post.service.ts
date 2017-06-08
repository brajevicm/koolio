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
    private _url_upvote = 'http://127.0.0.1:80/koolio-api/api/posts/upvote.php';

    constructor(private _http: Http) {
    }

    getFilteredPosts(): Observable<IPost[]> {
        // if (localStorage.getItem('currentUser')) {
        //     let token = localStorage.getItem('currentUser');
        //     let headers = new Headers();
        //     headers.append('token', token);
        //     return this._http.get(this._url, {headers: headers})
        //         .map((response: Response) => <IPost[]> response.json().posts)
        //         // .do(data => console.log('All: ' + JSON.stringify(data)))
        //         .catch(this.localError);
        // } else {
        return this._http.get(this._url)
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.localError);
        // }
    }

    getPostsFromUser(token: string): Observable<IPost[]> {
        token = token.replace(/['"]+/g, '');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        return this._http.get(this._url_user, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getPostsFromUser: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUpvotedPosts(token: string): Observable<IPost[]> {
        token = token.replace(/['"]+/g, '');
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        return this._http.get(this._url_upvoted, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPost(id: number): Observable<IPost> {
        return this.getFilteredPosts()
            .map((posts: IPost[]) => posts.find(post => post.id === id));
    }

    upvotePost(token: string, id: number): void {
        token = token.replace(/['"]+/g, '');
        let data = "post_id=" + id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('token', token);
        this._http.post(this._url_upvote, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}