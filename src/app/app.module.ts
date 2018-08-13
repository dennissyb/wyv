import { SubEventsPage } from './../pages/events/sub-events/sub-events';
import { BraintreeProvider } from './../providers/config/braintree/braintree';
import { OrderCompletePage } from './../pages/store/order-complete/order-complete';
import { CategoriesPage } from './../pages/store/categories/categories';
import { CartPage } from './../pages/store/cart/cart';
import { CheckoutPage } from './../pages/store/checkout/checkout';
import { ItemPage } from './../pages/store/item/item';
import { ProductsPage } from './../pages/store/products/products';
import { MarketcloudService } from './../providers/config/marketcloud-service';
import { ConfigurationService } from './../providers/config/configuration-service';
import { EditEventPage } from './../pages/edit-event/edit-event';
import { LineupPage } from './../pages/lineup/lineup';
import { GoogleMapsProvider } from './../providers/google-maps/google-maps';
import { LocationsProvider } from './../providers/locations/locations';
import { ConnectivityProvider } from './../providers/connectivity/connectivity';
import { EventPage } from './../pages/event/event';
import { AuthService } from './service/auth';
import { WelcomePage } from './../pages/welcome/welcome';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { EventsPage } from './../pages/events/events';
import { SharePage } from './../pages/share/share';
import { ConnectPage } from './../pages/connect/connect';
import { StorePage } from './../pages/store/store';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NetworkProvider } from '../providers/network/network';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StorePage,
    ConnectPage,
    SharePage,
    EventsPage,
    TabsPage,
    SigninPage,
    SignupPage,
    WelcomePage,
    EventPage, LineupPage, EditEventPage,
    ProductsPage,
    ItemPage,
    CheckoutPage,
    CartPage,
    CategoriesPage,OrderCompletePage,SubEventsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StorePage,
    ConnectPage,
    SharePage,
    EventsPage,
    TabsPage,
    SigninPage,
    SignupPage,
    WelcomePage,
    EventPage,
    LineupPage, EditEventPage,
    ProductsPage,
    ItemPage,
    CheckoutPage,
    CartPage,
    CategoriesPage,OrderCompletePage,
    SubEventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, ConnectivityProvider, LocationsProvider, GoogleMapsProvider,ConfigurationService,MarketcloudService
    ,NetworkProvider,BraintreeProvider]
})
export class AppModule { }
ConnectivityProvider