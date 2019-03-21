import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from "@ionic/storage";
import { TabsPage } from "../pages/tabs/tabs";
import { FigureDemo } from "../pages/figure/figure";
import { ComponentModule } from "../pages/imageedit/component.module";
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    FigureDemo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name : 'snippets',
      storeName: 'snippetsStorage',
      driverOrder: ['localstorage', 'indexeddb']
    }),
    ComponentModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    FigureDemo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
