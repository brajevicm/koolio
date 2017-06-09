import {Component, OnInit} from "@angular/core";
import {PostService} from "app/_services/post.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
        url: 'http://127.0.0.1:80/koolio-api/api/posts/add.php'
    };
    sizeLimit = 2000000;
    model: any = {};
    loading = false;

    constructor(private _postService: PostService,
                private _alertService: AlertService,
                private _router: Router) {
    }

    ngOnInit() {
    }

    handleUpload(data: any): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile: any): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('File is too large');
        }
    }

    addPost() {
        // this.loading = true;
        this._postService.addPost(this.model.title)
        // .subscribe(
        //     data => {
        //         let timer = TimerObservable.create(1000, 500);
        //         timer.subscribe(t => {
        //             this._router.navigate(['/hot']);
        //         });
        //     },
        //     error => {
        //         this._alertService.error(error);
        //         this.loading = false;
        //     }
        // );
    }
}
