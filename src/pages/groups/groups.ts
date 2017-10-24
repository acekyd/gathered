import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MeetupService } from '../../providers/meetup-service';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
  providers: [MeetupService]
})
export class GroupsPage {

  public access_token = "";
  public group = "meetups"; //default segment tab in groups
  public groups: any;
  public events: any;

 constructor(public navCtrl: NavController,  public navParams: NavParams, public meetupService: MeetupService ) {
  		this.access_token = localStorage.getItem("access_token");
	  	  if(this.access_token)
	  	  {
	  	    this.loadGroups();
	  	    this.loadEvents();
	  	  }
  }

  loadGroups(){
    this.meetupService.loadGroups()
    .then((data: Array<any>) => {
      this.groups = data.map((val) => {
        //include a boolean to toggle readMore
        return Object.assign({}, val, {more: false});
      });
    });
  }

  loadEvents(){
    this.meetupService.loadEvents()
    .then(data => {
      this.events = data.map((val) => {
        //include a boolean to toggle readMore
        return Object.assign({}, val, {more: false});
      });
    });
  }

  doo(val) {
    console.log("kksa " +val);
  }

  toggleReadMore(val) {
      val.more = !val.more;
  }

}
