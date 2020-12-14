import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../../core/settings/settings.service';
import {ActivatedRoute} from '@angular/router';
import {EcolService} from '../../../../services/ecol.service';
import swal from 'sweetalert2';
import {environment} from '../../../../../environments/environment';
import * as introJs from 'intro.js/intro.js';
const URL = environment.valor;

@Component({
  selector: 'app-collaterals',
  templateUrl: './collaterals.component.html',
  styleUrls: ['./collaterals.component.scss']
})
export class CollateralsComponent implements OnInit {
  introJS = introJs();
  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  collaterals: any = [];
  edit = false;

  //
  constructor(public settings: SettingsService,
              private route: ActivatedRoute,
              private ecolService: EcolService) {
    //
  }


  CollateralsSteps(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#collateraltable',
            intro: 'Here you will find a list of all collaterals placed under the specified account ' +
              'you could then edit the collaterals if need be'
          }
          // {
          //   element: '#custnumber',
          //   intro: 'This is the 7 digit number of the customer'
          // }
          // {
          //   element: '#smsmessage',
          //   intro: 'This is where you can view the selected message template. As well as edit the message if you feel so. ' +
          //     'Keep in much that you are limited to the amount of characters that you type'
          // },
          // {
          //   element: '#callback',
          //   intro: 'Here you can put the number to which the customer can call for enquiries. You can also leave it as default'
          // },
          // {
          //   element: '#sendsms',
          //   intro: 'Pressing this button will send the message to the selected customer phone number'
          // },
          // {
          //   element: '#historysms',
          //   intro: 'Here is where the history of sent sms can be viewed in a listed format'
          // }

        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true
      })
      .start();
  }

  CollateralsSteps2(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#custnumber',
            intro: 'This is the 7 digit customer number. You can only view it'
          },
          {
            element: '#accnumber',
            intro: 'This is the 14 digit number of the customer. You can only view it'
          },
          {
            element: '#collateralname',
            intro: 'Here, you have to provide the Name of the Collateral that you are about to add'
          },
          {
            element: '#regowner',
            intro: 'Here, you have to enter the details of the registered owners of the collateral ' +
              'at hand'
          },
          {
            element: '#forcedsale',
            intro: 'This is the value that the bank has decided to place on the collateral'
          },
          {
            element: '#marketvalue',
            intro: 'This is the Marked Market value of the collateral'
          },
          {
            element: '#insurancevalue',
            intro: 'This is the specified insurance value of the collateral'
          },
          {
            element: '#valuationdate',
            intro: 'This is the date on which the collaterals was valued'
          },
          {
            element: '#tenure',
            intro: 'This is the tenure of the collateral'
          },
          {
            element: '#valuer',
            intro: 'This is the details of the valuer who valuated the collateral at hand'
          },
          {
            element: '#collateralsubmit',
            intro: 'Pressing this button will submit your information to the server. If disabled, please check ' +
              'to see if there is a field you left out'
          },
          {
            element: '#collateralreset',
            intro: 'Pressing this button will reset your form to empty,so that you may start filling the ' +
              'information again'
          }

        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true
      })
      .start();
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
    this.getCollateral(this.custnumber);
  }

  onSubmit(form) {
    // Loading indictor
    this.ecolService.loader();
    //
    const body = {
      regowner: form.value.regowner,
      collateralname: form.value.collateralname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      colofficer: this.username,
      forcedsale: form.value.forcedsale,
      insurancevalue: form.value.insurancevalue,
      marketvalue: form.value.marketvalue,
      tenure: form.value.tenure,
      valuationdate: form.value.valuationdate,
      valuer: form.value.valuer
    };
    this.ecolService.submitCollateral(body).subscribe(data => {
      swal('Successful!', 'saved successfully!', 'success');
      this.getCollateral(this.accnumber);
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred during processing!', 'error');
    });
  }

  getCollateral(custnumber) {
    this.ecolService.retrieveCollateral(custnumber).subscribe(data => {
      this.collaterals = data;
    }, error => {
      console.log(error);
    });
  }

  reset() {
    this.model.regowner = '';
    this.model.collateralname = '';
    this.model.forcedsale = '';
    this.model.insurancevalue = '';
    this.model.marketvalue = '';
    this.model.tenure = '';
    this.model.valuationdate = '';
    this.model.valuer = '';
  }

  cancel() {
    this.edit = false;
    this.reset();
  }

  updatecollateral(form) {
    // save to db
    this.ecolService.updateCollateral(this.model.id, form).subscribe(response => {
      swal(
        'Good!',
        'Collateral updated!',
        'success'
      );
      this.getCollateral(this.custnumber);
    }, error => {
      console.log(error);
      swal(
        'Ooops!',
        'Contact Not updated!',
        'error'
      );
    });
  }

  editcollateral(collateral) {
    this.model.id = collateral.id;
    this.model.regowner = collateral.regowner;
    this.model.collateralname = collateral.collateralname;
    this.model.accnumber = collateral.accnumber;
    this.model.custnumber = collateral.custnumber;
    this.model.forcedsale = collateral.forcedsale;
    this.model.insurancevalue = collateral.insurancevalue;
    this.model.marketvalue = collateral.marketvalue;
    this.model.tenure = collateral.tenure;
    this.model.valuationdate = collateral.valuationdate;
    this.model.valuer = collateral.valuer;
    //
    this.edit = true;
  }

}

