import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public access_token = "";
  public connect : any;

 constructor(public navCtrl: NavController,  public navParams: NavParams, public platform: Platform, public iab: InAppBrowser, private socialSharing: SocialSharing ) {
  		this.access_token = localStorage.getItem("access_token");
      this.connect = navParams.get('connect');
      console.log(this.connect);
  }

  launch(url) {
        this.platform.ready().then(() => {
            this.iab.create(url, "_system", "location=true");
        });
    }

  openShare(connect)
  {
    // share(message, subject, file, url)
    var message = "Checkout "+connect.name+", "+connect.bio+". ";
    if(connect.phone != null) message += "Phone: "+connect.phone+". ";
    if(connect.email != null) message += "Email: "+connect.email+". ";
    if(connect.twitter != null) message += "Twitter: "+connect.twitter+". ";
    if(connect.facebook != null) message += "Facebook - "+connect.facebook+". ";
    this.socialSharing.share(message, "Share Connect", null, null);
  }

}
