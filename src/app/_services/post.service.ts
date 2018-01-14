import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPost } from '../_models/post';
import 'rxjs/operator/map';
import 'rxjs/operator/do';
import 'rxjs/operator/catch';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { API_URL, POST, POSTS, TOKEN, USER } from '../../constants';

/**
 * Created by brajevicm on 2/06/17.
 */

@Injectable()
export class PostService {
  private _upvote = 'upvote.php';

  constructor(private _http: Http,
              private _sharedService: SharedService) {
  }

  public addPost(title: string): void {
    if (this._sharedService.isUserLoggedIn()) {
      const data = JSON.stringify({title: title});
      const options = this._sharedService.getOptions();
      const url = API_URL + POSTS;

      this._http.post(url, data, options)
        .map(res => res)
        .subscribe(next => next,
          err => this._sharedService.localError(err)
        )
      ;
    }
  }

  // @TODO parameter query
  // getHotPosts(offset: number): Observable<IPost[]> {
  //   const options = this._sharedService.getOptions();
  //   const url = API_URL + POSTS;
  //
  //   return this._http.get(url, options)
  //     .map((response: Response) => <IPost[]> response.json().posts)
  //     .catch(this._sharedService.localError);
  // }
  getHotPosts(offset: number): Observable<IPost[]> {
    if (this._sharedService.isUserLoggedIn()) {
      const data = 'offset=' + offset;
      const options = this._sharedService.getOptions();
      const url = API_URL + POSTS;

      return this._http.post(url, data, options)
        .map((response: Response) => <IPost[]> response.json().posts)
        // .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this._sharedService.localError);
    } else {
      const data = 'offset=' + offset;
      const options = this._sharedService.getOptions();
      const url = API_URL + POSTS;

      return this._http.post(url, data, options)
        .map((response: Response) => <IPost[]> response.json().posts)
        // .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this._sharedService.localError);
    }
  }


// @TODO parameter query
  getTrendingPosts(): Observable<IPost[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + POSTS;

    return this._http.get(url, options)
      .map((response: Response) => <IPost[]> response.json().posts)
      .catch(this._sharedService.localError);
  }

// @TODO parameter query
  getFreshPosts(): Observable<IPost[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + POSTS;

    return this._http.get(url, options)
      .map((response: Response) => <IPost[]> response.json().posts)
      .catch(this._sharedService.localError);
  }

  getPostsFromUser(id: number): Observable<IPost[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + USER + id + '/' + POSTS;

    return this._http.get(url, options)
      .map((response: Response) => <IPost[]> response.json().posts)
      .catch(this._sharedService.localError);
  }

  // @TODO parameter query
  getUpvotedPosts(id: number): Observable<IPost[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + USER + id + '/' + POSTS;

    return this._http.get(url, options)
      .map((response: Response) => <IPost[]> response.json().posts)
      .catch(this._sharedService.localError);
  }

  // @TODO parameter query
  getTopCommentedPosts(): Observable<IPost[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + POSTS;

    return this._http.get(url, options)
      .map((response: Response) => <IPost[]> response.json().posts)
      .catch(this._sharedService.localError);
  }

  getPost(id: number): Observable<IPost> {
    const options = this._sharedService.getOptions();
    const url = API_URL + POST + id;

    return this._http.post(url, options)
      .map((response: Response) => <IPost> response.json())
      .catch(this._sharedService.localError);
  }

  // @TODO Upvote post has to wait for backend
  upvotePost(id: number): void {
    const data = JSON.stringify({post_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL + this._upvote;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }

  // @TODO http.delete instead of http.post
  removePost(id: number): void {
    const data = JSON.stringify({post_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }

  // @TODO Report post has to wait for backend
  reportPost(id: number): void {
    const data = JSON.stringify({post_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }
}
