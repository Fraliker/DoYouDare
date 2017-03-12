import {Component, ViewChild} from '@angular/core'
import {Platform, NavController, MenuController} from 'ionic-angular'
import { StatusBar, Splashscreen } from 'ionic-native'

import {LoginPage} from "../pages/login/login"
import {SignupPage} from "../pages/signup/signup"
import {AuthService} from "../services/auth"
import {HomePage} from "../pages/home/home"

import firebase from 'firebase/app'
import {ProfilePage} from "../pages/profile/profile"
import {AboutPage} from "../pages/about/about"

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage
  loginPage = LoginPage
  signupPage = SignupPage
  profilePage = ProfilePage
  aboutPage = AboutPage
  isAuthenticated = false
  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, private menuCtrl: MenuController,
  private authService: AuthService) {
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true
        this.rootPage = HomePage
        console.log("home as root")
      } else {
        this.isAuthenticated = false;
        this.rootPage = this.signupPage
        
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
