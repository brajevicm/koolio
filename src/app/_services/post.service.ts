import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IPost} from "../_models/post";
import "rxjs/operator/map";
import "rxjs/operator/do";
import "rxjs/operator/catch";
import {Injectable} from "@angular/core";
import {SharedService} from './shared.service';
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

    constructor(private _http: Http, private _sharedService: SharedService) {
    }

/*
  const data = JSON.stringify({id: id, text: text});
  const options = this._sharedService.getOptions();*/


    addPost(title: string) {
        if (localStorage.getItem('currentUser')) {
          const data = JSON.stringify({title: title});
          const options = this._sharedService.getOptions();
            this._http.post(this._url + this._add, data, options)
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
/*    proveriti sta i kako sa offset pri slanju kroz JSON */
    getHotPosts(offset: number): Observable<IPost[]> {
        if (localStorage.getItem('currentUser')) {
            let data = "offset=" + offset;
            let headers = this.getHeaders();
          const options = this._sharedService.getOptions();
            return this._http.post(this._url + this._get, data, options)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        } else {
            let data = "offset=" + offset;
          let headers = this.getHeaders();
          const options = this._sharedService.getOptions();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this._url + this._get, data, options)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
        }
    }


    getTrendingPosts(): Observable<IPost[]> {
          const options = this._sharedService.getOptions();
            return this._http.get(this._url + this._get, options)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
    }


    getFreshPosts(): Observable<IPost[]> {
      const options = this._sharedService.getOptions();
            return this._http.get(this._url + this._get, options)
                .map((response: Response) => <IPost[]> response.json().posts)
                // .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.localError);
    }

    getPostsFromUser(): Observable<IPost[]> {
      const options = this._sharedService.getOptions();
        return this._http.get(this._url + this._user, options)
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getPostsFromUser: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getUpvotedPosts(): Observable<IPost[]> {
      const options = this._sharedService.getOptions();
        return this._http.get(this._url + this._upvoted, options)
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getTopCommentedPosts(): Observable<IPost[]> {
      const options = this._sharedService.getOptions();
        return this._http.get(this._url + this._top, options)
            .map((response: Response) => <IPost[]> response.json().posts)
            // .do(data => console.log('getUpvotedPosts: ' + JSON.stringify(data)))
            .catch(this.localError);
    }

    getPost(id: number): Observable<IPost> {
      const data = JSON.stringify({post_id: id});
      const options = this._sharedService.getOptions();
            return this._http.post(this._url + this._get, data, options)
                .map((response: Response) => <IPost> response.json())
                .catch(this.localError);
    }

    upvotePost(id: number): void {
      const data = JSON.stringify({post_id: id});
      const options = this._sharedService.getOptions();
        this._http.post(this._url + this._upvote, data, options)
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    removePost(id: number): void {
      const data = JSON.stringify({post_id: id});
      const options = this._sharedService.getOptions();
        this._http.post(this._url + this._remove, data, options)
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }

    reportPost(id: number): void {
      const data = JSON.stringify({post_id: id});
      const options = this._sharedService.getOptions();
        this._http.post(this._url + this._report, data, options)
            .map(res => res)
            .subscribe(data => data,
                err => this.localError(err)
            )
        ;
    }


  /**
   * TODO
   * @returns {Headers}
   * Remove this function after cleaning up of functions above
   * Sincerelly,
   * SS
   */
  private getHeaders(): Headers {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return headers;
  }
    private localError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
