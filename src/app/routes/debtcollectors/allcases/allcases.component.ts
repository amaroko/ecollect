import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {NgxSmartModalService} from 'ngx-smart-modal';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {GridOptions} from '@ag-grid-community/all-modules';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EcolService} from '../../../services/ecol.service';
import swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-allcases',
    templateUrl: './allcases.component.html',
    styleUrls: ['./allcases.component.scss']
})
export class AllCasesComponent implements OnInit {


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
  private statusBar;
  public gridOptions: GridOptions;
  public columnDefs;
  public defaultColDef;
  public rowModelType;
  public cacheBlockSize;
  public maxBlocksInCache;
  public rowData: [];
  public sortingOrder;
  assignDebtCollForm: FormGroup;
  updateDebtCollForm: FormGroup;
  private str: string;
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

  constructor(public ngxSmartModalService: NgxSmartModalService,
               public http: HttpClient, private formBuilder: FormBuilder, private ecolService: EcolService,
              private spinner: NgxSpinnerService ) {
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
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
          .get(environment.api + '/api/tqall/debtcollectors')
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


    this.columnDefs = [
      { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      {
        field: 'ACCNUMBER',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
          }
        },
        filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
      },
      { field: 'CUSTNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'AROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ASSIGNEDBY',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#f05050'};
          } else {
            return null;
          }
        }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'SERVICEPROVIDER',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#f05050'};
          } else {
            return null;
          }
        }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },

      // tslint:disable-next-line:max-line-length
      { field: 'DATEOFINSTR',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#f05050'};
          } else {
            return null;
          }
        },  valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // tslint:disable-next-line:max-line-length
      { field: 'FOLLOWUPDATE',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#f05050'};
          } else {
            return null;
          }
        }, valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'REMARKS',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#ff902b'};
          } else {
            return null;
          }
        }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'STATUS',
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#ff902b'};
          } else {
            return null;
          }
        }, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // tslint:disable-next-line:max-line-length
      { field: 'DATERECALLED', valueFormatter: this.dateFormatter,
        cellStyle: function(params) {
          if (params.value === 'PENDING') {
            // if pending return red otherwise continue....
            return {color: 'white', backgroundColor: '#ff902b'};
          } else {
            return null;
          }
        },  filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'NEWSTATUS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // tslint:disable-next-line:max-line-length
      // { field: 'DATERECALLED', valueFormatter: this.dateFormatter, filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'LOANSETTLEMENTACC', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'FILENO', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ACCBALANCE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'CANCELCOMMENT', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'REGION', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      // tslint:disable-next-line:max-line-length
      { field: 'STAGEDATE', filter: 'agTextColumnFilter', valueFormatter: this.dateFormatter, filterParams: { newRowsAction: 'keep' }, resizable: true },
      // tslint:disable-next-line:max-line-length
      { field: 'DATEINPUT', filter: 'agTextColumnFilter', valueFormatter: this.dateFormatter, filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'OWNER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'TOWN', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
      { field: 'ADDRESS', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },

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
    this.sortingOrder = ['desc', 'asc', null ];
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



  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.buildForm();
    this.buildupdateForm();
    this.getparty();
  }

  getparty() {
    this.ecolService.getparty1().subscribe(party => {
      this.party = party;
      console.log(party);
    });
  }
  // formats the dates
  dateFormatter(params) {
    if (moment(params.value).format('MM/DD/YYYY') === 'Invalid date') {
      return 'PENDING';
    } else {
      return moment(params.value).format('MM/DD/YYYY');
    }

  }

  changeReason(value) {
    if (value === 'RECALLED') {
      this.updateDebtCollForm.controls.daterecalled.enable();
    } else {
      this.updateDebtCollForm.controls.daterecalled.disable();
    }
  }

  opendebtcollassignModal() {
    this.ngxSmartModalService.getModal('debtcollectmodal').open();
  }

  openupdatedebtcollectmodal() {
    this.ngxSmartModalService.getModal('updatedebtcollectmodal').open();
  }

  closedebtcollassignModal() {
    this.ngxSmartModalService.getModal('debtcollectmodal').close();
  }

  closeupdatedebtcollectmodal() {
    this.ngxSmartModalService.getModal('updatedebtcollectmodal').close();
  }

  clickhere() {
this.closedebtcollassignModal();
this.openupdatedebtcollectmodal();
  }

  get f() {
    return this.assignDebtCollForm.controls;
  }

  get u() {
    return this.updateDebtCollForm.controls;
  }

  onRowDoubleClicked(event: any) {
    this.model = event.node.data;
    this.debtcollectorid = this.model.ID;
    this.customernumber = this.model.CUSTNUMBER;
    this.accountnumber = this.model.ACCNUMBER;
    this.customername = this.model.CUSTNAME;
    this.status = this.model.ASSIGNEDBY;
    this.assigned = this.user.username;

    console.log(this.status);

    // tslint:disable-next-line:max-line-length
    // window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=collections', '_blank');

    if (this.user.role === 'teamleader') {
      this.opendebtcollassignModal();
    } else {
      this.openupdatedebtcollectmodal();
    }
  }


  onAssign() {
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
      // accountnumber: this.f.accountnumber.value,
      custnumber: this.f.custnumber.value,
      assignedby: this.assigned,
      debtcollector: this.f.debtcollector.value,
      dateofinstr: this.f.dateofinstr.value,
      followupdate: this.f.followupdate.value,
    };
    console.log(body);
    // this.newnotes = this.f.notemade.value;
    // this.editinsurancename = this.insurancename;
    // this.editphysicaladdress = this.physicaladdress;
    // this.editpostaladdress = this.postaladdress;
    // this.editemailaddress = this.emailaddress;
    // this.editcontactperson = this.contactperson;
    //
      this.ecolService.assigndebtcollector(body).subscribe(data => {
        console.log(data);
        this.closedebtcollassignModal();
        this.refresh();
        swal('Successful!', 'DebtCollector assigned!', 'success');
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
      this.closedebtcollassignModal();
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

    this.updateDebtCollForm = this.formBuilder.group({
      updatedebtcollid: [{value: this.debtcollectorid, disabled: true}],
      updatecustnumber: [{value: this.customernumber, disabled: true}],
      updateremarks: [{value: null, disabled: false}, [Validators.required]],
      selectstatus: [{value: null, disabled: false}, [Validators.required]],
      statusupdate: [{value: null, disabled: false}],
      daterecalled: [{value: null, disabled: false}],
    });

  }


  refresh() {
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
    // this.gridApi.setDatasource(this.dataSource);
    // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
    this.http
      .get(environment.api + '/api/tqall/debtcollectors')
      .subscribe(resp => {
        console.log(typeof resp); // to check whether object or array
        this.str = JSON.stringify(resp, null, 4);
        const obj: any = JSON.parse(this.str);

        this.gridOptions.api.setRowData(obj.rows);
        this.gridOptions.api.refreshCells({force: true});

      });

  }

}
