import {Component, OnInit} from '@angular/core';
import {EcolService} from '../../../services/ecol.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {Howl} from 'howler';
import * as moment from 'moment';
import {now} from 'moment';
import {formatDate } from '@angular/common';


@Component({
  selector: 'app-newreminders',
  templateUrl: './newreminders.component.html',
  styleUrls: ['./newreminders.component.scss']
})
export class NewremindersComponent implements OnInit {
  currentDate: moment.Moment = moment();
  currentTime: string = moment().format('M/D/YYYY hh:mm:ss a');
  startDate: moment.Moment = moment('10/27/2020, 4:30 PM');
  humanized: string;
  seconds: number;
  rows: [];
  model: any = [];
  CLIENT_NAME: any;
  custnumber: any;
  CUSTNUMBER?: any;
  SETTLEACCNO: any;
  FILENO: any;
  REGION: any;
  ADDRESSLINE1: any;
  MANAGER: any;
  COLOFFICER: any;
  ACTIONDATE: any;
  value: any;
  customernumber: any;
  accountnumber: any;
  loansettlementacc: any;
  customername: any;
  region: any;
  void: any;
  ACCNUMBER: any;
  first: any;
  submitted = false;
  newreminder: FormGroup;
  user: any;
  userdata: any = [];
  username: string;
  selectedMoment: Date;
  // today = moment.utc(new Date(), 'YYYY-MM-DD HH:mm').local();
  // today: Date = new Date(); endDate: Date = new Date('September 14, 2020 13:22:40');
  // intervalId = setInterval(this.(text), 10000);
  // endDate = moment.utc(this.selectedMoment, 'YYYY-MM-DD HH:mm').local();
  // moment.utc(this.selectedMoment, 'MM-DD-YYYY').local().format("YYYY-MM-DD HH:mm")
  today = moment();
  endDate = moment(this.selectedMoment);
  pop;
  startAt = new Date();
  date: any;


  constructor(private ecolService: EcolService, public router: Router,
              private spinner: NgxSpinnerService,  ) {

    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.user = {
      picture: 'assets/img/user/coop.jpg',
      username: this.userdata.USERNAME,
      division: this.userdata.TEAM,
      role: this.userdata.ROLE,
      firstname: this.userdata.FIRSTNAME,
      surname: this.userdata.SURNAME
    };
    this.humanized = moment.duration(moment().diff(this.endDate)).humanize();
    this.seconds = moment().diff(this.endDate, 'seconds');
    console.log(this.endDate);
  }



  ngOnInit() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = this.user.username;
    console.log(this.username);

    this.formBuilder();
  }



  onSubmit(newreminder) {
    this.spinner.show();
    const body = {
      ACCNUMBER: newreminder.value.accnumber,
      PRIORITY: newreminder.value.priority,
      ISSUE: newreminder.value.issue,
      DESCRIPTION: newreminder.value.description,
      // SCHEDULEDATE: newreminder.value.scheduledate,

      SCHEDULEDATE: formatDate(newreminder.value.scheduledate, 'dd-MM-yyyy HH:mm:ss', 'en', '+0300'),
      // format('MMMM Do YYYY, h:mm:ss a')

      STATUS: newreminder.value.status,
      SUBMITTEDBY: this.user.username,

    };
    console.log(body);
    this.ecolService.newreminder(body).subscribe(resp => {
      swal('Success!', 'Reminder added successfully', 'success');
      this.spinner.hide();
      newreminder.reset(); // clears the form
      this.router.navigate(['/reminders/allreminders']);
      // this.getData();

    }, error => {
      console.log(error);
      swal('Eror!', 'Not successfull!', 'error');
      this.spinner.hide();
    });
  }

  formBuilder() {
    this.newreminder = new FormGroup({
      'accnumber': new FormControl(null),
      'priority': new FormControl(null, Validators.required),
      'issue': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'scheduledate': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'submittedby': new FormControl({value: this.user.username, disabled: true})
    });
  }

  audio() {
    const sound = new Howl({
      src: 'assets/sound.wav'
    });

    sound.play();

  }

  getDataDiff(startDate, endDate) {
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }


}
