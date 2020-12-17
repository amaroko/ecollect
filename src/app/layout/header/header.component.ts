import {Component, OnInit, ViewChild} from '@angular/core';
import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {MenuService} from '../../core/menu/menu.service';
import {EcolService} from '../../services/ecol.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {DataService} from '../../services/data.service';
import {pipe} from 'rxjs';
import {ToasterService, ToasterConfig, Toast, BodyOutputType} from 'angular2-toaster';
import {formatDate} from '@angular/common';
import {SafeHtml} from '@angular/platform-browser';

const screenfull = require('screenfull');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navCollapsed = true; // for horizontal layout
  menuItems = []; // for horizontal layout
  nu_of_alerts = 4;
  nu_of_brokenptps = 0;
  nu_of_demandsdue = 0;
  nu_of_overdue = 0;
  nu_of_cc_demands = 0;
  totalCases = 0;
  userdata: any;
  userperm: any;
  reminder: number;
  user: any;
  totalBrokenPtps: any;
  str: string;
  str1: string;
  str2: string;
  time: any;
  time2: any;
  clock;
  int;
  submittedby: string;
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': false, 'success': true },
      tapToDismiss: false,
      preventDuplicates: true,
      newestOnTop: true,
      timeout: 0,
      positionClass: 'toast-top-right',
      animation: 'flyLeft',
      limit: 7
      // closeHtml: '<button class="btn btn-danger">Close</button>'
    });

  isNavSearchVisible: boolean;
  @ViewChild('fsbutton') fsbutton;  // the fullscreen button
  remalerts: any;
  remID: any;
  reminderalert: any;
  remAccount: any;
  remDescp: any;
  reminderID: any;

  constructor(
    public menu: MenuService,
    public userblockService: UserblockService,
    public settings: SettingsService,
    public ecolService: EcolService,
    public dataService: DataService,
    public ngxsmartModalService: NgxSmartModalService,
    public toasterService: ToasterService,
    public router: Router) {

    // show only a few items on demo
    this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
    // get notifications
    // ptps, overdue and demand letters
    // this.getnotification();

    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userperm = JSON.parse(localStorage.getItem('userpermission'));
    // loops through alerts....xperimental

    this.int = setInterval(() => {
      this.clock = new Date(); // shows clock on header
      this.getGreetings();  // greeting text
      this.getUnreadReminders(this.userdata.USERNAME);
      this.getreminderalerts(this.userdata.USERNAME);


    }, 1000);    // sync counter with database in realtime

    this.user = {
      picture: 'assets/img/user/coop.jpg',
      username: this.userdata.USERNAME,
      division: this.userdata.TEAM,
      role: this.userdata.ROLE,
      firstname: this.userdata.FIRSTNAME,
      surname: this.userdata.SURNAME
    };

    dataService.getReminderData().subscribe(data => {
      this.reminder = data;
      console.log(data);

    });

    dataService.getReminderalert().subscribe(data => {
      this.reminderalert = data;
      console.log(data);
    });

  }

  ngOnInit() {
    this.getbrokenptps(); // gets count of broken ptps
    this.getcardlettersdue(); // gets count of demand letters due for creditcards
    this.lettersdue();
    this.getGreetings();




    this.isNavSearchVisible = false;

    const ua = window.navigator.userAgent;
    if (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv\:11\./)) { // Not supported under IE
      this.fsbutton.nativeElement.style.display = 'none';
    }

    // Switch fullscreen icon indicator
    /*const el = this.fsbutton.nativeElement.firstElementChild;
    screenfull.on('change', () => {
        if (el) {
            el.className = screenfull.isFullscreen ? 'fa fa-compress' : 'fa fa-expand';
        }
    });*/

  }

  getGreetings() {
    const data = [
        [0, 11, 'Good Morning'],          // Store messages in an array
        [12, 16, 'Good Afternoon'],
        [17, 24, 'Good Evening']
      ],
      hr = new Date().getHours();

    for (let i = 0; i < data.length; i++) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        this.time = JSON.stringify(data[i][2]);
        this.time2 = JSON.parse(this.time);

        // console.log(JSON.parse(this.time));
      }
    }
  }

  toggleUserBlock(event) {
    event.preventDefault();
    this.userblockService.toggleVisibility();
  }

  openNavSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setNavSearchVisible(true);
  }

  getbrokenptps() {
    this.ecolService.getbrokenptps().subscribe((data: any) => {

      this.str = JSON.stringify(data, null, 4);

      const obj: any = JSON.parse(this.str);
      this.totalBrokenPtps = obj.data[0].TOTAL;
      // console.log(typeof obj.data[0].TOTAL);

    }, error => {
      console.log(error);
    });
  }

  lettersdue() {
    this.ecolService.lettersdue().subscribe((data: any) => {
      this.str2 = JSON.stringify(data, null, 4);

      const obj1: any = JSON.parse(this.str2);
      this.nu_of_demandsdue = obj1.data[0].TOTALVIEWALL;

    }, error => {
      console.log(error);
    });
  }


  getcardlettersdue() {
    this.ecolService.totalcarddue().subscribe((data: any) => {
      this.str1 = JSON.stringify(data, null, 4);

      const obj1: any = JSON.parse(this.str1);
      this.nu_of_cc_demands = obj1.data[0].TOTALVIEWALL;

    }, error => {
      console.log(error);
    });
  }

  setNavSearchVisible(stat: boolean) {
    // console.log(stat);
    this.isNavSearchVisible = stat;
  }

  getNavSearchVisible() {
    return this.isNavSearchVisible;
  }

  toggleOffsidebar() {
    this.settings.toggleLayoutSetting('offsidebarOpen');
  }

  toggleCollapsedSideabar() {
    this.settings.toggleLayoutSetting('isCollapsed');
  }

  isCollapsedText() {
    return this.settings.getLayoutSetting('isCollapsedText');
  }

  toggleFullScreen(event) {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  openworkflows() {
    window.open(environment.workflow);
  }

  opentimeoutModal() {
    this.ngxsmartModalService.getModal('lockModal').open();
    localStorage.setItem('timeout', '1');
  }

  openreminderModal() {
    this.ngxsmartModalService.getModal('reminderModal').open();

  }

  logout() {
    swal({
      title: (this.user.firstname).toUpperCase() + ', are you sure?',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'You want to logout!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
        this.ecolService.logout();
        clearInterval(this.int); // to prevent the callback of ngx smart modal on login page
        this.router.navigate(['/login']);
        localStorage.removeItem('useralerted');
        sessionStorage.removeItem('useralerted');
      }
    });
  }
  popsuccessToast(msg, id) {

    const toast: Toast = {
      type: 'success',
      title: 'Hello, ' + this.userdata.USERNAME,
      body: msg,
      bodyOutputType: BodyOutputType.TrustedHtml,
      onHideCallback: () => this.ecolService.reminderReadTracker(id).subscribe(data => {
console.log('deleted succesfully');

      }, error => {
        console.log('not working');
      })
    };
    this.toasterService.pop(toast);



  }

  poperrorToast(error) {
    this.toasterService.pop('error', 'Error', error);

  }

  popinfoToast(info) {
    this.toasterService.pop('info', 'Info', info);

  }

  getUnreadReminders(submittedby) {
    this.ecolService.unreadreminders(submittedby).subscribe(data => {

      this.reminder = data.length;
      if (data.length > 0 && !localStorage.getItem('useralerted')) {
        // this.openreminderModal();
        this.popsuccessToast('You have New reminders That you Missed', this.reminder);

        localStorage.setItem('useralerted', '1');
        sessionStorage.setItem('useralerted', '1');
      }


    });
  }

 // looping through alerts...experimental
  getreminderalerts(submittedby) {

    this.ecolService.unreadreminders(submittedby).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.remID = data[i].ID;
        this.remAccount = data[i].ACCNUMBER;
        this.remDescp = data[i].DESCRIPTION;





        const toast: Toast = {
          type: 'success',
          title: 'Hello, ' + this.userdata.USERNAME,
          body: 'New Reminder on Account ' + '<b style="color: yellow">' + this.remAccount + '</b>' + '<br>' + this.remDescp,
          bodyOutputType: BodyOutputType.TrustedHtml,
          onHideCallback: () => {
            const body = {
              ID: data[i].ID,
            };
            this.ecolService.reminderReadTracker(body).subscribe(res => {
              console.log(body);
              // swal('Successful!', 'Success!', 'success');
              //
            }, error => {
              console.log(error);
              // swal('Error!', 'Error occurred during processing!', 'error');
            });

          }
        };




        // this.remID = data[0].ID;
        console.log(this.remID);
        this.toasterService.pop(toast);

// if (data.length > 0) {
//   this.popsuccessToast('This is Reminder Alerts' + this.remID);
// }
      }
      }
    );
  }

  getId(id) {
    this.ecolService.reminderReadTracker(id).subscribe(res => {
      this.reminderID = res;
      console.log('deleted succesfully');
      console.log(this.remID);

    }, error => {
      console.log('not working');

      console.log(this.reminderID);
      console.log(typeof this.remID);
    });

  }


}
