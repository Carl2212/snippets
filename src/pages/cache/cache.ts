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

  public actionA=['Action A-1','Action A-2','Action A-3','Action A-4','Action A-5'];
  public actionB=['Action B-1','Action B-2','Action B-3','Action B-4','Action B-5'];
  public actionC=['Action C-1','Action C-2','Action C-3','Action C-4','Action C-5'];
  public actionD=['Action D-1','Action D-2','Action D-3','Action D-4','Action D-5'];
  constructor(
    public cache : CacheService
  ) {
    this.cache.reload();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CachePage');
  }

}
