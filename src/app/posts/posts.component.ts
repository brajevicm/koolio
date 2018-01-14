import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { IPost } from '../_models/post';
import { IUser } from '../_models/user';
import { CommentService } from '../_services/comment.service';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';

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
  offset = 0;

  constructor(private _postService: PostService,
              private _userService: UserService,
              private _commentService: CommentService,
              private _alertService: AlertService,
              private _sharedService: SharedService,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.currentUser = JSON.parse(_sharedService.getToken());
  }

  ngOnInit() {
    this.loadAllTopCommentedPosts();
    // if (this._router.url == '/hot') {
    this.initUser();
    this.initHotPosts();
    // }
    // } else if (this._router.url == '/trending') {
    //     this.initUser();
    //     this.loadTrendingPosts();
    // } else if (this._router.url == '/fresh') {
    //     this.initUser();
    //     this.loadFreshPosts();
    // }
  }

  onScrollDown() {
    this.offset += 4;
    this.loadHotPosts(this.offset);
  }

  // onScrollUp() {
  //     this.offset -= 2;
  //     this.loadHotPosts(this.offset);
  // }

  private initUser() {
    if (this.currentUser) {
      this.getUser();
    }
  }

  // @TODO fix id
  private getUser() {
    const id = 1; // fake id
    return this._userService.getUser(id)
      .subscribe(
        user => this.user = user,
        error => this._alertService.error(error)
      );
  }

  private initHotPosts() {
    this._postService.getHotPosts(this.offset)
      .subscribe(posts => {
        this.posts = posts;
      })
    ;
  }

  private loadHotPosts(offset: number) {
    this._postService.getHotPosts(offset)
      .subscribe(posts => {
        posts.map(p => {
          return {
            id: p.id,
            user_id: p.user_id,
            user: p.user,
            flag_id: p.flag_id,
            title: p.title,
            image: p.image,
            timestamp: p.timestamp,
            upvotes: p.upvotes,
            comments: p.comments,
            upvoted: p.upvoted,
            isActivePost: p.isActivePost,
            isActiveComment: p.isActiveComment,
            isActiveCommentBox: p.isActiveCommentBox,
            isActiveReport: p.isActiveReport,
            isActiveRemove: p.isActiveRemove,
            reports: p.reports,
            reported: p.reported
          };
        }).forEach(item => this.posts.push(item));
      });
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
