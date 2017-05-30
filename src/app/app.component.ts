import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pageTitle: string = 'Koolio';

    pageHot: string = 'Hot';
    pageTrending: string = 'Trending';
    pageFresh: string = 'Fresh';

    pageRegister: string = 'Register';
    pageLogin: string = 'Login';
    pageLogout: string = 'Logout';

    profile: string = 'Profile';

    guestMode: boolean = true;
    
    hotMode: boolean;
    trendingMode: boolean;
    freshMode: boolean;
}
