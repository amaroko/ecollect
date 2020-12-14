import {Component, OnInit, ViewChild} from '@angular/core';
import {GridOptions} from '@ag-grid-community/all-modules';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {HttpClient} from '@angular/common/http';
import {EcolService} from '../../../services/ecol.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import swal from 'sweetalert2';
import {CountdownComponent} from 'ngx-countdown';
import {Howl} from 'howler';
import {interval, Observable, pipe} from 'rxjs';
import 'rxjs-compat/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {take} from 'rxjs/operators';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-allreminders',
  templateUrl: './allreminders.component.html',
  styleUrls: ['./allreminders.component.scss']
})
export class AllremindersComponent implements OnInit {
  orderTime = '25-11-2020 15:04:20';
  clock: Observable<any>;
  days$: Observable<any>;
  hours$: Observable<any>;
  minutes$: Observable<any>;
  seconds$: Observable<any>;
  difference: number;
  reminderID: any;
  reminderPriority: any;
  reminderIssue: any;
  reminderScheduleddate: any;
  reminderDescription: any;
  reminderStatus: any;
  submittedby: any;
  accnumber: any;
  reminderacc: any;
  constructor(public ngxSmartModalService: NgxSmartModalService,
              public http: HttpClient, private formBuilder: FormBuilder, private ecolService: EcolService,
              private spinner: NgxSpinnerService) {
    // this.getrem();
    // setInterval(() => {
    //   this.clock = new Date(); // shows clock on header
    // }, 1000);
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.options = {
      data: this.beverageSpending,
      title: {
        text: 'Beverage Expenses',
      },
      subtitle: {
        text: 'per quarter',
      },
      series: [{
        type: 'column',
        xKey: 'beverage',
        yKeys: ['Q1', 'Q2', 'Q3', 'Q4'],
        label: {},
      }],
    };

    this.user = {
      picture: 'assets/img/user/coop.jpg',
      username: this.userdata.USERNAME,
      division: this.userdata.TEAM,
      role: this.userdata.ROLE,
      firstname: this.userdata.FIRSTNAME,
      surname: this.userdata.SURNAME
    };

    this.gridOptions = <GridOptions>{


      // suppressCellSelection: true,


      // domLayout: 'autoHeight',
      rowSelection: 'single',
      rowModelType: 'normal',
      enableCharts: true,
      // rowModelType: 'infinite',

      pagination: true,
      paginationPageSize: 20,

      onGridReady: (params) => {

        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.sizeColumnsToFit();
        // this.gridApi.setDatasource(this.dataSource);
        // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
        this.http
          .get(environment.api + '/api/tqall/reminders?submittedby=' + this.userdata.USERNAME )
          .subscribe(resp => {
            console.log(typeof resp); // to check whether object or array
            this.str = JSON.stringify(resp, null, 4);
            const obj: any = JSON.parse(this.str);

            params.api.setRowData(obj.rows);
            // params.api.refreshCells({force : true});

          });
        // function change() {
        //   params.api.setRowData(data);
        //   gridOptions.api.refreshCells({force : true});
        // }


      }

    };
    // params.data.. this takes the name of the field


    function acValueGetter(params) {
      // const date1 = new Date(params.data.SCHEDULEDATE); // current date
      const date1 = new Date(params.data.SCHEDULEDATE); // current date
      const date2 = new Date(params.data.SUBMITTEDDATE); // mm/dd/yyyy format
      const timeDiff = Math.abs(date1.getTime() - date2.getTime()); // in miliseconds



      return Math.ceil(timeDiff / 1000); // diff btwn sch and submitted

    }







    this.columnDefs = [
      {
        field: 'ACCNUMBER',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
          }
        },
        filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true
      },
      {field: 'PRIORITY', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'ISSUE', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'DESCRIPTION', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'SCHEDULEDATE',  filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'STATUS', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'SUBMITTEDBY', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'SUBMITTEDDATE', filter: 'agTextColumnFilter', valueFormatter: this.dateFormatter,
        filterParams: {newRowsAction: 'keep'}, resizable: true},
      {field: 'TIMEOVER', cellStyle: function(params) {
          if (params.value === 'false') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#aea573'};
          } else {
            return {color: 'white', backgroundColor: '#73ae73'};
          }
        }, filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}, resizable: true},
      // { field: 'ASSIGNEDBY',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#f05050'};
      //     } else {
      //       return null;
      //     }
      //   }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'SERVICEPROVIDER',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#f05050'};
      //     } else {
      //       return null;
      //     }
      //   }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      //
      // // tslint:disable-next-line:max-line-length
      // { field: 'DATEOFINSTR',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#f05050'};
      //     } else {
      //       return null;
      //     }
      //   },  valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // // tslint:disable-next-line:max-line-length
      // { field: 'FOLLOWUPDATE',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#f05050'};
      //     } else {
      //       return null;
      //     }
      //   }, valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'REMARKS',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#ff902b'};
      //     } else {
      //       return null;
      //     }
      //   }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'STATUS',
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#ff902b'};
      //     } else {
      //       return null;
      //     }
      //   }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // // tslint:disable-next-line:max-line-length
      // { field: 'DATERECALLED', valueFormatter: this.dateFormatter,
      //   cellStyle: function(params) {
      //     if (params.value === 'PENDING') {
      //       // if pending return red otherwise continue....
      //       return {color: 'white', backgroundColor: '#ff902b'};
      //     } else {
      //       return null;
      //     }
      //   },  filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'NEWSTATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      // // { field: 'DATERECALLED', valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'LOANSETTLEMENTACC', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'FILENO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'ACCBALANCE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'CANCELCOMMENT', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'REGION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // // tslint:disable-next-line:max-line-length
      // { field: 'STAGEDATE', filter: 'agTextColumnFilter', valueFormatter: this.dateFormatter, filterParams: { newRowsAction: 'keep' }, resizable: true },
      // // tslint:disable-next-line:max-line-length
      // { field: 'DATEINPUT', filter: 'agTextColumnFilter', valueFormatter: this.dateFormatter, filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'OWNER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'TOWN', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // { field: 'ADDRESS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },

    ];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: true,
      pivot: true
    };
    this.sortingOrder = ['asc', 'desc', null];
    this.defaultColDef = {
      width: 120,
      resizable: true,
      sortable: true,
      floatingFilter: true,
      unSortIcon: true,
      suppressResize: false,
      enableRowGroup: true,
      enablePivot: true,
      pivot: true
    };
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left'
        },
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'center'
        },
        {statusPanel: 'agFilteredRowCountComponent'},
        {statusPanel: 'agSelectedRowCountComponent'},
        {statusPanel: 'agAggregationComponent'}
      ]
    };
  }

  get u() {
    return this.assignDebtCollForm.controls;
  }

  get f() {
    return this.updateReminderForm.controls;
  }
  @ViewChild('cd') private countdown: CountdownComponent;
