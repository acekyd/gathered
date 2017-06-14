import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public access_token = "";
  public user: any;
  public account: any;
  public exists = false;


 constructor(public navCtrl: NavController,  public navParams: NavParams, af: AngularFireDatabase, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  		this.access_token = localStorage.getItem("access_token");
  		this.user = navParams.get('user');
      this.account = af.object('/users/'+this.user.id);
  }

  public addProfile() {

  	  //console.log(this.user);
	  	this.account.set(this.user);
  	  	let toast = this.toastCtrl.create({
  			message: 'Profile details set successfully',
  			duration: 3000
		 });
		 toast.present();
		 this.navCtrl.setRoot(TabsPage);
  }

}
