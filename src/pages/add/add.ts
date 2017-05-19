import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public access_token = "";
  public contact: any;
  public eventId: any;
  public eventName: any;
  public user: any;
  public connects: any;
  public exists = false;


 constructor(public navCtrl: NavController,  public navParams: NavParams, af: AngularFire, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  		this.access_token = localStorage.getItem("access_token");
  		this.user = JSON.parse(localStorage.getItem("user"));
  		this.connects = af.database.list('/connects/'+this.user.id);
  		this.contact = navParams.get('contact');
  		this.eventId = navParams.get('eventId');
  		this.eventName = navParams.get('eventName');

  		var self = this;
	  	self.connects.forEach(function(element) {
	        element.forEach(function(elem){
	           if(self.contact.id === elem.id)
	           {
	              self.exists = true;
	           }
	          })
	    })
  }

  public addConnect() {

  	console.log(this.connects);
  	console.log(this.contact.id);

  		//remove $key
	  	delete this.contact.$key;
	  	delete this.contact.$exists;
	  	this.contact.eventName = this.eventName;
	  	this.connects.push(this.contact);
	  	let toast = this.toastCtrl.create({
			message: 'Connect was added successfully',
			duration: 3000
		 });
		 toast.present();
		 this.navCtrl.pop();
  }

}
