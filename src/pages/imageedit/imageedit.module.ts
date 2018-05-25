import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ImageEdit} from "./imageedit";
import {Canvas} from "./canvas/canvas";
import { Tools } from "./tools/tools";
import { Colors } from "./tools/colors/colors";
import { Figure } from "./tools/figure/figure";
import { Range } from "./tools/range/range";
import { ToolsService } from "./tools/tools.service";
import { DragBox } from "./dragbox/dragbox";

@NgModule({
  declarations: [
    ImageEdit,
    Canvas,
    Tools,
    Colors,
    Figure,
    Range,
    DragBox
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
