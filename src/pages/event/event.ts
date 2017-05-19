import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import { AddPage } from '../add/add';
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
  public checked_in = false;

  check_ins: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public meetupService: MeetupService, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
  	this.access_token = localStorage.getItem("access_token");
    this.user = JSON.parse(localStorage.getItem("user"));
  	this.urlname = navParams.get('urlname');
  	this.id = navParams.get('id');
  	if(this.access_token)
  	  {
  	    this.loadEvent(this.urlname, this.id);
        this.check_ins = af.database.list('/check-ins/'+this.id);

        var self = this;
        self.check_ins.forEach(function(element) {
            element.forEach(function(elem){
               if(self.user.id === elem.id)
               {
                  self.checked_in = true;
               }
              })
          })
  	  }

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
      this.check_ins.push(this.user);
  }

  showOptions(eventId, eventName, contact) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Checked-In Attendee Options',
      buttons: [
       {
        text: 'Add to Connect',
        handler: () => {
          this.addContactForm(eventId, eventName, contact);
          console.log('Navigate to add contacts');
        }
       },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
       }
      ]
    });
    actionSheet.present();
   }

   public addContactForm(eventId, eventName, contact)
   {
     this.navCtrl.push(AddPage, {
          contact: contact,
          eventId: eventId,
          eventName: eventName
      });
   }

}
