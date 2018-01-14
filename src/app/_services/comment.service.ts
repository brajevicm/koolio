import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IComment } from '../_models/comment';
import { SharedService } from './shared.service';
import { API_URL, COMMENTS, COMMENT, USER, POST } from '../../constants';

/**
 * Created by brajevicm on 4/06/17.
 */

@Injectable()
export class CommentService {
  private _report = 'report.php';
  private _upvote = 'upvote.php';

  constructor(private _http: Http,
              private _sharedService: SharedService) {
  }

  public addComment(id: number, text: string): void {
    const data = JSON.stringify({id: id, text: text});
    const options = this._sharedService.getOptions();
    const url = API_URL + COMMENTS;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }

// @TODO Upvote comment has to wait for backend
  public upvoteComment(id: number): void {
    const data = JSON.stringify({id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL + this._upvote;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }

  // @TODO http.delete instead of http.post
  public removeComment(id: number): void {
    const data = JSON.stringify({comment_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL + COMMENT + id;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      )
    ;
  }

  // @TODO Report comment has to wait for backend
  public reportComment(id: number): void {
    const data = JSON.stringify({comment_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL + this._report;

    this._http.post(url, data, options)
      .map(res => res)
      .subscribe(next => next,
        err => this._sharedService.localError(err)
      );
  }

  public getPostComments(id: number): Observable<IComment[]> {
    const data = JSON.stringify({post_id: id});
    const options = this._sharedService.getOptions();
    const url = API_URL + POST + id + '/' + COMMENTS;

    return this._http.post(url, data, options)
      .map((response: Response) => <IComment[]> response.json().comments)
      .catch(this._sharedService.localError);
  }

  public getCommentsFromUser(id: number): Observable<IComment[]> {
    const options = this._sharedService.getOptions();
    const url = API_URL + USER + id + '/' + COMMENTS;

    return this._http.get(url, options)
      .map((response: Response) => <IComment[]> response.json().comments)
      .catch(this._sharedService.localError);
  }
}
