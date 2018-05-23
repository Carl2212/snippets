import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('content') content : NavController;
  @ViewChild('menu') menu : MenuController

  public menuList = [
    {title: 'CachePage' , view: 'CachePage'},
    {title: 'FdkeychainPage' , view: 'FdkeychainPage'},
    {title: 'ImageEdit' , view: 'ImageEdit'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public openPage(view : string){
    this.content.push(view);
    this.menu.close();

  }
}

