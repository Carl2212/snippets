import { Directive, ElementRef, Renderer2, Output, EventEmitter, Input } from "@angular/core";
import { Gesture } from "ionic-angular";
@Directive({
  selector: '[scale]'
})

export class ScaleDirector{

  private gesture : Gesture;
  private transforms: Array<string>;
  //最终状态
  finalStateScale : number = 1;
  finalStateDeltaX : number = 0;
  finalStateDeltaY : number = 0;

  //临时状态
  currentScale: number = 1;
  currentDeltaX: number = 0;
  currentDeltaY : number = 0;

  private _scale: any = 1;
  @Input('scale')
  set scale(val: any){
    if(val) {
      this._scale = val;
      this.finalStateScale = this._scale;
      this.render(this.finalStateScale);
    }
  }
  get scale() {
    return this._scale;
  }

  @Output() startScale : EventEmitter<any> = new EventEmitter<any>();
  @Output() endScale : EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private el: ElementRef,
    private renderer : Renderer2
  ) {
  }

  ngAfterViewInit() {
    this.gesture = new Gesture(this.el.nativeElement);
    this.gesture.listen();
    this.gesture.on('pinch',e=>{
      this.startScale.emit(true);
      this.currentScale = this.finalStateScale * e.scale;
      this.currentDeltaX = this.finalStateDeltaX + (e.deltaX / this.currentScale);
      this.currentDeltaY = this.finalStateDeltaY + (e.deltaY / this.currentScale);
      if(this.currentScale < this.scale) {
        this.currentScale = this.scale;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
        this.endScale.emit(this.currentScale);
      }
      this.render(this.currentScale,this.currentDeltaX,this.currentDeltaY);
    });

    this.gesture.on('pinchend',e=>{
      this.finalStateScale = this.currentScale;
      this.finalStateDeltaX = this.currentDeltaX;
      this.finalStateDeltaY = this.currentDeltaY;
    });

    this.gesture.on('panend',e=>{
      this.finalStateScale = this.currentScale;
      this.finalStateDeltaX = this.currentDeltaX;
      this.finalStateDeltaY = this.currentDeltaY;
    });
  }
  render(scale: number=1,deltaX: number=0 ,deltaY: number= 0) {
    let style = this.el.nativeElement.style.transform;
    if(style){
      style = (style.replace(/scale\([^\)]+\)|translate\([^\)]+\)/g,'')).trim();
    }
    this.transforms = style ? [style] : [];
    this.transforms.push(`scale(${scale})`);
    this.transforms.push(`translate(${deltaX}px, ${deltaY}px)`);
    this.renderer.setStyle(this.el.nativeElement,'transform',this.transforms.join(' '));
  }
  ngOnDestroy() {
    this.gesture.unlisten();
    this.gesture.destroy();
  }
}
