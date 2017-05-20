import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  public access_token = "";

 constructor(public navCtrl: NavController,  public navParams: NavParams, public platform: Platform ) {
  		this.access_token = localStorage.getItem("access_token");
  }

  launch(url) {
        this.platform.ready().then(() => {
            cordova.InAppBrowser.open(url, "_system", "location=true");
        });
    }

}
