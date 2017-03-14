import {Component} from '@angular/core';

import {NavController, PopoverController, LoadingController, AlertController, NavParams} from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {ChallengePage} from "../challenge/challenge";
import {AuthService} from "../../services/auth";
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {TabsPage} from "../tabs/tabs"
import {Subject} from "rxjs/Subject"
import 'rxjs/Rx'


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private challenges: FirebaseListObservable<Challenge[]>
  private user: any
  private data: any
  private sort: boolean = false
  private currentUser: string
  private userId: any
  
  constructor(public navCtrl: NavController,
              public chService: ChService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private af: AngularFire,
              public navParams: NavParams,) {
    // this.currentUser = this.authService.getActiveUser().uid
  }
  
  
  ionViewWillEnter() {
    this.userId = this.navParams.get('userId')
    console.log("this user is"+this.userId)
    this.challenges = this.af.database.list('/challenges', {
      query: {
        orderByChild: 'userId',
        equalTo: this.userId
      }
    })
  }
  
  
  onLoadCh(challenge: Challenge, index: number) {
    console.log(index)
    this.navCtrl.push(ChallengePage, {challenge: challenge, index: index});
  }
  
  onLoadUser(userId: string) {
    this.navCtrl.push(TabsPage, {userId: userId});
  }
  // onSort() {
  //   if (this.sort === false) {
  //     this.challenges = this.af.database.list('/challenges', {
  //       query: {
  //         orderByChild: 'title',
  //       }
  //     })
  //     this.sort = true
  //   } else {
  //     this.challenges = this.af.database.list('/challenges', {
  //       query: {
  //         orderByKey: true,
  //       }
  //     }).map((array) => array.reverse()) as FirebaseListObservable<Challenge[]>
  //     this.sort = false
  //   }
  // }

}
