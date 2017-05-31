import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                // {path: 'hot', component: HotPagesComponent},
                // {path: 'trending', component: TrendingPagesComponent},
                // {path: 'fresh', component: FreshPagesComponent}
                {path: '', redirectTo: 'hot', pathMatch: 'full'},
                // {path: '**', redirectTo: 'hot', pathMatch: 'full'}
            ]
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}