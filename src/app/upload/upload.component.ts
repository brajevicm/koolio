import {Component, EventEmitter, OnInit} from "@angular/core";
import {humanizeBytes, UploadFile, UploadInput, UploadOutput} from "ngx-uploader";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {PostService} from "../_services/post.service";

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
    model: any = {};
    loading = false;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    constructor(private _postService: PostService,
                private _alertService: AlertService,
                private _router: Router) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit() {
    }

    onUploadOutput(output: UploadOutput): void {
        // console.log(output); // lets output to see what's going on in the console

        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
            // const event: UploadInput = {
            //   type: 'uploadAll',
            //   url: '/upload',
            //   method: 'POST',
            //   data: { foo: 'bar' },
            //   concurrency: 0
            // };
            // this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue') {
            this.files.push(output.file); // add file to array when added
        } else if (output.type === 'uploading') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') { // drag over event
            this.dragOver = true;
        } else if (output.type === 'dragOut') { // drag out event
            this.dragOver = false;
        } else if (output.type === 'drop') { // on drop event
            this.dragOver = false;
        }
    }

    startUpload(): void {  // manually start uploading
        const event: UploadInput = {
            type: 'uploadAll',
            url: 'http://127.0.0.1:80/koolio-api/api/posts/add.php',
            method: 'POST',
            headers: {token: localStorage.getItem('currentUser')},
            data: {title: this.model.title},
            concurrency: 1
        };

        this.uploadInput.emit(event);
        this.loading = true;
    }

    cancelUpload(id: string): void {
        this.uploadInput.emit({type: 'cancel', id: id});
    }

    addPost() {
        this.startUpload();
    }
}
