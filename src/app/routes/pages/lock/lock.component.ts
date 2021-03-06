import {Component, Injector, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {

  valForm: FormGroup;
  router: Router;

  constructor(public settings: SettingsService, fb: FormBuilder, public injector: Injector) {

    this.valForm = fb.group({
      'password': [null, Validators.required]
    });

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (const c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      console.log('Valid!');
      console.log(value);
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.router = this.injector.get(Router);
  }

}
