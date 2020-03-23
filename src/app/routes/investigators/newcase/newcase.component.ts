import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {EcolService} from '../../../services/ecol.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

const WIKI_URL = 'http://localhost:3000/api/tqall/search';
const PARAMS = new HttpParams({
  fromObject: {
    page: '0',
    limit: '10'
  }
});

@Injectable()
export class EcollectService {
  private rows: any;
  constructor(private http: HttpClient) {
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(WIKI_URL, {params: PARAMS.set('searchtext', term)})

      .pipe(map(response => response['rows']));


  }


}


@Component({
  selector: 'app-newcase',
  templateUrl: './newcase.component.html',
  styleUrls: ['./newcase.component.scss'],
  providers: [EcollectService],
})
export class NewcaseComponent implements OnInit {
  constructor(private _service: EcollectService, private ecolService: EcolService, public router: Router,
              private spinner: NgxSpinnerService ) {
  }
  town = ['NAIROBI', 'KISUMU'];
  searching = false;
  searchFailed = false;
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
  newcase: FormGroup;

  search = (text$:  Observable<any>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  ngOnInit() {
    this.formBuilder();
  }

// for the search input
  inputFormatBandListValue(value: any)   {

    if (value.CLIENT_NAME ) {
      return [ 'CUSTNUMBER=>' + value.CUSTNUMBER, 'ACCNUMBER=>' + value.ACCNUMBER, 'CLIENTNAME=>' +  value.CLIENT_NAME ];
    }

    return value;

  }

// results format
  resultFormatBandListValue(value: any) {
    return [value.CUSTNUMBER, value.ACCNUMBER, value.CLIENT_NAME ];
  }



  onSubmit(newcase) {
    this.spinner.show();
    const body = {
      CUSTNUMBER: newcase.value.custnumber,
      ACCNUMBER: newcase.value.accountnumber,
      CUSTNAME: newcase.value.customername,
      ACCBALANCE: newcase.value.accountbalance,
      REASONFORINV: newcase.value.rforinv,
      AROCODE: newcase.value.arocode,
      CANCELCOMMENT: newcase.value.cancelcomment,
      OWNER: newcase.value.owner,
      STAGEDATE: newcase.value.stagedate,
      DATEINPUT: newcase.value.dateinput,
      DUEDATE_EXT: newcase.value.duedatext,
      FEENOTEPAID: newcase.value.feenotepaid,
      PROPERTYNO: newcase.value.propertyno,
      NEWSTATUS: newcase.value.newstatus,
      REGION: newcase.value.filenumber,
      FILENO: newcase.value.filenumber,
      DAYSOVERDUE: newcase.value.filenumber,
      DATEFEENOTE: newcase.value.dateoffeenote,
      FEENOTE: newcase.value.feenote,
      DATEOFSERVICE: newcase.value.dtofsv,
      NOOFDAYSEXT: newcase.value.nofdayext,
      DATEOFEXT: newcase.value.dateofext,
      DUEDATE: newcase.value.duedate,

    };
    console.log(body);
    this.ecolService.newinvestigators(body).subscribe(resp => {
      swal('Success!', 'Entry Added Successfully!', 'success');
      this.spinner.hide();
      newcase.reset(); // clears the form
      this.router.navigate(['/investigators/allcases']);
      // this.getData();

    }, error => {
      console.log(error);
      swal('Eror!', 'Not Successfull!', 'error');
      this.spinner.hide();
    });
  }

  formBuilder() {
    this.newcase = new FormGroup({
      'Search' : new FormControl(null),
      'custnumber' : new FormControl(null, Validators.required),
      'accountnumber' : new FormControl(null, Validators.required),
      'customername' : new FormControl(null, Validators.required),
      'accountbalance' : new FormControl(null, Validators.required),
      'daysoverdue' : new FormControl(null, Validators.required),
      'arocode' : new FormControl(null, Validators.required),
      'cancelcomment' : new FormControl(null, Validators.required),
      'owner' : new FormControl(null, Validators.required),
      'stagedate' : new FormControl(null, Validators.required),
      'dateinput' : new FormControl(null, Validators.required),
      'rforinv' : new FormControl(null, Validators.required),
      'region' : new FormControl(null, Validators.required),
      'propertyno' : new FormControl(null, Validators.required),
      'newstatus' : new FormControl(null, Validators.required),
      'filenumber' : new FormControl(null, Validators.required),
      'duedatext' : new FormControl(null, Validators.required),
      'dateoffeenote' : new FormControl(null, Validators.required),
      'feenote' : new FormControl(null, Validators.required),
      'dtofsv' : new FormControl(null, Validators.required),
      'nofdayext' : new FormControl(null, Validators.required),
      'dateofext' : new FormControl(null, Validators.required),
      'duedate' : new FormControl(null, Validators.required),
      'feenotepaid' : new FormControl(null, Validators.required),
    });
  }

}
