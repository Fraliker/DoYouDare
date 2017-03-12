import { Component } from '@angular/core'
import { ContactPage } from '../contact/contact'
import {ProfilePage} from "../profile/profile"
import {UserPage} from "../user/user"
import {ListPage} from "../list/list"

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ProfilePage
  tab2Root: any = ListPage
  tab3Root: any = ListPage
  tab4Root: any = ListPage
  constructor() {

  }
}
