import {Injectable} from '@angular/core';

const themeA = require('../../shared/styles/themes/theme-a.scss');
const themeB = require('../../shared/styles/themes/theme-b.scss');
const themeC = require('../../shared/styles/themes/theme-c.scss');
const themeD = require('../../shared/styles/themes/theme-d.scss');
const themeE = require('../../shared/styles/themes/theme-e.scss');
const themeF = require('../../shared/styles/themes/theme-f.scss');
const themeG = require('../../shared/styles/themes/theme-g.scss');
const themeH = require('../../shared/styles/themes/theme-h.scss');

@Injectable()
export class ThemesService {

  styleTag: any;
  defaultTheme = 'A';
  myShows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  show: string;

  constructor() {
    // this.show = this.myShows[Math.floor(Math.random() * this.myShows.length)];
    this.show = this.defaultTheme;
    this.createStyle();
    // this.setTheme(this.defaultTheme);
    this.setTheme(this.show);
  }

  setTheme(name) {
    switch (name) {
      case 'A':
        this.injectStylesheet(themeA);
        break;
      case 'B':
        this.injectStylesheet(themeB);
        break;
      case 'C':
        this.injectStylesheet(themeC);
        break;
      case 'D':
        this.injectStylesheet(themeD);
        break;
      case 'E':
        this.injectStylesheet(themeE);
        break;
      case 'F':
        this.injectStylesheet(themeF);
        break;
      case 'G':
        this.injectStylesheet(themeG);
        break;
      case 'H':
        this.injectStylesheet(themeH);
        break;
    }
  }

  injectStylesheet(css) {
    this.styleTag.innerHTML = css;
  }

  getDefaultTheme() {
    return this.defaultTheme;
  }

  private createStyle() {
    const head = document.head || document.getElementsByTagName('head')[0];
    this.styleTag = document.createElement('style');
    this.styleTag.type = 'text/css';
    this.styleTag.id = 'appthemes';
    head.appendChild(this.styleTag);
  }

}
