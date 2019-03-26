import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;

@Component({
  selector: 'app-collaterals',
  templateUrl: './collaterals.component.html',
  styleUrls: ['./collaterals.component.scss']
})
export class CollateralsComponent implements OnInit {

  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  collaterals: any = [];
  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
    //
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
      this.model.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
      this.model.custnumber = queryParams.get('custnumber');
    });

    // get guarantors history
    this.getGuarantors(this.accnumber);
  }

  onSubmit(form) {
    // Loading indictor
    this.ecolService.loader();
    //
   const body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active
    };
    this.ecolService.submitGuarantor(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
      this.getGuarantors(this.accnumber);
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getGuarantors(accnumber) {
    this.ecolService.guarantordetails(accnumber).subscribe(data => {
      this.collaterals = data;
    }, error => {
      console.log(error);
    });
  }

  reset() {
    console.log('please!!!');
  }

}

