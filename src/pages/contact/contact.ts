import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  connects: FirebaseListObservable<any>;
  public connectsList: Array<any>;
  public user: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private socialSharing: SocialSharing) {
	 this.user = JSON.parse(localStorage.getItem("user"));
	 this.connects = af.list('/connects/'+this.user.id);
	 console.log(this.connects);
	 this.initializeItems();
  }

  initializeItems(){
  	this.connectsList = [];
	 console.log(this.connects);
	 var self = this;
	  	self.connects.forEach(function(element) {
	        element.forEach(function(elem){
	           self.connectsList.push(elem);
	           console.log(self.connectsList);
	          })
	    })
	console.log(this.connectsList);
	console.log("bimpe");
  }

  getItems(searchbar) {
  	console.log("you are mad");
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.connectsList = this.connectsList.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.eventName.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.bio.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.connectsList.length);

  }

	 showOptions(connect) {
		let actionSheet = this.actionSheetCtrl.create({
		  title: 'What do you want to do?',
		  buttons: [
		  	 {
		  	 	text: 'Share Connect',
		  	 	handler: () => {
		  	 		// share(message, subject, file, url)
		  	 		var message = "Checkout "+connect.name+", "+connect.bio+". ";
		  	 		if(connect.phone != null) message += "Phone: "+connect.phone+". ";
		  	 		if(connect.email != null) message += "Email: "+connect.email+". ";
		  	 		if(connect.twitter != null) message += "Twitter: "+connect.twitter+". ";
		  	 		if(connect.facebook != null) message += "Facebook - "+connect.facebook+". ";
    				this.socialSharing.share(message, "Share Connect", null, null);
		  	 	}
		  	 },
			 {
				text: 'Delete Connect',
				role: 'destructive',
				handler: () => {
				  this.removeConnect(connect.$key);
				}
			 },
			 {
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

	 removeConnect(connectId: string){
		this.connects.remove(connectId).then(data => {
					 let toast = this.toastCtrl.create({
						message: 'Connect was deleted successfully',
						duration: 3000
					 });
					 toast.present();
				}
		  );
	 }
}
