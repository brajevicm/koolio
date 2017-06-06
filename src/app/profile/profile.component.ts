import {Component, OnInit} from "@angular/core";
import {UserService} from "../_services/user.service";
import {CommentService} from "../_services/comment.service";
import {PostService} from "../_services/post.service";
import {IUser} from "../_models/user";
import {IComment} from "../_models/comment";
import {IPost} from "../_models/post";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../_services/alert.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: IUser;
    comments: IComment[];
    posts: IPost[];
    upvotedPosts: IPost[];
    sub: Subscription;

    constructor(private _userService: UserService,
                private _commentService: CommentService,
                private _postService: PostService,
                private _route: ActivatedRoute,
                private _alertService: AlertService) {
    }

    ngOnInit() {
        this.sub = this._route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    this.getPosts(1);
                    this.getComments(1);
                    this.getUpvotedPosts(1);
                }
            )
        ;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getPosts(id: number) {
        this._postService.getPostsFromUser(id)
            .subscribe(
                posts => this.posts = posts,
                error => this._alertService.error(error)
            )
        ;
    }

    getUpvotedPosts(id: number) {
        this._postService.getUpvotedPosts(id)
            .subscribe(
                posts => this.upvotedPosts = posts,
                error => this._alertService.error(error)
            )
        ;
    }

    getComments(id: number) {
        this._commentService.getCommentsFromUser(id)
            .subscribe(
                comments => this.comments = comments,
                error => this._alertService.error(error)
            )
        ;
    }
}
