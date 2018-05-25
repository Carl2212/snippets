import { Component, ViewChild, Renderer2 } from '@angular/core';
import { Gesture, IonicPage } from 'ionic-angular';
import { ToolsService } from "./tools/tools.service";

@IonicPage()
@Component({
  selector: 'image-edit',
  templateUrl: 'imageedit.html'
})
export class ImageEdit {

  @ViewChild('img') element;
  @ViewChild('imgParent') container;
  @ViewChild('cs') cs;
  gesture : Gesture;

  imageUrl : string = 'assets/imgs/demo.jpg';
  iHeight : number;
  iWidth : number;

  //调整大小 ： 这次 - 上次（距离） / 这次 / 上次 （放大缩小倍数）
  finalStateScale : number = 1;
  finalStateDeltaX : number = 0 ;
  finalStateDeltaY : number = 0 ;

  //最终态
  currentScale : number;
  currentDeltaX : number;
  currentDeltaY : number;

  transforms : Array<string>;

  isEdit : boolean = false;

  constructor(
    private render : Renderer2,
    public tool : ToolsService
  ) {

  }
  ionViewDidEnter() {
    this.init();
    this.initGesture();
  }
  init() {
    this.iHeight = this.element.nativeElement.height;
    this.iWidth = this.element.nativeElement.width;
  }
  initGesture() {
    this.gesture = new Gesture(this.element.nativeElement);

    this.gesture.listen();

    this.gesture.on('doubletap' , e => {
      this.transforms = [];
      this.finalStateScale += 1;
      if(this.finalStateScale > 4) this.finalStateScale = 1;
      this.transforms.push(`scale(` + this.finalStateScale + ')');
      this.render.setStyle(this.container , 'transform' , this.transforms.join(' '));
    });

    this.gesture.on('pinch',e=> {
      this.transforms = [];
      this.currentScale = this.finalStateScale * e.scale;
      this.currentDeltaX = this.finalStateDeltaX + (e.deltaX / this.currentScale );
      this.currentDeltaY = this.finalStateDeltaY + (e.deltaY / this.currentScale );

      if(this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push(`scale(${this.currentScale})`);
      this.transforms.push(`translate(${this.currentDeltaX}px,${this.currentDeltaY}px)`);
      this.render.setStyle(this.container.nativeElement , 'transform' , this.transforms.join(' '));
    });

    this.gesture.on('pinchend' , e =>{
      this.finalStateScale = this.currentScale;
      this.finalStateDeltaX = this.currentDeltaX;
      this.finalStateDeltaY = this.currentDeltaY;
    });
    this.gesture.on('panend' , e =>{
      this.finalStateScale = this.currentScale;
      this.finalStateDeltaX = this.currentDeltaX;
      this.finalStateDeltaY = this.currentDeltaY;
    });
  }
  listenEdit(){
    console.log('...........');
    this.isEdit = !this.isEdit;
    if(this.isEdit) {
      //重新 初始化图片大小
      this.render.removeStyle(this.container.nativeElement , 'transform');
    }else{
      this.imageUrl = this.cs.canvas.nativeElement.toDataURL('image/png');
      //调用cordova 保存到本地文件上

      this.initGesture();
    }
  }

}
