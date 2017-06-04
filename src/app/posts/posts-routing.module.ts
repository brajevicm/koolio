import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PostsComponent} from "./posts.component";
import {PostComponent} from "./post/post.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'hot', component: PostsComponent},
            {path: 'trending', component: PostsComponent},
            {path: 'fresh', component: PostsComponent},
            {path: 'post/:id', component: PostComponent}
        ])],
    declarations: [],
    exports: [RouterModule]
})

export class PostsRoutingModule {
}
