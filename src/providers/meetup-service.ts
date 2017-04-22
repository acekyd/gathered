import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '@angular/http';
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
  public access_token = localStorage.getItem("access_token");

  constructor(public http: Http) {
    console.log('Hello MeetupService Provider');
  }

  loadDashboard() {
    if (this.dashboard) {
        // already loaded data
        return Promise.resolve(this.dashboard);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('https://api.meetup.com/dashboard?is_simplehtml=true&fields=simple_html_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.dashboard = data;
            console.log(this.dashboard);
            resolve(this.dashboard);
          });
      });
  }

  loadGroups() {
    console.log('Hello Meetup Groups');
    if (this.groups) {
        // already loaded data
        return Promise.resolve(this.groups);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('https://api.meetup.com/self/groups?fields=plain_text_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.groups = data;
            console.log(this.groups);
            resolve(this.groups);
          });
      });
  }

  loadEvents() {
    console.log('Hello Meetup Groups');
    if (this.events) {
        // already loaded data
        return Promise.resolve(this.events);
      }

      // don't have the data yet
      return new Promise(resolve => {
        this.http.get('https://api.meetup.com/self/events?desc=false&fields=plain_text_description&access_token='+this.access_token)
          .map(res => res.json())
          .subscribe(data => {
            this.events = data;
            console.log(this.events);
            resolve(this.events);
          });
      });
  }

  load() {
    if (this.data) {
        // already loaded data
        return Promise.resolve(this.data);
      }

      // don't have the data yet
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get('https://randomuser.me/api/?results=10')
          .map(res => res.json())
          .subscribe(data => {
            this.data = data.results;
            resolve(this.data);
          });
      });
  }

}
