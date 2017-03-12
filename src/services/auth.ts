import firebase from 'firebase'
import {FirebaseAuthState, AngularFireAuth, AuthMethods, AuthProviders} from "angularfire2"
import {Injectable} from "@angular/core"
import { Platform } from 'ionic-angular'
import { Facebook } from 'ionic-native'

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState;
    
    constructor(public auth$: AngularFireAuth, private platform: Platform) {
        this.authState = auth$.getAuth();
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }
    getAuthenticated() {
        return this.authState !== null;
    }
    
    signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
        if (this.platform.is('cordova')) {
            return Facebook.login(['email', 'public_profile']).then(res => {
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                console.log("FB login?")
                console.log(firebase.auth().signInWithCredential(facebookCredential))
                return firebase.auth().signInWithCredential(facebookCredential);
            })
	            .catch(
                    err => {
                        console.log(err)
                    }
                )
        } else {
            return this.auth$.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup
            });
        }
    
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
