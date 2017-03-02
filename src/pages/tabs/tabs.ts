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
import {EditChallengePage} from "../edit-challenge/edit-challenge";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  tab1Root: any = FrontPage;
  tab2Root: any = LoginPage;
  tab3Root: any = SignupPage;
  tab4Root: any = HomePage;
  tab5Root: any = ChallengePage;
  tab6Root: any = EditChallengePage;
  tab7Root: any = UserPage;
  tab8Root: any = ProfilePage;
  tab9Root: any = AboutPage;
  constructor() {

  }
}
