import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Challenge} from "../../services/challenge.interface";
import challenges from "../../services/challenges";
import {EditChallengePage} from "../edit-challenge/edit-challenge";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  // list of challenges
  chCollection: {}[];


  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.chCollection = challenges;
  }

  onNewChallenge() {
    this.navCtrl.push(EditChallengePage, {mode: 'New'});
  }

}
