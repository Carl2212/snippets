import { Component, ViewChild, Renderer2, Input, ViewChildren, QueryList } from '@angular/core';
import { NavController, Gesture } from 'ionic-angular';

@Component({
  selector: 'canvas-comp',
  templateUrl: 'canvas.html'
})
export class Canvas {

  @ViewChild('canvas') canvas;
  @ViewChildren('colorItem') colorItem : QueryList<any>;
  gesture : Gesture;
  cs : any;

  private _iHeight : number;
  @Input() color : string;
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
    private render : Renderer2
  ) {
  }
  initCanvas() {
    let devicePixelRatio = window.devicePixelRatio || 1;
    this.cs = this.canvas.nativeElement.getContext('2d');
    console.log(this.iHeight , this.iWidth);
    this.render.setStyle(this.canvas.nativeElement,'width',`${this.iWidth}px`);
    this.render.setStyle(this.canvas.nativeElement,'height',`${this.iHeight}px`);
    this.canvas.nativeElement.height = this.iHeight * devicePixelRatio;
    this.canvas.nativeElement.width = this.iWidth * devicePixelRatio;
    this.cs.scale(devicePixelRatio , devicePixelRatio);
    let image = new Image();
    image.onload = ()=>{
      this.cs.drawImage(image,0,0,this.iWidth,this.iHeight);
      this.gesture = new Gesture(this.canvas.nativeElement);
      this.gesture.listen();
      this.gesture.on('panstart' , e=>{
        let x =  this.getOffset(e);
        let y =  this.getOffset(e,false);
        this.cs.strokeStyle= this.color;
        this.cs.beginPath();
        this.cs.moveTo(x , y);
        this.cs.lineTo(x , y);
        this.cs.stroke();
      });
      this.gesture.on('pan' , e=>{
        let x = this.getOffset(e);
        let y = this.getOffset(e,false);
        this.cs.lineTo(x , y);
        this.cs.stroke();
      });
      this.gesture.on('panend' , e=>{
        let x = this.getOffset(e);
        let y = this.getOffset(e,false);
        this.cs.lineTo(x , y);
        this.cs.stroke();
        this.cs.closePath();
      });
    }
    image.src = this.imageUrl;
  }

  getOffset(event : any , isX : boolean = true) {
    if(event.srcEvent.offsetX) {
      return isX ? event.srcEvent.offsetX : event.srcEvent.offsetY;
    }else{
      return isX ? event.srcEvent.layerX+1 : event.srcEvent.layerY;
    }
  }
}

