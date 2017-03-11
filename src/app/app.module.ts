import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {FrontPage} from "../pages/front/front";
import {SignupPage} from "../pages/signup/signup";
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login/login";
import {ChallengePage} from "../pages/challenge/challenge";
import {UserPage} from "../pages/user/user";
import {EditChallengePage} from "../pages/edit-challenge/edit-challenge";
import {ChService} from "../services/challenges";
import {AuthService} from "../services/auth";
import {HOPage} from "../pages/home/home-options/home-options";
import {AngularFireModule} from "angularfire2"
import {UserService} from "../services/users"


export const firebaseConfig = {
    apiKey: "AIzaSyDqK9M31J_8xR0RU3yIN524zqpZtIboh7M",
    authDomain: "do-you-dare-bc9e4.firebaseapp.com",
    databaseURL: "https://do-you-dare-bc9e4.firebaseio.com",
    storageBucket: "do-you-dare-bc9e4.appspot.com",
    messagingSenderId: "456374355832"
};

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        FrontPage,
        ChallengePage,
        LoginPage,
        ProfilePage,
        SignupPage,
        UserPage,
        EditChallengePage,
        HOPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        FrontPage,
        ChallengePage,
        LoginPage,
        ProfilePage,
        SignupPage,
        UserPage,
        EditChallengePage,
        HOPage

    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ChService, AuthService, UserService]
})
export class AppModule {
}
