import { Component, ViewChild, Renderer2 } from "@angular/core";
import { ToolsService, point } from "../tools/tools.service";
import { Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/es2015/gestures/ui-event-manager";
import { CanvasService } from "../canvas/canvas.service";
import { CHOSEDFIGURE } from "../config/color.list";
import { deepCopy } from "ionic-angular/es2015/util/util";
import { DrawService } from "../canvas/drawService";


export function getRadius(point : point,point1 : point) {
  if(!point || !point1) {
    return 0;
  }
  let dx= Math.abs(point.x - point1.x);
  let dy= Math.abs(point.y - point1.y);
  return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
}
/**
 * Created by itwo on 16/7/2018.
 */
@Component({
  selector: 'figure-comp',
  template: `<canvas #canvasFigure class="canvas"></canvas>`
})
export class FigureComp{

  @ViewChild('canvasFigure') canvasFigure;
  private events: UIEventManager
  figure: any;

  dragPoint: point;
  canDrag: boolean;
  constructor(
    private tool: ToolsService,
    private dw: DrawService,
    private plt: Platform,
    private renderer: Renderer2
  ){}

  ngOnInit(){
    this.figure = new CanvasService(this.renderer,this.canvasFigure);
    this.gestureEvent();
  }
  ngOnDestory() {
    this.figure.clear();
  }
  gestureEvent() {
    this.events = new UIEventManager(this.plt);
    this.events.pointerEvents({
      element: this.canvasFigure.nativeElement,
      pointerDown: this.onDrawStart.bind(this),
      pointerMove: this.onDraw.bind(this),
      pointerUp: this.onDrawEnd.bind(this)
    });
  }

  onDrawStart(ev) {
    let offset = this.dw.offsetFormat(ev);
    this.dragPoint = {x: offset.x, y:offset.y };
    this.canDrag = this.figure.isTouchInGraph(this.dragPoint);
    if(this.canDrag) {
      this.dw.canvasStack.pop();
      this.dw.drawAll();
    }
    return true;
  }
  onDraw(ev) {
    this.draw(ev);
  }
  onDrawEnd(ev) {
    this.draw(ev);
    this.tool.save();
    this.canDrag= false;
    this.figure.clear();
  }
  draw(ev){
    let offset = this.dw.offsetFormat(ev);
    this.figure.clear();
    let P: point;
    let EP: point;
    if(this.canDrag) {
      let mx = offset.x - this.dragPoint.x;
      let my = offset.y - this.dragPoint.y;
      this.dragPoint = {x:offset.x,y:offset.y};
      P = {x: this.tool.point.x + mx , y: this.tool.point.y + my};
      EP = {x: this.tool.endPoint.x + mx , y: this.tool.endPoint.y + my};
    }else{
      P = this.dragPoint;
      EP = offset;
    }
    P && (this.tool.point = P);
    EP && (this.tool.endPoint = EP);
    let d= deepCopy(this.tool.getParameter());
    if(this.canDrag) {
      d.color = CHOSEDFIGURE;
    }
    this.figure.drawFigure(d);
  }
}
