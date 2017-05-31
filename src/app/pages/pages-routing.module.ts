import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PagesComponent} from "./pages.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'hot', component: PagesComponent},
            {path: 'trending', component: PagesComponent},
            {path: 'fresh', component: PagesComponent},
        ])
    ],
    declarations: [],
    exports: [RouterModule]
})

export class PagesRoutingModule {
}
