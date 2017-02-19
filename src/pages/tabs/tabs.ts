import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {ChallengePage} from "../challenge/challenge";
import {FrontPage} from "../front/front";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";
import {SignupPage} from "../signup/signup";
import {UserPage} from "../user/user";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ChallengePage;
  tab4Root: any = FrontPage;
  tab5Root: any = LoginPage;
  tab6Root: any = ProfilePage;
  tab7Root: any = SignupPage;
  tab8Root: any = UserPage;

  constructor() {

  }
}
