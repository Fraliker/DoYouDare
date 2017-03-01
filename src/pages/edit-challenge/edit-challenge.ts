import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";


@Component({
    selector: 'page-edit-challenge',
    templateUrl: 'edit-challenge.html'
})
export class EditChallengePage implements OnInit {
    mode = 'New';
    selectOptions = ['Easy', 'Medium', 'Hard']
    chForm: FormGroup;

    constructor(public navParams: NavParams) {

    }

    ngOnInit() {
        this.mode = this.navParams.get('mode'); //assign value from previous page
        this.initializeForm();
    }

    onSubmit() {
        console.log(this.chForm);
    }

    private initializeForm() {
        this.chForm = new FormGroup({
            'title': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
            'difficulty': new FormControl('Medium', Validators.required)
        });
    }
}
