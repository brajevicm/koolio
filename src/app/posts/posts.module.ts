import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostsRoutingModule} from "./posts-routing.module";
import {PostsComponent} from "./posts.component";
import {PostComponent} from "./post/post.component";
import {PostService} from "../_services/post.service";
import {FormsModule} from "@angular/forms";
import {CommentService} from "../_services/comment.service";
import {PostGuard} from "../_guards/post.guard";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PostsRoutingModule,
        InfiniteScrollModule
    ],
    declarations: [
        PostsComponent,
        PostComponent
    ],
    exports: [
        PostsComponent,
        PostComponent,
        PostsRoutingModule
    ],
    providers: [
        PostService,
        CommentService,
        PostGuard
    ]
})
export class PostsModule {
}
