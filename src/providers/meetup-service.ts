import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MeetupService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MeetupService {

  public data;
  public dashboard;
  public groups;
  public events;
  public event;
  public auth_user;
  public access_token = localStorage.getItem("access_token");

  constructor(public http: Http) {
    //console.log('Hello MeetupService Provider');
  }

  loadDashboard() {
    if (this.dashboard) {
        // already loaded data
        return Promise.resolve(this.dashboard);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('/dashboard?is_simplehtml=true&fields=simple_html_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.dashboard = data;
            //console.log(this.dashboard);
            resolve(this.dashboard);
          });
      });
  }

  loadGroups() {
    if (this.groups) {
        // already loaded data
        return Promise.resolve(this.groups);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('/userGroups?fields=plain_text_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.groups = data;
            //console.log(this.groups);
            resolve(this.groups);
          });
      });
  }

  loadEvents() {
    if (this.events) {
        // already loaded data
        return Promise.resolve(this.events);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('/userEvents?desc=false&fields=plain_text_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.events = data;
            //console.log(this.events);
            resolve(this.events);
          });
      });
  }

  loadEvent(urlname, id) {
      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('/api/'+urlname+'/events/'+id+'?access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.event = data;
            //console.log(this.event);
            resolve(this.event);
          });
      });
  }

  loadUser() {
    if (this.auth_user) {
        // already loaded data
        return Promise.resolve(this.auth_user);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('/user?access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.auth_user = data;
            //console.log(this.auth_user);
            resolve(this.auth_user);
          });
      });
  }

}
