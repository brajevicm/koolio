import {Component, OnInit} from "@angular/core";
import {PostService} from "../_services/post.service";
import {IPost} from "../_models/post";
import {IUser} from "../_models/user";
import {CommentService} from "../_services/comment.service";
import {AlertService} from "../_services/alert.service";

@Component({
    selector: 'pages',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: IPost[];
    currentUser: IUser;
    showCommentBox: boolean = false;
    loading = false;
    commentText: string;

    constructor(private _postService: PostService,
                private _commentService: CommentService,
                private _alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

    toggleComment() {
        this.showCommentBox = !this.showCommentBox;
    }

    addComment(post_id: number) {
        post_id = parseFloat(post_id.toString());
        this._commentService.addComment(post_id, this.commentText);
        this.toggleComment();
    }

    upvote(post_id: any) {
        post_id = parseFloat(post_id.toString());
        this._postService.upvotePost(post_id);
    }
}
