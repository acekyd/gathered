import { Component } from '@angular/core';

import { GroupsPage } from '../groups/groups';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MorePage } from '../more/more';

@Component({
  selector: 'tool-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupsPage;
  tab3Root = ContactPage;
  tab4Root = MorePage;

  constructor() {

  }
}
