import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-demand2',
  templateUrl: './demand2.component.html',
  styleUrls: ['./demand2.component.scss']
})
export class Demand2Component implements OnInit {

  model: any = {};
  demands: any;
  constructor(private ecolService: EcolService) { }

  ngOnInit() {
  }

  Search(accnumber) {
    this.ecolService.loader();
    this.ecolService.getdemandshistory(accnumber.value).subscribe(data => {
      if (data.length > 0) {
        this.demands = data;
        swal('Successful!', 'Historical letters generated!', 'success');
      } else {
        this.demands = [];
        swal('Warning!', 'No demand Letter was found!', 'warning');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Error occurred letter generation!', 'error');
    });
  }

}
