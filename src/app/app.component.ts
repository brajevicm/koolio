import {Component} from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    pageTitle = 'Koolio';

    pageHot = 'Hot';
    pageTrending = 'Trending';
    pageFresh = 'Fresh';

    pageRegister = 'Register';
    pageLogin = 'Login';
    pageLogout = 'Logout';

    profile = 'Profile';
    uploadImage = 'Upload';

    guestMode = true;

    hotMode: boolean;
    trendingMode: boolean;
    freshMode: boolean;
}
