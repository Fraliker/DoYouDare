import {Component} from '@angular/core';

import {NavController, PopoverController} from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {ChallengePage} from "../challenge/challenge";
import {HOPage} from "./home-options/home-options";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  // list of challenges
  challenges: Challenge[];


  constructor(public navCtrl: NavController,
              public chService: ChService,
              private popoverCtrl: PopoverController
  ) {

  }
  ionViewWillEnter() {
    this.challenges = this.chService.getCh()
}



  onNewCh() {
    this.navCtrl.push(EditChallengePage, {mode: 'New'});
  }
  onLoadCh(challenge: Challenge, index: number) {
    this.navCtrl.push(ChallengePage, {challenge: challenge, index: index});
  }
  onShowOptions(event: MouseEvent){
    const popover = this.popoverCtrl.create(HOPage);
    popover.present({ev: event});
  }

}
