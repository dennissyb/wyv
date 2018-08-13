import { TabsPage } from './../tabs/tabs';
import { AuthService } from './../../app/service/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private loadCtrl : LoadingController,
     public navCtrl: NavController,
      public navParams: NavParams, 
      private alertCtrl : AlertController,
    private authService: AuthService) {
  }

  onSignIn(form: NgForm) {
    const load = this.loadCtrl.create({
      content: 'Loggin In'
    });
    load.present();
    this.authService.signIn(form.value.email, form.value.password)
      .then(data => {
        load.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Success',
          message: 'Log In Successful',
          buttons: [{
            text: 'Ok',
            role: 'cancel',
            handler: () => {
             this.navCtrl.push(TabsPage);

            }
          }
          ]
        });
        alert.present();
      }).catch(error => {
        load.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Log In Failed',
          message: error.message,
          buttons: [
            'Ok'
          ]
        });

        alert.present();

      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
