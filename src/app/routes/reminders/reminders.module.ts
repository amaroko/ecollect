import {NgModule} from '@angular/core';
import {AllremindersComponent} from './allreminders/allreminders.component';
import {NewremindersComponent} from './newreminders/newreminders.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AgGridModule} from '@ag-grid-community/angular';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDatepickerModule, TooltipModule} from 'ngx-bootstrap';
import {AgChartsAngularModule} from 'ag-charts-angular';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { CountdownModule } from 'ngx-countdown';


const routes: Routes = [
  {path: '', redirectTo: 'allreminders'},
  {path: 'newreminders', component: NewremindersComponent},
  {path: 'allreminders', component: AllremindersComponent}
];

@NgModule({
  declarations: [AllremindersComponent, NewremindersComponent],
    imports: [
        CommonModule, RouterModule.forChild(routes), AgGridModule, NgxSmartModalModule, OwlDateTimeModule,
        OwlNativeDateTimeModule,
        CountdownModule,
        ReactiveFormsModule, NgSelectModule, NgxSpinnerModule, NgbTypeaheadModule,
      BsDatepickerModule, AgChartsAngularModule, FormsModule,  TooltipModule,
    ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RemindersModule {
}
