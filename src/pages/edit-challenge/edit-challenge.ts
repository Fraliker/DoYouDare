import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ChService} from "../../services/challenges";
import {HomePage} from "../home/home";


@Component({
    selector: 'page-edit-challenge',
    templateUrl: 'edit-challenge.html'
})
export class EditChallengePage implements OnInit {
    mode = 'New';
    selectOptions = ['Easy', 'Medium', 'Hard']
    chForm: FormGroup;

    constructor(public navParams: NavParams,
                private chService: ChService,
    private navCtrl: NavController) {

    }

    ngOnInit() {
        this.mode = this.navParams.get('mode'); //assign value from previous page
        this.initializeForm();
    }

    onSubmit() {
        const value = this.chForm.value;
        this.chService.addCh(value.title, value.description, value.difficulty)
        this.chForm.reset();
        this.navCtrl.popTo(HomePage);
    }

    private initializeForm() {
        this.chForm = new FormGroup({
            'title': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
            'difficulty': new FormControl('Medium', Validators.required)
        });
    }
}
