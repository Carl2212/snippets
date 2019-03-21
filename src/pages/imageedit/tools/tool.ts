import { Component, Input } from "@angular/core";
import { ToolsService } from "./tools.service";
import { DrawService } from "../canvas/drawService";
import { toollist } from "../config/tool.list";
/**
 * Created by itwo on 21/3/2019.
 */

@Component({
  selector: 'tool',
  templateUrl: './tool.html'
})
export class Tool {
  public toollist: any = toollist;
  public isShowSubTool : boolean;

  constructor(
    private dw : DrawService,
    private tool : ToolsService
  ) {
  }

  toggleTools(l) {
    this.isShowSubTool = true;
    if(l.idx == 5) {
      this.dw.canvasStack.pop();
      this.dw.drawAll();
    }else{
      console.log(l);
      this.tool.action=l;
      this.tool.reset();
    }
  }
  closeAction() {
    this.isShowSubTool = false;
  }
}
