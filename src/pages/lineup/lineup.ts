import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-lineup',
  templateUrl: 'lineup.html',
})
export class LineupPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  lineup: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineupPage');

  }


  ngOnInit() {
    this.lineup = this.navParams.get('lineup');

  }
}
