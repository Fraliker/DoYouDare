import {Injectable} from "@angular/core"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {User} from "../models/user"



@Injectable()
export class UserService {
	// private challenges: Challenge[] = [];
	challenges: FirebaseListObservable<User[]>
	
	constructor(private af: AngularFire) {
		this.challenges = af.database.list('/users');
		
	}
	
	addUser(name: string, tagline: string, bio: string, img: string, chMade: any[], chTaken: any[], chDone: any[], chLiked: any[]) {
		return this.challenges.push({name, tagline, bio, img, chMade, chTaken, chDone, chLiked})
		
	}
	
	editUser($key: string, name: string, tagline: string, bio: string, img: string, chMade: any[], chTaken: any[], chDone: any[], chLiked: any[]) {
		this.challenges.update($key, {name, tagline, bio, img, chMade, chTaken, chDone, chLiked})
	}
}