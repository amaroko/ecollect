import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {


  constructor() {
  }

  // buttons
  public singleModel = true;
  public radioModel = 'Middle';
  public checkModel: any = {left: false, middle: true, right: false};

  // pagination/pager
  public totalItems = 64;
  public currentPage = 4;

  public maxSize = 5;
  public bigTotalItems = 175;
  public bigCurrentPage = 1;
  smallnumPages;
  numPages;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  ngOnInit() {
  }

}