// this
  mbota: any;
  allreasons: any = [];
  rems: any = [];
  remss: any = [];



  beverageSpending = [
    {
      beverage: 'Coffee',
      Q1: 450,
      Q2: 560,
      Q3: 600,
      Q4: 700,
    },
    {
      beverage: 'Tea',
      Q1: 270,
      Q2: 380,
      Q3: 450,
      Q4: 520,
    },
    {
      beverage: 'Milk',
      Q1: 180,
      Q2: 170,
      Q3: 190,
      Q4: 200,
    },
  ];


  public gridApi;
  party: any = [];
  statuses: any = [
    {'STATUS': 'RECALLED'},
    {'STATUS': 'PENDING'},
    {'STATUS': 'PAYING'},
    {'STATUS': 'RETURNED'},
    {'STATUS': 'CLEARED'}
  ];
  public gridColumnApi;
  public gridOptions: GridOptions;
  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  public options: any;
  public sortingOrder;
  assignDebtCollForm: FormGroup;
  updateReminderForm: FormGroup;
  customernumber: string;
  accountnumber: string;
  customername: string;
  assigned: string;
  status: string;
  debtcollectorid: string;
  userdata: any;
  user: any;
  checkrecall: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  username: string;
  searchText: string;
  model: any = {};
  pivotPanelShow = true;
  modules = AllModules;
  private statusBar;
  private str: string;
  info = 40;
  reminvalue: any;
  remin = 0;
  selectedMoment: Date;
  startAt = new Date();

  // remain() {
  //         const date1 = new Date(this.allreasons.SCHEDULEDATE); // current date
  //         const date2 = new Date(); // mm/dd/yyyy format
  //         const timeDiff = Math.abs(date1.getTime() - date2.getTime()); // in miliseconds
  //         const va = Math.ceil(timeDiff / 1000);
  //         this.reminvalue = Math.ceil(timeDiff / 1000);
  //         // in second
  //         // Math.ceil(timeDiff / 1000);
  //         // '<countdown [config]="{leftTime: '+Math.ceil(timeDiff / 1000)+'}"></countdown>'
  //
  //         return Math.ceil(timeDiff / 1000);
  //
  //         // return Math.ceil(timeDiff / 1000);
  //
  //
  // }
  mymodel: any;

  handleEvent(event) {
    if (event.action === 'notify') {
      console.log('Hi!');
    }
    if (event.action === 'done') {
      // swal('Successful!', 'Time has ended!', 'success');
    }
  }

  public ngOnInit(): void {
    // order date in millis (can be computed once)
    const orderDate: number = moment(this.orderTime, 'DD-MM-YYYY HH:mm:ss').valueOf();
    this.clock = Observable

      .interval(1000)
      .map(() => {
        const difference = orderDate - Date.now();
this.difference = difference;
        // if (this.difference < 0) {
        //
        //   swal('Successful!', 'Time has ended!', 'success');
        // }
        return difference;
      })
      .map((millis: number) => {
        return moment.duration(millis);
      });

    // so that calculation is performed once no matter how many subscribers


    this.days$ = this.clock.map(date => date.days());
    this.hours$ = this.clock.map(date => date.hours());
    this.minutes$ = this.clock.map(date => date.minutes());
    this.seconds$ = this.clock.map(date => date.seconds());

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.buildForm();
    this.buildupdateForm();
    this.getparty();
    this.getrem();
    // to convert obj to array to enable iterating
    // this.rem();
  }





  getparty() {
    this.ecolService.getparty1().subscribe(party => {
      this.party = party;
      console.log(party);
    });
  }

  getrem() {
    this.ecolService.getreminders().subscribe(rem => {
      this.rems = rem;
      this.str = JSON.stringify(rem, null, 4);
      const obj: any = JSON.parse(this.str);
      this.remss = obj.rows;
    });
  }
  calculateDiff(sentDate: string | number | Date) {
    const date1: any = new Date(sentDate);
    const date2: any = new Date();
    const diffDays: any = Math.floor((date2 - date1) / (1000));
    return diffDays;
  }

  // formats the dates
  dateFormatter(params) {
    if (moment(params.value).format('DD/MM/YYYY HH:mm:ss') === 'Invalid date') {
      return 'PENDING';
    } else {
      return moment(params.value).format('DD/MM/YYYY HH:mm:ss');
    }

  }

  // changeReason(value) {
  //   if (value === 'RECALLED') {
  //     this.updateDebtCollForm.controls.daterecalled.enable();
  //   } else {
  //     this.updateDebtCollForm.controls.daterecalled.disable();
  //   }
  // }

  openreminderupdateModal() {
    this.ngxSmartModalService.getModal('reminderupdatemodal').open();
  }

  openupdatedebtcollectmodal() {
    this.ngxSmartModalService.getModal('updatedebtcollectmodal').open();
  }

  closereminderupdateModal() {
    this.ngxSmartModalService.getModal('reminderupdatemodal').close();
  }

  closeupdatedebtcollectmodal() {
    this.ngxSmartModalService.getModal('updatedebtcollectmodal').close();
  }

  clickhere() {

    this.openupdatedebtcollectmodal();
  }

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    this.reminderID = this.model.ID;
    this.reminderacc = this.model.ACCNUMBER;
    this.reminderPriority = this.model.PRIORITY;
    this.reminderIssue = this.model.ISSUE;
    this.reminderScheduleddate = this.model.SCHEDULEDATE;
    this.reminderDescription = this.model.DESCRIPTION;
    this.reminderStatus = this.model.STATUS;
    this.submittedby = this.user.username;
    this.openreminderupdateModal();

    // tslint:disable-next-line:max-line-length
    // window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=collections', '_blank');

  }




  onReminderUpdate() {
    // check if logged in
    this.spinner.show();
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    // this.ecolService.loader();

    //
    const body = {
      ID: this.f.reminderID.value,
      // accountnumber: this.f.accountnumber.value,
      ACCNUMBER: this.f.accnumber.value,
      SUBMITTEDBY: this.f.submittedby.value,
      ISSUE: this.f.issue.value,
      DESCRIPTION: this.f.description.value,
      PRIORITY: this.f.priority.value,
      STATUS: this.f.status.value,
      SCHEDULEDATE: formatDate(this.f.scheduledate.value, 'dd-MM-yyyy HH:mm:ss', 'en', '+0300'),
      TIMEOVER: 'false',
      REACHED: 0,
    };
    console.log(body);
    // this.newnotes = this.f.notemade.value;
    // this.editinsurancename = this.insurancename;
    // this.editphysicaladdress = this.physicaladdress;
    // this.editpostaladdress = this.postaladdress;
    // this.editemailaddress = this.emailaddress;
    // this.editcontactperson = this.contactperson;
    //
    this.ecolService.updateReminderData(body).subscribe(data => {
      console.log(data);
      this.closereminderupdateModal();
      this.refresh();
      swal('Successful!', 'Reminder Edited!', 'success');
      this.spinner.hide();
      //
    }, error => {
      console.log(error);
      console.log(body);
      swal('Error!', 'Error occurred during processing!', 'error');
      this.spinner.hide();
    });


  }




  onReminderDelete() {
    // check if logged in
    this.spinner.show();
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    // this.ecolService.loader();

    //
    const body = {
      ID: this.f.reminderID.value,
    };
    console.log(body);
    // this.newnotes = this.f.notemade.value;
    // this.editinsurancename = this.insurancename;
    // this.editphysicaladdress = this.physicaladdress;
    // this.editpostaladdress = this.postaladdress;
    // this.editemailaddress = this.emailaddress;
    // this.editcontactperson = this.contactperson;
    //
    this.ecolService.deleteReminder(body).subscribe(data => {
      console.log(data);
      this.closereminderupdateModal();
      this.refresh();
      swal('Successful!', 'Reminder Deleted!', 'success');
      this.spinner.hide();
      //
    }, error => {
      console.log(error);
      console.log(body);
      swal('Error!', 'Error occurred during processing!', 'error');
      this.spinner.hide();
    });


  }




  onUpdateAccount() {
    // check if logged in
    this.spinner.show();
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    // this.ecolService.loader();

    //
    const body = {
      updatedebtcollid: this.u.updatedebtcollid.value,
      updatecustnumber: this.u.updatecustnumber.value,
      statusupdate: this.u.statusupdate.value,
      updateremarks: this.u.updateremarks.value,
      selectstatus: this.u.selectstatus.value,
      daterecalled: this.u.daterecalled.value,
      updatedby: this.user.username,
    };
    console.log(body);
    this.ecolService.updateaccdebtcollector(body).subscribe(data => {
      console.log(data);
      this.closeupdatedebtcollectmodal();
      this.refresh();
      swal('Successful!', 'Details Updated!', 'success');
      this.spinner.hide();
      //
    }, error => {
      console.log(error);
      console.log(body);
      swal('Error!', 'Error occurred during processing!', 'error');
      this.spinner.hide();
    });


  }


  onEdit() {
    // check if logged in
    this.spinner.show();
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    // this.ecolService.loader();

    //
    const body = {
      debtcollid: this.f.debtcollid.value,
      accountnumber: this.f.accountnumber.value,
      custnumber: this.f.custnumber.value,
      assignedby: this.assigned,
      debtcollector: this.f.debtcollector.value,
      dateofinstr: this.f.dateofinstr.value,
      followupdate: this.f.followupdate.value,
      changedebtcoll: this.f.changedebtcoll.value,
    };
    console.log(body);
    // this.newnotes = this.f.notemade.value;
    // this.editinsurancename = this.insurancename;
    // this.editphysicaladdress = this.physicaladdress;
    // this.editpostaladdress = this.postaladdress;
    // this.editemailaddress = this.emailaddress;
    // this.editcontactperson = this.contactperson;
    //
    this.ecolService.editassigndebtcollector(body).subscribe(data => {
      console.log(data);
      // this.closedebtcollassignModal();
      this.refresh();
      swal('Successful!', 'DebtCollector edited!', 'success');
      this.spinner.hide();
      //
    }, error => {
      console.log(error);
      console.log(body);
      swal('Error!', 'Error occurred during processing!', 'error');
      this.spinner.hide();
    });


  }


  // form for teamleader assign
  buildForm() {
    // get static data

    this.assignDebtCollForm = this.formBuilder.group({
      debtcollid: [{value: this.debtcollectorid, disabled: true}],
      custnumber: [{value: this.customernumber, disabled: true}],
      // accountnumber: [{value: this.accountnumber, disabled: true}, [Validators.required]],
      // customername: [{value: this.customername, disabled: true}],
      // assignedby: [{value: null, disabled: true}],
      debtcollector: [{value: null, disabled: false}, [Validators.required]],
      dateofinstr: [{value: null, disabled: false}, [Validators.required]],
      followupdate: [{value: null, disabled: false}, [Validators.required]],
      changedebtcoll: [{value: null, disabled: false}],
      // status: [{value: null, disabled: false}, [Validators.required]],
    });

  }


  buildupdateForm() {
    // get static data

    this.updateReminderForm = this.formBuilder.group({
      reminderID: [{value: this.reminderID, disabled: true}],
      accnumber: [{value: this.reminderacc, disabled: true}],
      submittedby: [{value: this.user.username, disabled: true}],
      issue: [{value: this.reminderIssue, disabled: false}, [Validators.required]],
      description: [{value: this.reminderDescription, disabled: false}],
      priority: [{value: this.reminderPriority, disabled: false}],
      status: [{value: this.reminderStatus, disabled: false}],
      scheduledate: [{value: this.reminderScheduleddate, disabled: false}],
    });

  }


  refresh() {
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    // this.gridApi.setDatasource(this.dataSource);
    // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
    this.http
      .get(environment.api + '/api/tqall/reminders?submittedby=' + this.userdata.USERNAME)
      .subscribe(resp => {
        console.log(typeof resp); // to check whether object or array
        this.str = JSON.stringify(resp, null, 4);
        const obj: any = JSON.parse(this.str);

        this.gridOptions.api.setRowData(obj.rows);
        this.gridOptions.api.refreshCells({force: true});

      });

  }


  audio() {

    // setTimeout(function () {
    //   const sound = new Howl({
    //     src: 'assets/sound.wav'
    //   });
    //   swal('Successful!', 'Details Updated!', 'success');
    //   sound.play();
    // }, 500);
    const sound = new Howl({
      src: 'assets/sound.wav'

    });

    sound.play();
    swal('Successful!', 'Details Updated!', 'success');
  }




}

