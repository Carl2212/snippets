import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FdkeychainPage } from './fdkeychain';
import {FDKeychain} from "./fdkeychain.service";

@NgModule({
  declarations: [
    FdkeychainPage,
  ],
  imports: [
    IonicPageModule.forChild(FdkeychainPage),
  ],
  providers : [
    FDKeychain
  ]
})
export class FdkeychainPageModule {}
