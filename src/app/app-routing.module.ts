import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
                {path: 'register', component: RegisterComponent},
                {path: '', redirectTo: 'hot', pathMatch: 'full'}
                // {path: '**', redirectTo: 'hot', pathMatch: 'full'}
            ]
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}