import {Headers, Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IComment} from '../_models/comment';
import {SharedService} from './shared.service';

/**
 * Created by brajevicm on 4/06/17.
 */

@Injectable()
export class CommentService {
  private _url = 'http://127.0.0.1:8080/comments/';
  private _get = 'get.php';
  private _user = 'user.php';
  private _add = 'add.php';
  private _remove = 'remove.php';
  private _report = 'report.php';
  private _upvote = 'upvote.php';

  constructor(private _http: Http, private _sharedService: SharedService) {
  }

  addComment(id: number, text: string) {
    const data = JSON.stringify({id: id, text: text});
    const options = this._sharedService.getOptions();
    return this._http.post(this._url + this._add, data, options)
      .map(res => res)
      .subscribe(data => data,
        err => this.localError(err)
      );
  }


  upvoteComment(id: number): void {
    const data = JSON.stringify({id: id});
    const options = this._sharedService.getOptions();
    this._http.post(this._url + this._upvote, data, options)
      .map(res => res)
      .subscribe(data => data,
        err => this.localError(err)
      );
  }

  getPostComments(id: number): Observable<IComment[]> {
    const data = JSON.stringify({post_id: id});
    const options = this._sharedService.getOptions();

    return this._http.post(this._url + this._get, data, options)
      .map((response: Response) => <IComment[]> response.json().comments)
      .catch(this.localError);
  }

  getCommentsFromUser(): Observable<IComment[]> {
    const options = this._sharedService.getOptions();
    return this._http.get(this._url + this._user, options)
      .map((response: Response) => <IComment[]> response.json().comments)
      .catch(this.localError);
  }

  removeComment(id: number): void {
    const data = JSON.stringify({comment_id: id});
    const options = this._sharedService.getOptions();
    this._http.post(this._url + this._remove, data, options)
      .map(res => res)
      .subscribe(data => data,
        err => this.localError(err)
      )
    ;
  }

  reportComment(id: number): void {
    const data = JSON.stringify({comment_id: id});
    const options = this._sharedService.getOptions();
    this._http.post(this._url + this._report, data, options)
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
