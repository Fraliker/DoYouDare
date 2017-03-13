import {Injectable} from "@angular/core"
import {FirebaseListObservable, AngularFire} from "angularfire2"
import {User} from "../models/user"



@Injectable()
export class UserService {
	users: FirebaseListObservable<User[]>
	
	constructor(private af: AngularFire) {
		this.users = af.database.list('/users');
		
	}
	
	addUser($key: string, name: string) {
		return this.users.update($key, {name})
	}
	
	editUser($key: string, uid: string, name: string, tagline: string, bio: string, img: string, chMade: any, chTaken: any, chDone: any, chLiked: any) {
		this.users.update($key, {uid, name, tagline, bio, img, chMade, chTaken, chDone, chLiked})
	}
	bioUser(uid: string, bio: string) {
		this.users.update(uid, {bio})
	}
}