import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";
import {AlertComponent} from "./_directives/alert/alert.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HttpModule} from "@angular/http";
import {PagesModule} from "app/pages/pages.module";
import {CommonModule} from "@angular/common";
import {AlertService} from "app/_services/alert.service";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthService} from "./_services/auth.service";
import {UserService} from "./_services/user.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        CommonModule,
        PagesModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
