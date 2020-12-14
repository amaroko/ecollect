/* tslint:disable:no-unused-variable */

import {TestBed} from '@angular/core/testing';

import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {MenuService} from '../../core/menu/menu.service';

describe('Component: Header', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService, UserblockService, SettingsService]
    }).compileComponents();
  });


});
