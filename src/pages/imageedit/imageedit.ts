import {Component, ViewChild} from '@angular/core';
import {NavController, Gesture} from 'ionic-angular';

@Component({
  selector: 'image-edit',
  templateUrl: 'imageedit.html'
})
export class ImageEdit {

  @ViewChild('img') element;
  @ViewChild('imgParent') container;
  gesture : Gesture;

  //调整大小 ： 这次 - 上次（距离） / 这次 / 上次 （放大缩小倍数）
  finalStateScale : number = 1;
  finalStateDeltaX : number = 0 ;
  finalStateDeltaY : number = 0 ;

  //最终态
  currentScale : number;
  currentDeltaX : number;
  currentDeltaY : number;

  transforms : Array<string>;

  constructor(public navCtrl: NavController) {

  }
  ngOnInit() {
    console.log(this.container);
    // this.container.addEventListener('touchstart' , (e)=>{
    //   e.preventDefault();
    // });

    this.initGesture();
  }
  initGesture() {
    console.log('initGesture');
    this.gesture = new Gesture(this.element.nativeElement);

    this.gesture.listen();

    this.gesture.on('doubletap' , e => {
      console.log('doubletap');
      this.transforms = [];
      this.finalStateScale += 1;
      if(this.finalStateScale > 4) this.finalStateScale = 1;
      this.transforms.push(`scale(` + this.finalStateScale + ')');
      this.container.nativeElement.style.transform = this.transforms.join(' ');
    });

    this.gesture.on('pinch',e=> {
      console.log(e);
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
      this.container.nativeElement.style.transform = this.transforms.join(' ');
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

}
