import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import {FrontPage} from "../pages/front/front";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";
import {HomePage} from "../pages/home/home";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
//  rootPage = FrontPage;
  rootPage: any = FrontPage;
  loginPage = LoginPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuCtrl: MenuController,
  private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyDqK9M31J_8xR0RU3yIN524zqpZtIboh7M",
      authDomain: "do-you-dare-bc9e4.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = HomePage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SignupPage);
  }
}
