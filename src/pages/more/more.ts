import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  public access_token = "";

 constructor(public navCtrl: NavController,  public navParams: NavParams, public platform: Platform, public iab: InAppBrowser ) {
  		this.access_token = localStorage.getItem("access_token");
  }

  launch(url) {
        this.platform.ready().then(() => {
            this.iab.create(url, "_system", "location=true");
        });
    }

}
