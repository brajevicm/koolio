import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {PagesModule} from "./pages/pages.module";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PageComponent} from './page/page.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        PagesModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
