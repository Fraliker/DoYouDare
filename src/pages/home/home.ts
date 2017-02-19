import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Challenge} from "../../data/challenge.interface";
import challenges from "../../data/challenges";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  chCollection: {}[];


  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.chCollection = challenges;
  }

}
