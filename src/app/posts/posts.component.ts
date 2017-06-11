import {Component, OnInit} from "@angular/core";
import {PostService} from "../_services/post.service";
import {IPost} from "../_models/post";
import {IUser} from "../_models/user";
import {CommentService} from "../_services/comment.service";
import {AlertService} from "../_services/alert.service";
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    loading = false;
    commentText: string;
    throttle = 300;
    scrollDistance = 2;

    constructor(private _postService: PostService,
                private _userService: UserService,
                private _commentService: CommentService,
                private _alertService: AlertService,
                private _route: ActivatedRoute,
                private _router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllTopCommentedPosts();
        if (this._router.url == '/hot') {
            this.initUser();
            this.loadHotPosts();
        } else if (this._router.url == '/trending') {
            this.initUser();
            this.loadTrendingPosts();
        } else if (this._router.url == '/fresh') {
            this.initUser();
            this.loadFreshPosts();
        }
    }

    // addItems(startIndex: number, endIndex: number) {
    //     for (let i = 0; i < this.sum; ++i) {
    //         this.posts.push([i, ' ', this.generateWord()].join(''));
    //     }
    // }

    onScrollDown() {
        console.log('scrolled!!');

        // const start = this.sum;
        // this.sum += 20;
        // this.addItems(start, this.sum);
    }

    private initUser() {
        if (this.currentUser) {
            this.getUser();
        }
    }

    private getUser() {
        return this._userService.getUser()
            .subscribe(
                user => this.user = user,
                error => this._alertService.error(error)
            );
    }

    private loadHotPosts() {
        this._postService.getHotPosts()
            .subscribe(posts => {
                this.posts = posts;
            })
        ;
    }

    private loadTrendingPosts() {
        this._postService.getTrendingPosts()
            .subscribe(posts => {
                this.posts = posts;
            })
        ;
    }

    private loadFreshPosts() {
        this._postService.getFreshPosts()
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

    clearText() {
        this.commentText = null;
    }

    addComment(post_id: number) {
        post_id = parseFloat(post_id.toString());
        this._commentService.addComment(post_id, this.commentText);
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
