import {Challenge} from "../models/ch"
import {Injectable} from "@angular/core"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import auth = firebase.auth

@Injectable()
export class ChService {
	challenges: FirebaseListObservable<Challenge[]>
	
	constructor(private af: AngularFire) {
		this.challenges = af.database.list('/challenges')
		
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
}
