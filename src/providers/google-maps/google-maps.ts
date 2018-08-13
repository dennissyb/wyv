import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';


import 'rxjs/add/operator/map';


declare var google;
@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  locationImage : string = "";

  constructor(private alertCtrl: AlertController, private loadCtrl: LoadingController, private geolocation: Geolocation, public connectivityService: ConnectivityProvider, private http: Http) {
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {
    const load = this.loadCtrl.create({
      content: 'Loading Map'
    });
    //load.present();
    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
              load.dismiss();

            });

            this.enableMap();
            load.dismiss();

          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);
          load.dismiss();

        }
      }
      else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
          load.dismiss();

        }
        else {
          this.disableMap();
          load.dismiss();
        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#505659' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#505659' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#505659' }] },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#dddddd' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#dddddd' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#dddddd' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#00fff2' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#00ff97' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#00ff97' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#00fff2' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        var cityCircle = new google.maps.Circle({
          strokeColor: '#00ff97',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#fff',
          fillOpacity: 0.1,
          map: this.map,
          center: latLng,
          radius: 100 * 100
        });

        this.http.get('assets/data/images.json')
        .map((res) => res.json())
        .subscribe(data => {
          this.locationImage = data[0].image;
          var myLocation = new google.maps.Marker({
            position: latLng,
            title: "Me",
            icon: this.locationImage
          });
   
          myLocation.addListener('click', () => {
            this.clickedMe();
          });
          myLocation.setMap(this.map);
        });
        this.map.setZoom(9);

        this.getMarkers(position.coords.latitude, position.coords.longitude);
        resolve(true);

      });

    });


  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  addMarkersToMap(markers, lat, lng) {
    let counter = 0;
    for (let marker of markers) {

      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        icon: marker.image,
        markerClick: function (marker) {
          console.log(marker.get('title'));
        }
      });

      dogwalkMarker.addListener('click', () => {
        this.markerClicked(marker.title);
      });
      dogwalkMarker.setMap(this.map);
    }
  }

  clickedMe()
  {
    let alert = this.alertCtrl.create({
      title: "ME"
    });
    alert.present();
  }
  markerClicked(title) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Do you want to check out this vibe?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  getMarkers(lat: number, lng: number) {
    this.http.get('assets/data/locations.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.addMarkersToMap(data, lat, lng);
      });
  }


  addMarker(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      icon: './../assets/imgs/me.png',
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

    var circle = new google.maps.Circle({
      map: this.map,
      radius: 16093,    // 10 miles in metres
      fillColor: '#AA0000'
    });
    circle.bindTo('center', marker, 'position');

  }

}