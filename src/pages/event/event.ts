import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { MeetupService } from '../../providers/meetup-service';


@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  providers: [MeetupService]
})
export class EventPage {

	public access_token = "";
	public urlname: any;
	public id: any;
	public event: any;
  public user: any;

  check_ins: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public meetupService: MeetupService, af: AngularFire) {
  	this.access_token = localStorage.getItem("access_token");
    this.user = JSON.parse(localStorage.getItem("user"));
  	this.urlname = navParams.get('urlname');
  	this.id = navParams.get('id');
  	if(this.access_token)
  	  {
  	    this.loadEvent(this.urlname, this.id);
        this.check_ins = af.database.list('/check-ins/'+this.id);
        console.log(this.check_ins);
  	  }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  loadEvent(urlname, id){
    this.meetupService.loadEvent(urlname, id)
    .then(data => {
      this.event = data;
      console.log(this.event);
    });
  }

  checkIn(event_id)
  {
      this.check_ins.push({
              user: this.user
        });
  }

}
