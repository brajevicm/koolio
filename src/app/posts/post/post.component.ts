import {Component, OnInit} from "@angular/core";
import {IPost} from "../../_models/post";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../_services/post.service";
import {AlertService} from "../../_services/alert.service";
import {CommentService} from "../../_services/comment.service";
import {IComment} from "../../_models/comment";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'page',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    post: IPost;
    comments: IComment[];
    upvoted = false;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _commentService: CommentService,
                private _postService: PostService,
                private _alertService: AlertService,
                private _title: Title) {
    }

    ngOnInit() {
        this.sub = this._route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    this.getPost(id);
                    this.getComments(id);
                    this.checkIfUpvoted();
                }
            )
        ;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnChanges() {
        // if (this.post) {
        //     this.setTitle("Koolio | " + this.post.title);
        // }
    }

    getPost(id: number) {
        this._postService.getPost(id)
            .subscribe(
                post => this.post = post,
                error => this._alertService.error(error),
            );
    }

    getComments(id: number) {
        this._commentService.getPostComments(id)
            .subscribe(
                comments => this.comments = comments,
                error => this._alertService.error(error)
            );
    }

    upvote() {
        this.upvoted = true;
    }

    nextPost() {

    }

    checkIfUpvoted() {

    }

    public setTitle(newTitle: string) {
        return this._title.setTitle(newTitle);
    }

}
