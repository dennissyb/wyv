import { SubEventsPage } from './sub-events/sub-events';
import { EditEventPage } from './../edit-event/edit-event';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: any = [];
  categories : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  }

  onViewCategory(category: string) {

    this.navCtrl.push(SubEventsPage, category);
  }

  onNewEvent()
  {
    this.navCtrl.push(EditEventPage);
  }

  getEvents() {
    this.http.get('assets/data/events.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.events = data;
      });

      this.http.get('assets/data/categories.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.categories = data;
      });
  }

  ionViewDidLoad() {
    this.getEvents();
  }

}
