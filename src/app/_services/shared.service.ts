import { Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TOKEN } from '../../constants';

/**
 * Created by brajevicm on 13/01/18.
 */
@Injectable()
export class SharedService {

  public localError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

  public getOptions(): RequestOptions {
    const headers = this.getHeaders();
    return new RequestOptions({headers: headers});
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (localStorage.getItem(TOKEN)) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem(TOKEN));
    }

    return headers;
  }

  public isUserLoggedIn(): boolean {
    const JWT_REGEX_PATTERN = new RegExp(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);

    return JWT_REGEX_PATTERN.test(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
}

