import {FDKeychain} from "./fdkeychain.service";
/**
 * Created by itwo on 7/2/2018.
 */

export class FdkeychainPage {

  public keychain: string;
  public newkeychain: string;
  public message : string;

  constructor(
    private keychain: FDKeychain
  ) {
  }

  getKeyChain() {
    this.keychain.getItemForServiceInAccessGroup('USERS', 'com.ttt.mobility.lib', 'xxxxxxxxxx.com.ttt.mobility.lib')
      .then(data => this.keychain = data);
  }

  setKeyChain() {
    this.keychain.setItemForServiceInAccessGroup('USERS', this.newkeychain, 'com.ttt.mobility.lib', 'xxxxxxxxxx.com.ttt.mobility.lib')
      .then(data => {
        this.keychain = this.newkeychain;
        this.message = 'set keychain successful,you can check new keychain in other app(same company , and config keychain sharing)'
      });
  }
}
