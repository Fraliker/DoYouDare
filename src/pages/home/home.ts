import {Component} from '@angular/core';

import {NavController, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import {Challenge} from "../../models/ch";
import {EditChallengePage} from "../edit-challenge/edit-challenge";
import {ChService} from "../../services/challenges";
import {ChallengePage} from "../challenge/challenge";
import {HOPage} from "./home-options/home-options";
import {AuthService} from "../../services/auth";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // list of challenges
    challenges: Challenge[];


    constructor(public navCtrl: NavController,
                public chService: ChService,
                private popoverCtrl: PopoverController,
                private authService: AuthService,
                private loadingCtrl: LoadingController,) {
    }

    ionViewWillEnter() {
        this.challenges = this.chService.getCh();
        console.log(this.challenges);

        this.chService.fetchList()
            .subscribe(
                (list: Challenge[]) => {
                    if (list) {
                        this.challenges = list;
                        console.log(this.challenges);
                    } else {
                        this.challenges = []
                    }
                },
                error => {
                    this.chService.handleError(error.json().error);
                }
            )

    }


    onNewCh() {
        this.navCtrl.push(EditChallengePage, {mode: 'New'});
    }

    onLoadCh(challenge: Challenge, index: number) {
        this.navCtrl.push(ChallengePage, {challenge: challenge, index: index});
    }

    onShowOptions(event: MouseEvent) {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        const popover = this.popoverCtrl.create(HOPage);
        popover.present({ev: event});
        popover.onDidDismiss(
            data => {
                if (!data) {
                    return;
                }
                if (data.action == 'load') {
                    loading.present();
                    this.authService.getActiveUser().getToken()
                        .then(
                            (token: string) => {
                                this.chService.fetchList()
                                    .subscribe(
                                        (list: Challenge[]) => {
                                            loading.dismiss();
                                            if (list) {
                                                this.challenges = list;
                                                console.log(this.challenges);
                                            } else {
                                                this.challenges = []
                                            }
                                        },
                                        error => {
                                            loading.dismiss();
                                            this.chService.handleError(error.json().error);
                                        }
                                    )
                            }
                        )
                } else if (data.action == 'store') {
                    loading.present();
                    this.authService.getActiveUser().getToken()
                        .then(
                            (token: string) => {
                                this.chService.storeList(token)
                                    .subscribe(
                                        () => loading.dismiss(),
                                        error => {
                                            loading.dismiss();
                                            this.chService.handleError(error.json().error);
                                        }
                                    )
                            }
                        )
                }
            }
        )
    }
}
