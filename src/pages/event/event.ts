import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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
  public count = 0;

  check_ins: FirebaseListObservable<any>;
  public checkInsList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public meetupService: MeetupService, af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
  	this.access_token = localStorage.getItem("access_token");
    this.user = JSON.parse(localStorage.getItem("user"));
  	this.urlname = navParams.get('urlname');
  	this.id = navParams.get('id');
    this.checkInsList = [];
  	if(this.access_token)
  	  {
  	    this.loadEvent(this.urlname, this.id);
        this.check_ins = af.list('/check-ins/'+this.id);

        var self = this;
        self.check_ins.forEach(function(element) {
            element.forEach(function(elem){
              self.count++;
               if(self.user.id === elem.id)
               {
                  self.checked_in = true;
               }
              })
          })
        this.initializeItems();
  	  }
  }

  initializeItems(){
    this.checkInsList = [];
   //console.log(this.check_ins);
   var self = this;
      self.check_ins.forEach(function(element) {
          element.forEach(function(elem){
             self.checkInsList.push(elem);
             //console.log(self.checkInsList);
            })
      })
  //console.log(this.checkInsList);
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.checkInsList = this.checkInsList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 || (v.bio && v.bio.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });

    //console.log(q, this.checkInsList.length);

  }

  loadEvent(urlname, id){
    this.meetupService.loadEvent(urlname, id)
    .then(data => {
      this.event = data;
      //console.log(this.event);
    });
  }

  checkIn(event_id)
  {
      this.check_ins.push(this.user);
      this.initializeItems();
  }

  showOptions(eventId, eventName, contact) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Checked-In Attendee Options',
      buttons: [
       {
        text: 'Add to Connect',
        handler: () => {
          this.addContactForm(eventId, eventName, contact);
          //console.log('Navigate to add contacts');
        }
       },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
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
