import {Component, OnInit} from "@angular/core";

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

    constructor() {
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
}
