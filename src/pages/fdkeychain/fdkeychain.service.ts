/**
 * @name FDKeychain
 * @description
 * share keychain between multiple app
 * 1)ionic cordova install cordova-plugin-fdkeychain
 * 2)xcode config  : enabled keychain sharing (in Capabilitiess)
 *                   in the keychain sharing,add the same Keychain Groups between multiple app
 *                   usages : param state :
 *                                         myApp is you app bundle identities
 *                                         accessGroup  is   appIdentities.keychaingroups
 */

import {Injectable} from "@angular/core";
import { Cordova, Plugin,IonicNativePlugin} from "@ionic-native/core";
@Plugin({
  pluginName : 'FDKeychain',
  plugin : 'cordova-plugin-fdkeychain',
  pluginRef : 'cordova.plugins.FDKeychain',
  repo : 'https://github.com/ionic-team/cordova-plugin-fdkeychain',
  platforms : ['iOS']
})

@Injectable()
export class FDKeychain extends IonicNativePlugin {

  @Cordova({
    callbackOrder: 'reverse'
  })
  setItemForService(key : string , value : string , myApp : string ) : Promise<any> {return;}

  @Cordova({
    callbackOrder: 'reverse'
  })
  setItemForServiceInAccessGroup(key : string , value : string , myApp : string , accessGroup : string ) : Promise<any> {return;}

  @Cordova({
    callbackOrder: 'reverse'
  })
  getItemForService(key : string , myApp : string) : Promise<any> {return;}

  @Cordova({
    callbackOrder: 'reverse'
  })
  getItemForServiceInAccessGroup(key : string ,  myApp : string , accessGroup : string ) : Promise<any> {return;}

  @Cordova({
    callbackOrder: 'reverse'
  })
  removeItemForService(key : string , myApp : string) : Promise<any> {return;}

  @Cordova({
    callbackOrder: 'reverse'
  })
  removeItemForServiceInAccessGroup(key : string ,  myApp : string , accessGroup : string ) : Promise<any> {return;}

}

