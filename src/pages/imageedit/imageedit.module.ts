import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ImageEdit} from "./imageedit";
import {Canvas} from "./canvas/canvas";
import { Tools } from "./tools/tools";
import { Colors } from "./tools/colors/colors";
import { Squares } from "./tools/square/square";
import { LineWidth } from "./tools/lineWidth/lineWidth";
import { ToolsService } from "./tools/tools.service";

@NgModule({
  declarations: [
    ImageEdit,
    Canvas,
    Tools,
    Colors,
    Squares,
    LineWidth
  ],
  imports: [
    IonicPageModule.forChild(ImageEdit),
  ],
  providers : [
    ImageEdit,
    Canvas,
    ToolsService
  ]
})
export class ImageEditPageModule {}
