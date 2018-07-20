import { Component, ViewChild, Renderer2, Output, EventEmitter } from "@angular/core";
import { ToolsService, point } from "../tools/tools.service";
import { Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/gestures/ui-event-manager";
import { getOffset } from "../canvas/canvas.service";

export function deg(p1: point , p2: point) {
  return (p1.y - p2.y)/(p1.x - p2.x);
}
@Component({
  selector : 'dragbox',
  template : `
    <div class="drag-box" #dragBox>
      <span class="point right" id="scale"></span>
      <button round ion-button small class="left-top"  (click)="close()">
        <ion-icon name="close"></ion-icon>
      </button>
       <button round ion-button small class="right-top" (click)="save()">
        <ion-icon name="checkmark"></ion-icon>
      </button>
      <button round ion-button small class="left-bottom" (click)="add()">
        <ion-icon name="add"></ion-icon>
      </button>
       <button round ion-button small class="right-bottom">
        <ion-icon name="sync" id="rotate"></ion-icon>
      </button>
     <ng-content></ng-content>
    </div>
  `
})
export class DragBox {

  @ViewChild('dragBox') dragBox;
  @ViewChild('scaleRight') scaleRight;
  @ViewChild('scaleLeft') scaleLeft;
  public gap : {gapX: number; gapY: number};
  transform : number;
  @Output('drag') drag= new EventEmitter<any>();
  private events: UIEventManager;
  private padding: number = 10;
  private origin : point;
  private lastPoint: point;
  constructor(
    private render : Renderer2,
    private tool : ToolsService,
    private plt: Platform
  ){}
  init() {
    this.renderer();
    this.tool.reset();
  }
  ngAfterViewInit() {
    this.init();
    this.events = new UIEventManager(this.plt);
    this.events.pointerEvents({
      element: this.dragBox.nativeElement,
      pointerDown: this.onDragStart.bind(this),
      pointerMove: this.onDragMove.bind(this),
      pointerUp: this.onDragEnd.bind(this)
    });
  }
  add() {
    this.dragboxFormat();
    this.tool.save();
    this.init();
  }
  save() {
    this.dragboxFormat();
    this.tool.save();
    this.close();
  }
  close() {
    this.tool.action = null;
  }
  dragboxFormat() {
    this.tool.boxLeft = this.tool.boxLeft + this.padding;
    this.tool.boxTop = this.tool.boxTop + this.padding + this.tool.font;
    this.tool.boxWidth = this.tool.boxWidth - (this.padding *2);
  }
  onDragMove(e) {
    let offset = getOffset(e);
    if(!this.transform){
      this.tool.boxLeft = offset.x - this.gap.gapX;
      this.tool.boxTop = offset.y - this.gap.gapY;
      this.renderer();
    }else if(this.transform == 1){
      this.tool.boxWidth = offset.x - this.tool.boxLeft;
      this.renderer();
    }else if(this.transform == 2) {
      let k1 = deg(this.origin,this.lastPoint);
      let k2 = deg(this.origin,offset);
      let r = Math.atan((k1 - k2)/(1 + (k1*k2)));
      r = r*180/Math.PI;
      this.tool.boxRotate = this.tool.boxRotate || 0;
      this.tool.boxRotate = (this.tool.boxRotate - r) % 360;
      this.renderer();
    }
    this.lastPoint = offset;
  }
  setScale(type: number) {
    this.transform = type;
  }
  renderer() {
    if(this.tool.boxTop) {
      this.render.setStyle(this.dragBox.nativeElement,'top',`${this.tool.boxTop}px`);
    }
    if(this.tool.boxLeft) {
      this.render.setStyle(this.dragBox.nativeElement,'left',`${this.tool.boxLeft}px`);
    }
    if(this.tool.boxHeight) {
      this.render.setStyle(this.dragBox.nativeElement,'height',`${this.tool.boxHeight}px`);
    }
    if(this.tool.boxWidth) {
      this.render.setStyle(this.dragBox.nativeElement,'width',`${this.tool.boxWidth}px`);
    }
    if(this.tool.boxRotate) {
      console.log(this.tool.boxRotate);
      this.render.setStyle(this.dragBox.nativeElement,'transform',`rotate(${this.tool.boxRotate}deg)`);
    }
  }
  onDragStart(e) {
    let offset =  getOffset(e);
    this.lastPoint = offset;
    if(e.target.id == 'scale') {
      this.setScale(1);
    }else if(e.target.id == 'rotate'){
      this.getOrigin(offset);
      this.setScale(2);
    }else{
      let L = this.dragBox.nativeElement.offsetLeft;
      let T = this.dragBox.nativeElement.offsetTop;
      this.gap = {gapX : offset.x - L , gapY : offset.y - T};
    }
    return true;
  }

  getOrigin(point : point) {
    let x = this.tool.boxLeft + (this.tool.boxWidth/2);
    let y = this.tool.boxTop + (this.tool.boxTop/2);
    this.origin = {x : x , y: y};
  }
  onDragEnd(e) {
    this.setScale(0);
  }

  getNativeElement() {
    return this.dragBox.nativeElement;
  }
}
