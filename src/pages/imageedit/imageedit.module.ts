import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageEdit } from "./imageedit";
import { ComponentModule } from "./component.module";

@NgModule({
  declarations: [
    ImageEdit,
  ],
  imports: [
    IonicPageModule.forChild(ImageEdit),
    ComponentModule
  ]
})
export class ImageEditPageModule {}
