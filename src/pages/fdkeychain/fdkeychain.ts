import {FDKeychain} from "./fdkeychain.service";
import { IonicPage } from "ionic-angular";
import { Component } from "@angular/core";
/**
 * Created by itwo on 7/2/2018.
 */
@IonicPage()
@Component({
  selector: 'page-fdkeychain',
  templateUrl: 'fdkeychain.html',
})
export class FdkeychainPage {

  public shareString: string;
  public message : string;

  constructor(
    private keychain: FDKeychain
  ) {
  }

  getKeyChain() {
    this.keychain.getItemForServiceInAccessGroup('USERS', 'com.ttt.mobility.lib', 'xxxxxxxxxx.com.ttt.mobility.lib')
      .then(data => this.shareString = data);
  }

  setKeyChain() {
    this.keychain.setItemForServiceInAccessGroup('USERS', this.shareString, 'com.ttt.mobility.lib', 'xxxxxxxxxx.com.ttt.mobility.lib')
      .then(
        data => {
          this.message = 'set keychain successful,you can check new keychain in other app(same company , and config keychain sharing)'
        },
        err=>{
          this.shareString = '';
          this.message = 'set keychain fail'
        }
      );
  }
}
