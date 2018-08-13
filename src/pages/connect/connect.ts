import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  vibers: any[] = [];

  getEvents() {
    this.http.get('assets/data/vibers.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.vibers = data;

      });
  }


  ionViewDidLoad() {
    this.getEvents();
    console.log('ionViewDidLoad ConnectPage');
  }

}
