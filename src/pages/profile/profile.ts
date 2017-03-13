import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/users"
import {AuthService} from "../../services/auth"
import {User} from "../../models/user"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {FormGroup, FormControl, Validators} from "@angular/forms"
import {Camera} from "ionic-native"
import firebase from 'firebase'
import {ProfileEditPage} from "../profile-edit/profile-edit"

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	userId: string
	sameUser: boolean
	user: any
	data:any
	
	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private userService: UserService,
	            private authService: AuthService,
	            private af: AngularFire) {
	}
	
	ionViewWillEnter() {
		console.log("Profile params: " + this.navParams)
		this.userId = this.navParams.get('userId')
		console.log("Profile page user: " + this.userId)
		this.user = this.af.database.object('/users/' + this.userId)
		this.user.subscribe(user => {
				this.data = user
		})
		this.sameUser = this.authService.compareUsers(this.userId)
		console.log(this.sameUser)
	}
	onEditProfile() {
		console.log("passing stuff to user-edit "+this.data.name)
		this.navCtrl.push(ProfileEditPage, {data: this.data});
	}
}
