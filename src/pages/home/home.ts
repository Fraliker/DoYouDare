import {Component} from '@angular/core';

import {NavController, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {ChallengePage} from "../challenge/challenge";
import {AuthService} from "../../services/auth";
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {TabsPage} from "../tabs/tabs"

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    challenges: FirebaseListObservable<Challenge[]>


    constructor(public navCtrl: NavController,
                public chService: ChService,
                private popoverCtrl: PopoverController,
                private authService: AuthService,
                private loadingCtrl: LoadingController,
                private af: AngularFire) {
    }

    ionViewWillEnter() {
        this.challenges = this.af.database.list('/challenges')
    }

    onNewCh() {
        this.navCtrl.push(EditChallengePage, {mode: 'New'});
    }

    onLoadCh(challenge: Challenge, index: number) {
        console.log(index)
        this.navCtrl.push(ChallengePage, {challenge: challenge, index: index});
    }
    
    onLoadUser(userId: string) {
        this.navCtrl.push(TabsPage, {userId: userId});
    }
    
    getAvatar() {
        
    }

    // onShowOptions(event: MouseEvent) {
    //     const loading = this.loadingCtrl.create({
    //         content: 'Please wait...'
    //     });
    //     const popover = this.popoverCtrl.create(HOPage);
    //     popover.present({ev: event});
    //     popover.onDidDismiss(
    //         data => {
    //             if (!data) {
    //                 return;
    //             }
    //             if (data.action == 'load') {
    //                 loading.present();
    //                 this.authService.getActiveUser().getToken()
    //                     .then(
    //                         (token: string) => {
    //                             this.chService.fetchList()
    //                                 .subscribe(
    //                                     (list: Challenge[]) => {
    //                                         loading.dismiss();
    //                                         if (list) {
    //                                             this.challenges = list;
    //                                             console.log(this.challenges);
    //                                         } else {
    //                                             this.challenges = []
    //                                         }
    //                                     },
    //                                     error => {
    //                                         loading.dismiss();
    //                                         this.chService.handleError(error.json().error);
    //                                     }
    //                                 )
    //                         }
    //                     )
    //             } else if (data.action == 'store') {
    //                 loading.present();
    //                 this.authService.getActiveUser().getToken()
    //                     .then(
    //                         (token: string) => {
    //                             this.chService.storeList(token)
    //                                 .subscribe(
    //                                     () => loading.dismiss(),
    //                                     error => {
    //                                         loading.dismiss();
    //                                         this.chService.handleError(error.json().error);
    //                                     }
    //                                 )
    //                         }
    //                     )
    //             }
    //         }
    //     )
    // }
}
