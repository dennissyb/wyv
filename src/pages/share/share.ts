import { Http } from '@angular/http';
import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
logo : string  = "";
  constructor(public navCtrl: NavController, 
    public http: Http) {
  }

  ionViewDidLoad() {
    this.http.get('assets/data/images.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.logo = data[1].image;
    });
  }

}
