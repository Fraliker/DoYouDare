import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {FrontPage} from "../pages/front/front";
import {SignupPage} from "../pages/signup/signup";
import {ProfilePage} from "../pages/profile/profile";
import {LoginPage} from "../pages/login/login";
import {ChallengePage} from "../pages/challenge/challenge";
import {UserPage} from "../pages/user/user";

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
        UserPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
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
        UserPage

    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
