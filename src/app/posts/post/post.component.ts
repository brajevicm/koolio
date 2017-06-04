import {Component, OnInit} from "@angular/core";
import {IPost} from "../../_models/post";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../_services/post.service";
import {AlertService} from "../../_services/alert.service";

@Component({
    selector: 'page',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    post: IPost;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _postService: PostService,
                private _alertService: AlertService) {
    }

    ngOnInit() {
        this.sub = this._route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    this.getPost(id);
                }
            );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getPost(id: number) {
        this._postService.getPost(id)
            .subscribe(
                post => this.post = post,
                error => this._alertService.error(error)
            );
    }

}
