import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslatorService} from '../core/translator/translator.service';
import {MenuService} from '../core/menu/menu.service';
import {SharedModule} from '../shared/shared.module';
import {PagesModule} from './pages/pages.module';

import {menu} from './menu';
import {routes} from './routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes), // , {useHash: true}
    PagesModule
  ],
  declarations: [],
  entryComponents: [],
  exports: [
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class RoutesModule {
  constructor(
    public menuService: MenuService,
    tr: TranslatorService
  ) {
    menuService.addMenu(menu);
  }
}
