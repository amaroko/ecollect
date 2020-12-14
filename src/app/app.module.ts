import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// import { NgHttpLoaderModule } from 'ng-http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {BnNgIdleService} from 'bn-ng-idle';
import {AppComponent} from './app.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {NgxSpinnerModule} from 'ngx-spinner';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {license} from '../../env';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import '@ag-grid-enterprise/all-modules';
import {AgChartsAngularModule} from 'ag-charts-angular';
import { NgDatepickerModule } from 'ng2-datepicker';
// License goes here please....
import {LicenseManager} from '@ag-grid-enterprise/all-modules';
import { CountdownModule } from 'ngx-countdown';
const MY_NATIVE_FORMATS = {
  // fullPickerInput: {
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric'
  // },
  fullPickerInput: 'YYYY-MM-DD HH:mm:ss',
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric', second: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};


LicenseManager.setLicenseKey(license.value);

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CountdownModule,
    // NgHttpLoaderModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule, // required for ng2-tag-input.
    CoreModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LayoutModule,
    SharedModule.forRoot(),
    RoutesModule,
    NgbModule,
    AgChartsAngularModule,
    SlimLoadingBarModule,
    NgxSmartModalModule.forRoot(),
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [BnNgIdleService, {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS}, ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
