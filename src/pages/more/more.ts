import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  public access_token = "";

 constructor(public navCtrl: NavController,  public navParams: NavParams ) {
  		this.access_token = localStorage.getItem("access_token");
  }

}
