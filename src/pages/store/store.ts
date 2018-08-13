import { Storage } from '@ionic/storage';
import { CartPage } from './cart/cart';
import { Component, ViewChild, Injectable, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform, AlertController } from 'ionic-angular';
import { ProductsPage } from './products/products';
import { CategoriesPage } from './categories/categories';
import { MarketcloudService } from '../../providers/config/marketcloud-service';
import { ConfigurationService } from '../../providers/config/configuration-service';
/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  providers: [MarketcloudService]
})
export class StorePage implements OnInit {


  ngOnInit()
  {
    this.navCtrl.setRoot(ProductsPage);
  }
  @ViewChild(NavController) nav: NavController;

  rootPage: any = ProductsPage;

  // We will prefix our Storage values with a unique namespace
  // This is because if you have several apps built on this template
  // they might clash using different Marketcloud API keys.
  // 
  // With a namespace you can have any apps you want (as long as you have unique namespace)
  // so for example set this value to the app's name
  marketcloudAppNamespace: string = 'mcIonic2';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    private configuration: ConfigurationService,
    private marketcloud: MarketcloudService,
    public storage: Storage,
    private alertCtrl: AlertController,
  private navCtrl :NavController) {

    this.initializeApp();
  }

  initializeApp() {

    // Object with references to pages
    this.pages = [
      { title: 'Home', component: ProductsPage },
      { title: 'Categories', component: CategoriesPage },
      { title: 'Cart', component: CartPage }
    ];

    // Marketcloud
    // If we don't have a cart here, we create a cart and store the id into the 
    // local storage
    this.storage.get(this.marketcloudAppNamespace + '_cart_id')
      .then((value) => {

        if (value === null) {
          // If value is null then we don't have a cart_id in the storage

          // Then we don't have a cart and we must create one
          this.marketcloud.client.carts.create({})
            .then((response) => {

              // The cart was successfully created and returned by Marketcloud
              // We immediatly store the id in the device's storage.
              this.storage.set(this.marketcloudAppNamespace + '_cart_id', response.data.id)
                .then(() => {

                  // Cart id successfully written on the Storage
                  this.configuration.set('cart_id', response.data.id);

                })
            })
            .catch((error) => {
              //An error has occurred, since we were not able to create the cart
              // we show the error to the user. This is were we might want to create
              // a retry mechanism.
              let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Unable to load categories, please check your internet connection.',
                buttons: ['Ok']
              });

              alert.present();

            })
        } else {
          console.info("Using cart with id " + value);
          this.configuration.set('cart_id', value);
        }
      })

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}