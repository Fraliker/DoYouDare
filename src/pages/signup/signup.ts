import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {LoadingController, AlertController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login"
import {UserService} from "../../services/users"


@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {
	loginPage = LoginPage
	
	constructor(private authService: AuthService,
	            private loadingCtrl: LoadingController,
	            private alertCtrl: AlertController,
	            private navCtrl: NavController,
	            private userService: UserService,) {
	}
	
	onSignup(form: NgForm) {
		const loading = this.loadingCtrl.create({
			content: 'Signing you up...'
		});
		this.authService.signup(form.value.email, form.value.password)
			.then(data => {
				console.log("new user uid"+data.uid)
				this.userService.addUser(data.uid, form.value.name)
				loading.dismiss();
				this.navCtrl.popToRoot()
			})
			.catch(error => {
				loading.dismiss();
				const alert = this.alertCtrl.create({
					title: 'Signup failed!',
					message: error.message,
					buttons: ['Ok']
				});
				alert.present();
			})
	}
}
