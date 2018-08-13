import { Http } from '@angular/http';
import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';
import { SigninPage } from './../signin/signin';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http :Http) {
  }

  logo:string = "";
  signinPage = SigninPage;
  signupPage = SignupPage;
  homePage = HomePage;

  signIn() {
    this.navCtrl.push(this.signinPage);
  }

  signUp() {
    this.navCtrl.push(this.signupPage);

  }

  ionViewDidLoad() {
    this.http.get('assets/data/images.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.logo = data[3].image;
    });
  }

}
