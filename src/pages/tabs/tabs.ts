import { Component } from '@angular/core';

import { GroupsPage } from '../groups/groups';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupsPage;
  tab3Root = ContactPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
