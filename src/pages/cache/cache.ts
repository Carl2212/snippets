import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CacheService} from "./cache.service";

/**
 * Generated class for the CachePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cache',
  templateUrl: 'cache.html',
})
export class CachePage {

  constructor(
    public cache : CacheService
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CachePage');
  }

}
