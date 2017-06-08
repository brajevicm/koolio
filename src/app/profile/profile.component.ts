import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {CommentService} from "../_services/comment.service";
import {PostService} from "../_services/post.service";
import {IComment} from "../_models/comment";
import {IPost} from "../_models/post";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {AuthService} from "../_services/auth.service";
import {IUser} from "../_models/user";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: IUser;
    user: IUser;
    comments: IComment[];
    posts: IPost[];
    upvotedPosts: IPost[];

    constructor(private _userService: UserService,
                private _commentService: CommentService,
                private _postService: PostService,
                private _route: ActivatedRoute,
                private _alertService: AlertService,
                private  _authService: AuthService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.getUser(localStorage.getItem('currentUser'));
            this.getPosts(localStorage.getItem('currentUser'));
            this.getComments(localStorage.getItem('currentUser'));
            this.getUpvotedPosts(localStorage.getItem('currentUser'));
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

    getPosts(token: string) {
        this._postService.getPostsFromUser(token)
            .map(res => res)
            .subscribe(res => this.posts = res);
    }

    getUpvotedPosts(token: string) {
        this._postService.getUpvotedPosts(token)
            .subscribe(
                posts => this.upvotedPosts = posts,
                error => this._alertService.error(error)
            )
        ;
    }

    getComments(token: string) {
        this._commentService.getCommentsFromUser(token)
            .subscribe(
                comments => this.comments = comments,
                error => this._alertService.error(error)
            )
        ;
    }

    getUser(token: string) {
        return this._userService.getUser(token)
            .subscribe(
                user => this.user = user,
                error => this._alertService.error(error)
            )
            ;
    }

}
