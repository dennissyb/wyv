import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

declare var Marketcloud: any;

import '../../../node_modules/marketcloud-js/dist/marketcloud.min';

/*
  Generated class for the MarketcloudService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MarketcloudService {

  client:any;

  utils:any;

  constructor() {

    // Here we create an instance of the client
    // Since this Service is created once
    // we will not have to re-create other instances of the client.
    this.client = new Marketcloud.Client({
    	publicKey : '5c9d9750-b943-453f-b8ec-31320326ca51' // REPLACE WITH YOUR PUBLIC KEY
    });

    this.utils = Marketcloud.Utils;

  }

}