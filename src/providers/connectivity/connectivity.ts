import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

 
declare var Connection;
 
@Injectable()
export class ConnectivityProvider {
 
  onDevice: boolean;
 
  constructor(private platform: Platform, private network:Network){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    if(this.onDevice && this.network.onConnect){
      return this.network.onConnect !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && this.network.onConnect){
      return this.network.onConnect === Connection.NONE;
    } else {
      return !navigator.onLine;  
    }
  }
 
}