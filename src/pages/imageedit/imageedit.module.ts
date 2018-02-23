import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ImageEdit} from "./imageedit";

@NgModule({
  declarations: [
    ImageEdit,
  ],
  imports: [
    IonicPageModule.forChild(ImageEdit),
  ],
  providers : [
    ImageEdit
  ]
})
export class ImageEditPageModule {}
