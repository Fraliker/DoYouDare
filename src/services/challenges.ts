import {Challenge} from "../models/ch";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx'
import {AlertController} from "ionic-angular";
import {FirebaseListObservable, AngularFire} from "angularfire2"
import auth = firebase.auth

@Injectable()
export class ChService {
	// private challenges: Challenge[] = [];
	challenges: FirebaseListObservable<Challenge[]>
	
	constructor(private http: Http,
	            private authService: AuthService,
	            private alertCtrl: AlertController,
	            private af: AngularFire) {
		this.challenges = af.database.list('/challenges');
		
	}
	
	// addCh(token: string, title: string, description: string, difficulty: string, img: string, userId: string) {
	//     return this.http
	//         .post('https://do-you-dare-bc9e4.firebaseio.com/challenges.json?auth=' + token, new Challenge(title, description, difficulty, img, userId))
	//
	// }
	addCh(title: string, description: string, difficulty: string, userId: string) {
		return this.challenges.push({title, description, difficulty, userId})
		
	}
	
	getCh() {
		//console.log("got challenges");
		//console.log(this.challenges);
		return this.challenges;
	}
	
	editCh($key: string, title: string, description: string, difficulty: string, img: string, userId: string) {
		// this.challenges.update($key, {$key: $key,title: title, description: description, difficulty: difficulty, img: img, userId: userId);
		this.challenges.update($key, {title, description, difficulty, img, userId})
		console.log($key)
	}
	
	removeCh(key: string) {
		this.challenges.remove(key)
	}
	
	// storeList(token: string) {
	// 	// const userId = this.authService.getActiveUser().uid;
	// 	console.log('https://do-you-dare-bc9e4.firebaseio.com/challenges.json?auth=' + token);
	// 	return this.http
	// 		.put('https://do-you-dare-bc9e4.firebaseio.com/challenges.json?auth=' + token, this.challenges)
	// 		.map((response: Response) => {
	// 			return response.json();
	// 		});
	// }
	//
	// fetchList() {
	// 	//const userId = this.authService.getActiveUser().uid;
	// 	return this.http
	// 		.get('https://do-you-dare-bc9e4.firebaseio.com/challenges.json')
	// 		.map((response: Response) => {
	// 			return response.json();
	// 		})
	// 		.do((data) => {
	// 			this.challenges = data
	// 			console.log(this.challenges)
	// 		})
	// }
	//
	// handleError(errorMessage: string) {
	// 	const alert = this.alertCtrl.create({
	// 		title: 'An error occurred!',
	// 		message: errorMessage,
	// 		buttons: ['Ok']
	// 	});
	// 	alert.present();
	// }
}
