import {Component, OnInit} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular'
import {Challenge} from "../../models/ch"
import {EditChallengePage} from "../edit-challenge/edit-challenge"
import {ChService} from "../../services/challenges"
import {HomePage} from "../home/home"
import {AuthService} from "../../services/auth"

@Component({
    selector: 'page-challenge',
    templateUrl: 'challenge.html'
})
export class ChallengePage implements OnInit {
    challenge: Challenge
    sameUser: boolean

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private chService: ChService,
                private authService: AuthService) {    }



    ngOnInit() {
        this.challenge = this.navParams.get('challenge')
        this.sameUser = this.authService.compareUsers(this.challenge.userId)
        console.log(this.sameUser)
    }

    onEditCh() {
        this.navCtrl.push(EditChallengePage, {mode: 'Edit', challenge: this.challenge})
    }

    onDeleteCh() {
        this.chService.removeCh(this.challenge.$key)
        this.navCtrl.popToRoot()
    }


}
