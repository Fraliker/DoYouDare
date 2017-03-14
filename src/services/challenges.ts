import {Challenge} from "../models/ch"
import {Injectable} from "@angular/core"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import auth = firebase.auth
import {ToastController} from "ionic-angular"
import {AuthService} from "./auth"

@Injectable()
export class ChService {
	challenges: FirebaseListObservable<Challenge[]>
	data: any
	sameUser: boolean
	
	constructor(private af: AngularFire,
	            public toastCtrl: ToastController,
	            private authService: AuthService) {
		this.challenges = af.database.list('/challenges')
		// let liked = this.toastCtrl.create({
		// 	message: 'Already liked',
		// 	duration: 2000
		// });
		// let like = this.toastCtrl.create({
		// 	message: 'You like it!',
		// 	duration: 2000
		// });
		
	}
	
	addCh(title: string, description: string, difficulty: string, userId: string) {
		return this.challenges.push({title, description, difficulty, userId})
		
	}
	
	editCh($key: string, title: string, description: string, difficulty: string, img: string, userId: string) {
		this.challenges.update($key, {title, description, difficulty, img, userId})
	}
	
	removeCh(key: string) {
		this.challenges.remove(key)
	}
	
	likeCh($key: string, userId: string) {
		// 	this.challenges = this.af.database.list('/challenges/'+$key+'/rating', {
		// 	query: {
		// 		orderByKey: true,
		// 		equalTo: $key
		// 	}
		//
		// })
		// this.challenges.subscribe(user => {
		// 		this.data = user
		// 	})
		//
		// console.log("Won's"+this.data)
		// this.sameUser = this.authService.compareUsers(userId)
		// console.log(this.sameUser)
		// console.log("works?")
		// console.log(this.challenges.)
		this.challenges = this.af.database.list('/challenges/'+$key+'/rating')
		this.challenges.push(userId)
	}
	
	//
	// addComment($key: string, comments:) {
	// 	this.challenges.update($key, {title, description, difficulty, img, userId})
	// }
	
}
