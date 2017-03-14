import {Component} from '@angular/core';

import {NavController, PopoverController, LoadingController, AlertController} from 'ionic-angular';
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
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private challenges: FirebaseListObservable<Challenge[]>
    private user: any
    private data: any
    private sort: boolean = false
    private currentUser: string

    constructor(public navCtrl: NavController,
                public chService: ChService,
                private popoverCtrl: PopoverController,
                private authService: AuthService,
                private loadingCtrl: LoadingController,
                private af: AngularFire) {
        // this.currentUser = this.authService.getActiveUser().uid
    }

    ionViewWillEnter() {
        this.challenges = this.af.database.list('/challenges').map((array) => array.reverse()) as FirebaseListObservable<Challenge[]>
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
    onSort() {
        if (this.sort === false) {
            this.challenges = this.af.database.list('/challenges', {
                query: {
                    orderByChild: 'title',
                }
            })
            this.sort = true
        } else {
            this.challenges = this.af.database.list('/challenges', {
                query: {
                    orderByKey: true,
                }
            }).map((array) => array.reverse()) as FirebaseListObservable<Challenge[]>
            this.sort = false
        }
    }
    
//     onLike($key: string, userId: string) {
//         console.log($key+''+userId)
//     this.chService.likeCh($key, userId)
// }
    
    // getItems(ev: any) {
    //     let val = ev.target.value;
    //     this.challenges = this.af.database.list('/challenges', {
    //         query: {
    //             orderByChild: 'title',
    //             equalTo: val,
    //         }
    //     })
    // }
    
    getAvatar(userId) {
        this.user = this.af.database.object('/users/' + userId)
        console.log(this.user)
        // this.user = this.af.database.object('/users/').$ref.child(userId)
        // this.user.subscribe(user => {
        //     this.data = user
        //     console.log(this.data.img)
        //     // return this.data.img
        //     return true
        //
        // })
        // console.log(this.data.img)
        
        // return "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"
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
