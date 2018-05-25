import { Component, ViewChild, Renderer2, Input } from '@angular/core';
import { NavController, Gesture } from 'ionic-angular';
import { ToolsService } from "../tools/tools.service";

@Component({
  selector: 'canvas-comp',
  templateUrl: 'canvas.html'
})
export class Canvas {

  @ViewChild('canvas') canvas;
  @ViewChild('dragBox') dragBox;
  @ViewChild('pointLayer') pointLayer;
  @ViewChild('textArea') textArea;
  gesture : Gesture;
  cs : any;

  canDrag: boolean;
  canScale: boolean;
  gap : any;
  private _iHeight : number;
  @Input() imageUrl : string;
  @Input() iWidth : number;
  @Input()
  set iHeight(val : number) {
    this._iHeight = val;
    if(this._iHeight) {
      this.initCanvas();
    }
  }
  get iHeight() : number {
    return this._iHeight;
  }
  constructor(
    public navCtrl: NavController,
    private render : Renderer2,
    private tool: ToolsService
  ) {
  }
  initCanvas() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    this.cs = this.canvas.nativeElement.getContext('2d');
    this.render.setStyle(this.canvas.nativeElement,'width',`${this.iWidth}px`);
    this.render.setStyle(this.canvas.nativeElement,'height',`${this.iHeight}px`);
    this.canvas.nativeElement.height = this.iHeight * devicePixelRatio;
    this.canvas.nativeElement.width = this.iWidth * devicePixelRatio;
    this.cs.scale(devicePixelRatio , devicePixelRatio);
    let image = new Image();
    image.onload = ()=>{
      this.cs.drawImage(image,0,0,this.iWidth,this.iHeight);
      this.gestureEvent();
    }
    image.src = this.imageUrl;
  }
  pointerEvents(){
    //tap 触发事件设置层穿透 tap事件之后会自动触发click事件此时作用在下层元素上。400毫秒后click事件触发完了再把层穿透关闭
    this.render.addClass(this.pointLayer.nativeElement,'pointerNone');
    setTimeout(()=>{
      this.render.removeClass(this.pointLayer.nativeElement,'pointerNone');
    },400);
  }
  gestureEvent() {
    this.gesture = new Gesture(this.pointLayer.nativeElement);
    this.gesture.listen();
    this.gesture.on('panstart' , e=>{
      let x =  this.getOffset(e);
      let y =  this.getOffset(e,false);
      this[this.tool.action](x,y,'panstart');
    });
    this.gesture.on('pan' , e=>{
      let x = this.getOffset(e);
      let y = this.getOffset(e,false);
      this[this.tool.action](x,y,'pan');
    });
    this.gesture.on('panend' , e=>{
      let x = this.getOffset(e);
      let y = this.getOffset(e,false);
      this[this.tool.action](x,y,'panend');
    });
  }

  draw(x,y,event) {
    switch (event){
      case 'panstart':
        this.cs.strokeStyle= this.tool.color;
        this.cs.lineWidth = this.tool.lineWidth;
        this.cs.beginPath();
        this.cs.moveTo(x , y);
        this.cs.lineTo(x , y);
        this.cs.stroke();
        break;
      case 'pan':
        this.cs.lineTo(x , y);
        this.cs.stroke();
        break;
      case 'panend':
        this.cs.lineTo(x , y);
        this.cs.stroke();
        this.cs.closePath();
        break;
      default:
        console.log(event);
        break;
    }
  }
  cut() {

  }
  font(x,y,event) {
    switch (event){
      case 'panstart':
        this.canDrag = true;
        this.gap = this.dragBox.getpointToElement(x,y);
        break;
      case 'pan':
        if(this.canDrag) {
          this.dragBox.move(x,y);
        }
        break;
      case 'panend':
        if(this.canDrag) {
          this.dragBox.move(x,y);
          this.canDrag = false;
        }
        break;
      default:
        console.log(event);
        break;
    }
  }
  square() {

  }


  getOffset(event : any , isX : boolean = true) {

    if(event.srcEvent.offsetX) {
      return isX ? event.srcEvent.offsetX : event.srcEvent.offsetY;
    }else{
      return isX ? event.srcEvent.layerX+1 : event.srcEvent.layerY;
    }
  }

}

