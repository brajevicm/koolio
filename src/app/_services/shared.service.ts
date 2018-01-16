import {Headers, RequestOptions} from '@angular/http';


export class SharedService {

  public getOptions(): RequestOptions {
    let headers = this.getHeaders();
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  public getHeaders(): Headers {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    if (localStorage.getItem('currentUser')) {
     headers.append('Authorization', 'Bearer '  + localStorage.getItem('currentUser'));
    }
    /**
     * TODO
     *
     */
    /*else{
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }*/
    return headers;
  }
}

