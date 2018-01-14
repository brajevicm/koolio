import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { PostGuard } from '../_guards/post.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'hot', component: PostsComponent},
      {path: 'trending', component: PostsComponent},
      {path: 'fresh', component: PostsComponent},
      {path: 'post/:id', canActivate: [PostGuard], component: PostComponent}
    ])],
  declarations: [],
  exports: [RouterModule]
})

export class PostsRoutingModule {
}
