import {Component, OnInit} from '@angular/core'
import { ContactPage } from '../contact/contact'
import {ProfilePage} from "../profile/profile"
import {UserPage} from "../user/user"
import {ListPage} from "../list/list"
import {AuthService} from "../../services/auth"
import {UserService} from "../../services/users"
import {NavParams, NavController} from "ionic-angular"

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  tab1Root: any = ProfilePage
  tab2Root: any = ListPage
  tab3Root: any = ListPage
  tab4Root: any = ListPage
  userId: string
  sameUser: boolean
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService,
              private authService: AuthService) {
  }
  
  ngOnInit() {
    this.userId = this.navParams.get('userId')
    this.sameUser  = this.authService.compareUsers(this.userId)
    console.log(this.sameUser)
  }
}
