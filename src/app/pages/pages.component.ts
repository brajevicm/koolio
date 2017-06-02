import {Component, OnInit} from "@angular/core";
import {PostService} from "../_services/post.service";
import {IPost} from "../_models/post";

@Component({
    selector: 'pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
    posts: IPost[];

    constructor(private _postService: PostService) {
    }

    ngOnInit() {
        this.loadAllPosts();
    }

    private loadAllPosts() {
        this._postService.getFilteredPosts()
            .subscribe(posts => {
                this.posts = posts;
            });
    }

}
