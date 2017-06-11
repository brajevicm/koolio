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
    private _url = 'http://127.0.0.1:80/koolio-api/api/posts/';
    private _get = 'get.php';
    private _hot = 'hot.php';
    private _trending = 'trending.php';
    private _fresh = 'fresh.php';
    private _top = 'top.php';
    private _add = 'add.php';
    private _remove = 'remove.php';
    private _report = 'report.php';
    private _user = 'user.php';
    private _upvoted = 'upvoted.php';
    private _upvote = 'upvote.php';

    constructor(private _http: Http) {
    }

    addPost(title: string) {
        if (localStorage.getItem('currentUser')) {
            let data = "title=" + title;
            let headers = this.getHeaders();
            this._http.post(this._url + this._add, data, {headers: headers})
                .map(res => res)
                .do(data => console.log(data))
                .subscribe(data => data,
                    err => this.localError(err)
                )
            ;
        }
    }

    /**
     * TODO
     * @returns {Observable<R|T>}
     */
    getHotPosts(): Observable<IPost[]> {
        if (localStorage.getItem('currentUser')) {
            let headers = this.getHeaders();
            return this._http.get(this._url + this._get, {headers: headers})
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        } else {
            return this._http.get(this._url + this._get)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        }
    }

    /**
     * TODO
     * @returns {Observable<R|T>}
     */
    getTrendingPosts(): Observable<IPost[]> {
        if (localStorage.getItem('currentUser')) {
            let headers = this.getHeaders();
            return this._http.get(this._url + this._get, {headers: headers})
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        } else {
            return this._http.get(this._url + this._get)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        }
    }

    /**
     * TODO
     * @returns {Observable<R|T>}
     */
    getFreshPosts(): Observable<IPost[]> {
        if (localStorage.getItem('currentUser')) {
            let headers = this.getHeaders();
            return this._http.get(this._url + this._get, {headers: headers})
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        } else {
            return this._http.get(this._url + this._get)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        }
    }

    getPostsFromUser(): Observable<IPost[]> {
        let headers = this.getHeaders();
        return this._http.get(this._url + this._user, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getPostsFromUser: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUpvotedPosts(): Observable<IPost[]> {
        let headers = this.getHeaders();
        return this._http.get(this._url + this._upvoted, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getTopCommentedPosts(): Observable<IPost[]> {
        let headers = this.getHeaders();
        return this._http.get(this._url + this._top, {headers: headers})
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPost(id: number): Observable<IPost> {
        return this.getHotPosts()
            .map((posts: IPost[]) => posts.find(post => post.id === id));
    }

    upvotePost(id: number): void {
        let data = "post_id=" + id;
        let headers = this.getHeaders();
        this._http.post(this._url + this._upvote, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    removePost(id: number): void {
        let data = "post_id=" + id;
        let headers = this.getHeaders();
        this._http.post(this._url + this._remove, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    reportPost(id: number): void {
        let data = "post_id=" + id;
        let headers = this.getHeaders();
        this._http.post(this._url + this._report, data, {headers: headers})
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
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