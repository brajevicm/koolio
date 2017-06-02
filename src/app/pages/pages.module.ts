import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PagesRoutingModule} from "./pages-routing.module";
import {PagesComponent} from "./pages.component";
import {PageComponent} from "../page/page.component";
import {CommentComponent} from "../comment/comment.component";
import {PostService} from "../_services/post.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PagesRoutingModule
    ],
    declarations: [
        PagesComponent,
        PageComponent,
        CommentComponent
    ],
    exports: [
        PagesComponent,
        PageComponent,
        CommentComponent,
        PagesRoutingModule
    ],
    providers: [
        PostService
    ]
})
export class PagesModule {
}
