import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {ChallengePage} from "../challenge/challenge";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  // list of challenges
  challenges: Challenge[];


  constructor(public navCtrl: NavController, public chService: ChService) {

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

}
