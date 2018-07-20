import { Component } from "@angular/core";
import { ToolsService } from "./tools.service";
import { toollist } from "../config/tool.list";
import { DrawService } from "../canvas/drawService";
@Component({
  selector : 'tools',
  templateUrl : 'tools.html'
})
export class Tools {
  public toollist: any = toollist;
  public isShowSubTool : boolean;
  constructor(
    private tool : ToolsService,
    private dw: DrawService
  ){}

  toggleTools(l) {
    this.isShowSubTool = true;
    if(l.idx == 5) {
      this.dw.canvasStack.pop();
      this.dw.drawAll();
    }else{
      this.tool.action=l;
      this.tool.reset();
    }
  }
  closeAction() {
    this.isShowSubTool = false;
  }
}
