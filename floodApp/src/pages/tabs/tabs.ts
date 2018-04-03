import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SearchPage } from '../search/search';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SearchPage;
  tab2Root = MapPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
