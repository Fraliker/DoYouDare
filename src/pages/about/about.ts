import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/users"

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit  {
 private userId: any
  constructor(public navCtrl: NavController,
              private userService: UserService,
              public navParams: NavParams,) {
    
  }
  
  ngOnInit() {
     // this.userId = this.navParams.get('userId')
    this.userId = "rkCIxy9O4TN6KoK2P56MCyEDxMj1"
    console.log("Userid from app.comp"+this.userId)
    this.userService.editUser("rkCIxy9O4TN6KoK2P56MCyEDxMj1", "2", "3", "3", "5", "6", "6", "6", "7", "6")
    // this.userService.bioUser(this.userId, 'bananas')
    }
  
}
