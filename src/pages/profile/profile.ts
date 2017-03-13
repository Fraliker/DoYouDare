import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../services/users"
import {AuthService} from "../../services/auth"
import {User} from "../../models/user"

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
	userId: string
	sameUser: boolean
	
	constructor(public navCtrl: NavController,
	            public navParams: NavParams,
	            private userService: UserService,
	            private authService: AuthService) {
	}
	
	ngOnInit() {
		this.userId = this.navParams.get('userId')
		console.log("Profile page user: "+this.userId)
		this.sameUser  = this.authService.compareUsers(this.userId)
		console.log(this.sameUser)
	}
	//
	// onEditUser() {
	// 	this.navCtrl.push(EditUserPage, {user: this.user})
	// }
	
}
