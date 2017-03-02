import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

onLogin(form: NgForm) {
  console.log(form.value);
}

}
