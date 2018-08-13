import { LineupPage } from './../lineup/lineup';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage implements OnInit {

  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  }

  ngOnInit() {
    this.event = this.navParams.get('event');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  onShowLineUp() {
    let modal = this.modalCtrl.create(LineupPage,{lineup : this.event});
    modal.present();
  }

}
