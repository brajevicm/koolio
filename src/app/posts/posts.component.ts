import {Component, OnInit} from "@angular/core";
import {PostService} from "../_services/post.service";
import {IPost} from "../_models/post";

@Component({
    selector: 'pages',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: IPost[];

    constructor(private _postService: PostService) {
    }

    ngOnInit() {
        this.loadAllPosts();
    }

    ngOnDestroy() {
    }

    private loadAllPosts() {
        this._postService.getFilteredPosts()
            .subscribe(posts => {
                this.posts = posts;
            })
        ;
    }

    private upvote(post_id: any) {
        post_id = parseFloat(post_id.toString());
        this._postService.upvotePost(localStorage.getItem('currentUser'), post_id);
    }
}
