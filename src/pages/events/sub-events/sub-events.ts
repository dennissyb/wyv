import { EditEventPage } from './../../edit-event/edit-event';
import { Http } from '@angular/http';
import { EventPage } from './../../event/event';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
    selector: 'page-sub-events',
    templateUrl: 'sub-events.html',
})
export class SubEventsPage {

    events: any = [];
    grid: any[][] = [[]]; //array of arrays
    title:string = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    }

    onViewEvent(event: Event) {

        this.navCtrl.push(EventPage, { event: event });
    }

    onNewEvent() {
        this.navCtrl.push(EditEventPage);
    }

    getEvents() {
        this.http.get('assets/data/events.json')
            .map((res) => res.json())
            .subscribe(data => {
                this.events = data;
                let rowNum = 0; //counter to iterate over the rows in the grid

                for (let i = 0; i < this.events.length; i += 3) { //iterate images

                    this.grid[rowNum] = [{},{},{}]; //declare two elements per row

                    if (this.events[i]) { //check file URI exists
                        this.grid[rowNum][0] = this.events[i] //insert image

                    }

                    if (this.events[i + 1]) { //repeat for the second image
                        this.grid[rowNum][1] = this.events[i + 1]
                    }
                    if (this.events[i + 2]) { //repeat for the second image
                        this.grid[rowNum][2] = this.events[i + 2]
                    }

                    rowNum++; //go on to the next row
                }
            });
    }

    ionViewDidLoad() {

        this.getEvents();
        this.title =  this.navParams.data;
    }

}
