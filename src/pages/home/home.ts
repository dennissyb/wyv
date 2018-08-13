import { LocationsProvider } from './../../providers/locations/locations';
import { GoogleMapsProvider } from './../../providers/google-maps/google-maps';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GoogleMapsProvider, LocationsProvider]
})


export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform) {

  }


  mapLoaded: any;

  ionViewDidLoad() {

    this.platform.ready().then(() => {

      this.mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      
    });
  }

  ionViewWillEnter() {

    this.platform.ready().then(() => {

      this.mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    });

  }

}