import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

declare var window: any;
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

	public access_token = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public iab: InAppBrowser) {
  	if(localStorage.getItem('access_token'))
  		{
  			this.access_token = localStorage.getItem('access_token');
  			this.navCtrl.setRoot(TabsPage);
  		}
  }

  public login() {
  		this.platform.ready().then(() => {
	        this.meetupLogin().then(success => {
	            this.access_token = success.access_token;
	            localStorage.setItem('access_token', this.access_token);
	            this.navCtrl.setRoot(TabsPage );
	        }, (error) => {
	            alert(error);
	        });
	    });
    }

    public meetupLogin(): Promise<any> {
    		var browserRef = this.iab.create("https://secure.meetup.com/oauth2/authorize?client_id=3rs9so9865jed3hha17m3bepga&response_type=token&redirect_uri=http://localhost/callback&scope=ageless&set_mobile=on", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
    	   	return new Promise(function(resolve, reject){
    	        browserRef.on("loadstart")
    	        .subscribe((event: InAppBrowserEvent) => {
    	            if ((event.url).indexOf("http://localhost/callback") === 0) { 
    	                browserRef.close();
    	                var responseParameters = ((event.url).split("#")[1]).split("&");
    	                var parsedResponse = {};
    	                for (var i = 0; i < responseParameters.length; i++) {
    	                    parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
    	                }
    	                if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
    	                    resolve(parsedResponse);
    	                } else {
    	                    reject("Problem authenticating with Meetup");
    	                }
    	            }

    	        });
    	     });
    }


}
