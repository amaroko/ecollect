import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  lat = 33.790807;
  lng = -117.835734;
  zoom = 14;
  scrollwheel = false;

  constructor() {
  }

  ngOnInit() {
  }

}
