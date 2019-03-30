import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../../core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../../services/ecol.service';
import { environment } from '../../../../../environments/environment';

const URL = environment.valor;


@Component({
  selector: 'app-activityhome',
  templateUrl: './activityhome.component.html',
  styleUrls: ['./activityhome.component.scss']
})
export class ActivityHomeComponent implements OnInit {

  accnumber: string;
  custnumber: string;
  nationid: any;
  username: string;
  model: any = {};
  date = new Date();
  account: any;
  sys: string;
  loader = true;
  cards: any = [];
  ptps: any = [];
  otheraccs: any = [];
  collaterals: any = [];
  directors: any = [];
  accwithid: any = [];

  constructor(public settings: SettingsService,
    private route: ActivatedRoute,
    private ecolService: EcolService) {
  }

  ngOnInit() {
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.nationid = this.route.snapshot.queryParamMap.get('nationid');
    this.route.queryParamMap.subscribe(queryParams => {
      this.nationid = queryParams.get('nationid');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });


    // get account details
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }

  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      this.loader = false;
    });
  }

  beforeChange(active) {
    const tab: string = active.nextId;
    switch (tab) {
      case 'ngb-tab-0': {
        // console.log("accountinfo");
        break;
      }
      case 'ngb-tab-1': {
        this.loadptps(this.accnumber);
        break;
      }
      case 'ngb-tab-2': {
        this.loadother(this.custnumber);
        break;
      }
      case 'ngb-tab-3': {
        this.loadcollateral(this.accnumber);
        break;
      }
      case 'ngb-tab-4': {
        this.loaddirectors(this.accnumber);
        break;
      }
      case 'ngb-tab-5': {
        this.loadcards(this.nationid);
        break;
      }
      case 'ngb-tab-6': {
        this.loadaccwithid(this.nationid);
        break;
      }
      default: {
        console.log('Invalid choice');
        break;
      }
    }
  }

  loadother(custnumber) {
    this.loader = true;
    this.ecolService.otheraccs(custnumber).subscribe(data => {
      this.otheraccs = data;
      this.loader = false;
    }, error => {
      console.log('loadother error ==>', error);
      alert('unable to retrieve otheraccs');
      this.loader = false;
    });
  }

  loadcollateral(accnumber) {
    this.loader = true;
    this.ecolService.collaterals(accnumber).subscribe(data => {
      this.collaterals = data;
      this.loader = false;
    }, error => {
      console.log('directors error ==>', error);
      alert('unable to retrieve collaterals');
      this.loader = false;
    });
  }

  loaddirectors(accnumber) {
    this.loader = true;
    this.ecolService.directors(accnumber).subscribe(data => {
      this.directors = data;
      this.loader = false;
    }, error => {
      console.log('directors error ==>', error);
      alert('unable to retrieve directors');
      this.loader = false;
    });
  }

  loadaccwithid(nationid) {
    this.loader = true;
    this.ecolService.accwithid(nationid).subscribe(data => {
      this.accwithid = data;
      this.loader = false;
    }, error => {
      console.log('accwithid error ==>', error);
      alert('unable to retrieve accwithid');
      this.loader = false;
    });
  }

  loadptps(accnumber) {
    this.loader = true;
    this.ecolService.ptps(accnumber).subscribe(data => {
      this.ptps = data;
      this.loader = false;
    }, error => {
      console.log('loadcards error ==>', error);
      alert('unable to retrieve ptps');
      this.loader = false;
    });
  }

  loadcards(nationid) {
    this.loader = true;
    this.ecolService.getcardwithid(nationid).subscribe(data => {
      this.cards = data;
      this.loader = false;
    }, error => {
      console.log('loadcards error ==>', error);
      alert('unable to retrieve cards');
      this.loader = false;
    });
  }
}
