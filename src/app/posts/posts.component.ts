import {Component, OnInit} from "@angular/core";
import {PostService} from "../_services/post.service";
import {IPost} from "../_models/post";
import {IUser} from "../_models/user";
import {CommentService} from "../_services/comment.service";
import {AlertService} from "../_services/alert.service";
import {UserService} from "../_services/user.service";

@Component({
    selector: 'pages',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    posts: IPost[];
    topCommented: IPost[];
    currentUser: IUser;
    user: IUser;
    showCommentBox: boolean = false;
    loading = false;
    commentText: string;

    constructor(private _postService: PostService,
                private _userService: UserService,
                private _commentService: CommentService,
                private _alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        if (this.currentUser) {
            this.getUser();
        }
        this.loadAllPosts();
        this.loadAllTopCommentedPosts();
    }


    private getUser() {
        return this._userService.getUser()
            .subscribe(
                user => this.user = user,
                error => this._alertService.error(error)
            );
    }

    private loadAllPosts() {
        this._postService.getFilteredPosts()
            .subscribe(posts => {
                this.posts = posts;
            })
        ;
    }

    private loadAllTopCommentedPosts() {
        this._postService.getTopCommentedPosts()
            .subscribe(posts => {
                this.topCommented = posts;
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

    upvotePost(post_id: any) {
        post_id = parseFloat(post_id.toString());
        this._postService.upvotePost(post_id);
    }

    removePost(post_id: number) {
        post_id = parseFloat(post_id.toString());
        this._postService.removePost(post_id);
    }

    reportPost(post_id: number) {
        post_id = parseFloat(post_id.toString());
        this._postService.reportPost(post_id);
    }
}
