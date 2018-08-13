import { Network } from '@ionic-native/network';
import { LocationsProvider } from './../../providers/locations/locations';
import { ConnectivityProvider } from './../../providers/connectivity/connectivity';
import { GoogleMapsProvider } from './../../providers/google-maps/google-maps';
import { StorePage } from './../store/store';
import { EventsPage } from './../events/events';
import { ConnectPage } from './../connect/connect';
import { SharePage } from './../share/share';
import { HomePage } from './../home/home';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers:[GoogleMapsProvider,ConnectivityProvider,LocationsProvider,Network]
})
export class TabsPage implements OnInit {

  homePage = HomePage;
  sharePage = SharePage;
  connectPage = ConnectPage;
  eventsPage = EventsPage;
  storePage = StorePage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
