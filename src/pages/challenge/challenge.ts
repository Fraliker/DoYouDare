import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-challenge',
  templateUrl: 'challenge.html'
})
export class ChallengePage implements OnInit{
challenge: Challenge;
index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chService: ChService,) {}

  ngOnInit() {
  this.challenge = this.navParams.get('challenge');
    this.index = this.navParams.get('index');
  }

  onEditCh() {
    this.navCtrl.push(EditChallengePage, {mode: 'Edit', challenge: this.challenge, index: this.index})
  }

  onDeleteCh() {
    this.chService.removeCh(this.index);
    this.navCtrl.push(HomePage);
  }

}
