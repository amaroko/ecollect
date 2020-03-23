import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSelectModule} from 'ngx-select-ex';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import {DataService} from '../../services/data.service';
import {CustomFormsModule} from 'ng2-validation';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {ExtloginComponent} from './extletters/extlogin.component';
import {RegisterComponent} from './register/register.component';
import {RecoverComponent} from './recover/recover.component';
import {LockComponent} from './lock/lock.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {Error404Component} from './error404/error404.component';
import {SendLetterccComponent} from './actionscc/sendlettercc.component';

import {SendLetterComponent} from './actions/sendletter.component';
import {MultipleptpComponent} from './multipleptp/multipleptp.component';
import {FileUploadModule} from 'ng2-file-upload';
import {ActivityLogComponent} from './activitylog/activitylog.component';
import {ActivityActionComponent} from './activitylog/activityaction/activityaction.component';
import {ActivityHomeComponent} from './activitylog/activityhome/activityhome.component';
import {AccPlanComponent} from './activitylog/accplan/accplan.component';
import {CustContactsComponent} from './activitylog/custcontacts/custcontacts.component';
import {DemandLettersComponent} from './activitylog/demandletters/demandletters.component';
import {SmsComponent} from './activitylog/sms/sms.component';
import {NotesComponent} from './activitylog/notes/notes.component';
import {FilesComponent} from './activitylog/files/files.component';
import {GuarantorsComponent} from './activitylog/guarantors/guarantors.component';
import {BulknotesComponent} from './activitylog/bulknotes/bulknotes.component';
import {CollateralsComponent} from './activitylog/collaterals/collaterals.component';
import {ActivitydashComponent} from './activitydash/activitydash.component';
import {EditnoteComponent} from './activitylog/editnote/editnote.component';
import {PtpsComponent} from './activitylog/ptps/ptps.component';
import {WriteoffstoryComponent} from './activitylog/writeoffstory/writeoffstory.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {DatePipe} from '@angular/common';
import {AgGridModule} from "@ag-grid-community/angular";


/* Use this routes definition in case you want to make them lazy-loaded */

/*const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
];*/

@NgModule({

  imports: [
    SharedModule,
    FileUploadModule,
    NgbModule,
    NgxSelectModule,
    FormsModule,
    NgSelectModule,
    ToasterModule.forRoot(),
    // CustomFormsModule,
    BsDatepickerModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    NgxPaginationModule,
    AgGridModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    LockComponent,
    MaintenanceComponent,
    Error404Component,
    SendLetterccComponent,
    SendLetterComponent,
    MultipleptpComponent,
    ActivityLogComponent,
    ActivityActionComponent,
    ActivityHomeComponent,
    AccPlanComponent,
    CustContactsComponent,
    DemandLettersComponent,
    SmsComponent,
    NotesComponent,
    FilesComponent,
    GuarantorsComponent,
    BulknotesComponent,
    CollateralsComponent,
    ActivitydashComponent,
    EditnoteComponent,
    PtpsComponent,
    ExtloginComponent,
    WriteoffstoryComponent
  ],
  providers: [
    ToasterService,
    DataService,
    DatePipe
  ],
  exports: [
    RouterModule,
    LoginComponent,
    RegisterComponent,
    RecoverComponent,
    LockComponent,
    MaintenanceComponent,
    Error404Component,
    SendLetterccComponent,
    SendLetterComponent,
    MultipleptpComponent,
    AccPlanComponent,
    CustContactsComponent,
    DemandLettersComponent,
    SmsComponent,
    NotesComponent,
    FilesComponent,
    GuarantorsComponent,
    BulknotesComponent,
    CollateralsComponent,
    ActivitydashComponent,
    EditnoteComponent,
    PtpsComponent,
    ExtloginComponent,
    WriteoffstoryComponent
  ],
})
export class PagesModule {
}
