import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor() {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
  }

}
