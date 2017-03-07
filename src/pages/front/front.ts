import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HomePage} from "../home/home";
import {Challenge} from "../../models/ch";
import {ChService} from "../../services/challenges";

@Component({
    selector: 'page-front',
    templateUrl: 'front.html'
})
export class FrontPage {
    homePage = HomePage;
    challenges: Challenge[];



    constructor(public chService: ChService,
                public navCtrl: NavController) {
    }

    ionViewDidEnter() {
        this.navCtrl.push(HomePage);
        //     this.chService.fetchList()
        //         .subscribe(
        //             (list: Challenge[]) => {
        //                 if (list) {
        //                     this.challenges = list;
        //                     console.log("Challenges from fetch subscribe at FrontPage");
        //                     this.chService.getCh();
        //
        //                 } else {
        //                     this.challenges = []
        //                 }
        //             },
        //             error => {
        //                 this.chService.handleError(error.json().error);
        //             }
        //         )
        // }
    }
}
