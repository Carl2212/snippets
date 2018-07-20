import { Component, ViewChild, Renderer2 } from "@angular/core";
import { ToolsService, point, lineStatus } from "../tools/tools.service";
import { Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/es2015/gestures/ui-event-manager";
import { CanvasService } from "../canvas/canvas.service";
import { DrawService } from "../canvas/drawService";
/**
 * Created by itwo on 16/7/2018.
 */
@Component({
  selector: 'scrawl-comp',
  template: `<canvas #canvasScrawl class="canvas"></canvas>`
})
export class scrawl{

  @ViewChild('canvasScrawl') canvasScrawl;
  private events: UIEventManager
  scrawl: any;

  point : point;
  constructor(
    private tool: ToolsService,
    private dw: DrawService,
    private plt: Platform,
    private renderer: Renderer2
  ){}

  ngOnInit(){
    this.scrawl = new CanvasService(this.renderer,this.canvasScrawl);
    this.gestureEvent();
  }
  ngOnDestory() {
    this.scrawl.clear();
  }

  gestureEvent() {
    this.events = new UIEventManager(this.plt);
    this.events.pointerEvents({
      element: this.canvasScrawl.nativeElement,
      pointerDown: this.onDrawStart.bind(this),
      pointerMove: this.onDraw.bind(this),
      pointerUp: this.onDrawEnd.bind(this)
    });
  }
  getDrawData(): lineStatus {
    return {
      color: this.tool.color,
      lineWidth : this.tool.lineWidth,
      pointGroup: this.tool.pointGroup
    }
  }
  onDrawStart(ev) {
    let offset = this.dw.offsetFormat(ev);
    this.scrawl.clear();
    this.tool.pointGroup = [{x: offset.x, y:offset.y }];
    this.scrawl.drawLine(this.getDrawData());
    return true;
  }
  onDraw(ev) {
    let offset = this.dw.offsetFormat(ev);
    this.scrawl.clear();
    this.tool.pointGroup.push({x: offset.x, y: offset.y});
    this.scrawl.drawLine(this.getDrawData());
  }
  onDrawEnd(ev) {
    let offset = this.dw.offsetFormat(ev);
    this.scrawl.clear();
    this.tool.pointGroup.push({x: offset.x, y: offset.y});
    this.tool.save();
  }
}
