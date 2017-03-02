import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {
  homePage = HomePage;


}
