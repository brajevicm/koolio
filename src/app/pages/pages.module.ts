import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from "./pages-routing.module";
import {PagesComponent} from "./pages.component";
import {PageComponent} from "../page/page.component";
import {CommentComponent} from "../comment/comment.component";

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule
    ],
    declarations: [
        PagesComponent,
        PageComponent,
        CommentComponent
    ]
})
export class PagesModule {
}
