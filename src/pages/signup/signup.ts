import { TabsPage } from './../tabs/tabs';
import { AuthService } from './../../app/service/auth';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private alertCtrl: AlertController, private loadCtrl: LoadingController, private authService: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  onSignUp(form: NgForm) {
    const load = this.loadCtrl.create({
      content: 'Registering you up'
    });
    load.present();
    this.authService.signUp(form.value.email, form.value.password)
      .then(data => {
        load.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Success',
          message: 'Sign up Successful',
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
          title: 'Sign Up Failed',
          message: error.message,
          buttons: [
            'Ok'
          ]
        });

        alert.present();

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
