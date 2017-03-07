import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {LoadingController, AlertController} from "ionic-angular";


@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	
	constructor(private authService: AuthService,
	            private loadingCtrl: LoadingController,
	            private alertCtrl: AlertController,
	            private _auth: AuthService) {
	}
	signInWithFacebook(): void {
		this._auth.signInWithFacebook()
			.then(() => this.onSignInSuccess());
	}
	
	private onSignInSuccess(): void {
		console.log("Facebook display name ",this._auth.displayName());
	}
	
	
	
	
	onLogin(form: NgForm) {
		const loading = this.loadingCtrl.create({
			content: 'Signing you in...'
		});
		loading.present();
		this.authService.signin(form.value.email, form.value.password)
			.then(data => {
				loading.dismiss();
			})
			.catch(error => {
				loading.dismiss();
				const alert = this.alertCtrl.create({
					title: 'Signing failed!',
					message: error.message,
					buttons: ['Ok']
				});
				alert.present();
			})
	}
	
}
