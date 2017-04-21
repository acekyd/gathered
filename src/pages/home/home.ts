import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { MeetupService } from '../../providers/meetup-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MeetupService]
})
export class HomePage {

  public access_token = "";
  public meetup: any;
  public dashboard: any;

  constructor(public navCtrl: NavController,  public navParams: NavParams, public meetupService: MeetupService ) {
  		this.access_token = localStorage.getItem("access_token");
	  	  if(this.access_token)
	  	  {
	  	    this.loadDashboard();
	  	  }
  }

  loadDashboard(){
    this.meetupService.loadDashboard()
    .then(data => {
      this.dashboard = data;
    });
  }
  //Use this later
  loadPeople(){
    this.meetupService.load()
    .then(data => {
      this.meetup = data;
    });
  }

}
