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
    upvoted = false;

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
            });
    }

    upvote() {
        this.upvoted = true;
    }
}