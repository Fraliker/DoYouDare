import firebase from 'firebase'
import {Challenge} from "../models/ch";

export class AuthService {

    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email,password);
    }
    logout() {
        firebase.auth().signOut();
    }
    getActiveUser() {
        return firebase.auth().currentUser;
    }
    compareUsers(userId: string) {
        console.log("compare users")
        return (this.getActiveUser().uid == userId);
    }
}
