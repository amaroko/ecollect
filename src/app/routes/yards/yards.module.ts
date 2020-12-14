import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {SharedModule} from '../../shared/shared.module';
import {NewcaseComponent} from './newcase/newcase.component';
import {AllCasesComponent} from './allcases/allcases.component';
import {AgGridModule} from '@ag-grid-community/angular';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '', redirectTo: 'allcases'},
  {path: 'newcase', component: NewcaseComponent},
  {path: 'allcases', component: AllCasesComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AgGridModule,
    NgbTypeaheadModule
  ],
  declarations: [
    AllCasesComponent,
    NewcaseComponent
  ],
  exports: [
    RouterModule
  ]
})
export class YardsModule {
}
