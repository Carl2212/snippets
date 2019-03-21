import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Canvas } from "./canvas/canvas";
import { Colors } from "./tools/colors/colors";
import { Figure } from "./tools/figure/figure";
import { Range } from "./tools/range/range";
import { ToolsService } from "./tools/tools.service";
import { DragBox } from "./dragbox/dragbox";
import { scrawl } from "./scrawl/scrawl";
import { FigureComp } from "./figure/figure";
import { DrawService } from "./canvas/drawService";
import { Crop } from "./tools/crop/crop";
import { Edit } from "./edit/edit";
import { DirectivesModule } from "../../directives/directives.module";
import { Tool } from "./tools/tool";
import { Cropbox } from "./cropbox/cropbox";

@NgModule({
  declarations: [
    Canvas,
    Colors,
    Figure,
    Range,
    DragBox,
    scrawl,
    FigureComp,
    Crop,
    Edit,
    Tool,
    Cropbox
  ],
  entryComponents: [
    Canvas,
    Colors,
    Figure,
    Range,
    DragBox,
    scrawl,
    FigureComp,
    Crop,
    Edit,
    Tool,
    Cropbox
  ],
  imports: [
    IonicModule,
    DirectivesModule
  ],
  providers : [
    DrawService,
    ToolsService
  ],
  exports: [
    Edit,
    DirectivesModule
  ]
})
export class ComponentModule {}
