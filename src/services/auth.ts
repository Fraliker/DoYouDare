import firebase from 'firebase'
import {Challenge} from "../models/ch";
import {FirebaseAuthState, AngularFireAuth, AuthMethods, AuthProviders} from "angularfire2"
import {Injectable} from "@angular/core"

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState;
    
    constructor(public auth$: AngularFireAuth) {
        this.authState = auth$.getAuth();
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }
    getAuthenticated() {
        return this.authState !== null;
    }
    signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }
    signOut(): void {
        this.auth$.logout();
    }
    
    displayName(): string {
        if (this.authState != null) {
            return this.authState.facebook.displayName;
        } else {
            return '';
        }
    }

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
