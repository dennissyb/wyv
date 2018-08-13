import { SigninPage } from './../pages/signin/signin';
import { WelcomePage } from './../pages/welcome/welcome';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import firebase from 'firebase';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = WelcomePage;
  tabsPage = TabsPage;
  signInPage = SigninPage;

  @ViewChild('nav') nav : NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyDJI7N5AXM5DnICOkMpE0FuTscVUdlaLwg",
      authDomain: "wyv-auth.firebaseapp.com",
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

