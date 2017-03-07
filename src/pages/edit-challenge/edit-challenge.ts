import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ChService} from "../../services/challenges";
import {HomePage} from "../home/home";
import {Challenge} from "../../models/ch";
import {AuthService} from "../../services/auth";


@Component({
    selector: 'page-edit-challenge',
    templateUrl: 'edit-challenge.html'
})
export class EditChallengePage implements OnInit {
    mode = 'New';
    selectOptions = ['Easy', 'Medium', 'Hard'];
    chForm: FormGroup;
    challenge: Challenge;
    index: number;
    userId: string;


    constructor(public navParams: NavParams,
                private chService: ChService,
    private navCtrl: NavController,
    private authService: AuthService) {

    }

    ngOnInit() {
        this.mode = this.navParams.get('mode'); //assign value from previous page
        if (this.mode == 'Edit') {
            this.challenge = this.navParams.get('challenge');
            this.index = this.navParams.get('index');
        }
        this.userId = this.authService.getActiveUser().uid;
        this.initializeForm();
    }

    onSubmit() {
        const value = this.chForm.value;
        if (this.mode == 'Edit') {
            this.chService.editCh(this.index, value.title, value.description, value.difficulty, value.img, this.userId);
        } else {

            this.authService.getActiveUser().getToken()
                .then(
                    (token: string) => {
                        this.chService.addCh(token, value.title, value.description, value.difficulty, value.img, this.userId)
                            .subscribe(
                                () => console.log("Challenge added to FireBase"),
                                error => {
                                    this.chService.handleError(error.json().error);
                                }
                            )
                    }
                )
        }

        this.chForm.reset();
        this.navCtrl.push(HomePage);
    }

    private initializeForm() {
        let title = null;
        let description = null;
        let difficulty = 'Medium';
        let img = null;

        if (this.mode == 'Edit') {
            title = this.challenge.title;
            description = this.challenge.description;
            difficulty = this.challenge.difficulty;
            img = this.challenge.img;
        }
        this.chForm = new FormGroup({
            'title': new FormControl(title, Validators.required),
            'description': new FormControl(description, Validators.required),
            'difficulty': new FormControl(difficulty, Validators.required),
            'img': new FormControl(img, Validators.required)
        });
    }
}
