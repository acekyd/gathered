import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { GroupsPage } from '../pages/groups/groups';
import { ContactPage } from '../pages/contact/contact';
import { MorePage } from '../pages/more/more';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { EventPage } from '../pages/event/event';
import { AddPage } from '../pages/add/add';
import { UserPage } from '../pages/user/user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA8U9aAJXFPvhwY2bDxuo1e3CtClU0s6DA",
  authDomain: "gathered-f3c2a.firebaseapp.com",
  databaseURL: "https://gathered-f3c2a.firebaseio.com",
  projectId: "gathered-f3c2a",
  storageBucket: "gathered-f3c2a.appspot.com",
  messagingSenderId: "934798349553"
};

@NgModule({
  declarations: [
    MyApp,
    Login,
    GroupsPage,
    ContactPage,
    HomePage,
    AddPage,
    TabsPage,
    MorePage,
    EventPage,
    UserPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    GroupsPage,
    ContactPage,
    HomePage,
    AddPage,
    TabsPage,
    MorePage,
    EventPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
