import { Component, ViewChild, Renderer2 } from "@angular/core";
import { ToolsService } from "../tools/tools.service";
@Component({
  selector : 'dragbox',
  template : `
    <div class="drag-box" #dragBox>
     <span #scaleTop class="point top" tappable (click)="scale= 'top'"></span>
     <span #scaleRight class="point right" tappable (click)="scale='right'"></span>
     <span #scaleBottom class="point bottom" tappable (click)="scale='bottom'"></span>
     <span #scaleLeft class="point left" tappable (click)="scale='left'"></span>
     <ng-content></ng-content>
    </div>
  `
})
export class DragBox {

  @ViewChild('dragBox') dragBox;
  @ViewChild('scaleTop') scaleTop;
  @ViewChild('scaleRight') scaleRight;
  @ViewChild('scaleBottom') scaleBottom;
  @ViewChild('scaleLeft') scaleLeft;
  public gap : {gapX: number; gapY: number};
  scale : string;
  constructor(
    private render : Renderer2,
    private tool : ToolsService
  ){}

  move(x,y) {
    console.log(this.scale);
    if(!this.scale){
      this.tool.boxLeft = x - this.gap.gapX;
      this.tool.boxTop = y - this.gap.gapY;
      this.renderer(this.tool.boxTop,this.tool.boxLeft);
    }else{
      switch (this.scale) {
        case 'top':
          let T = this.scaleTop.nativeElement.offsetTop;
          let H = this.dragBox.nativeElement.clientHeight + (y - T);
          this.renderer(y,0,H,0);
          this.tool.boxTop = y;
          break;
        case 'right':
          let R = this.scaleRight.nativeElement.offsetLeft;
          let W = this.dragBox.nativeElement.clientWidth + (x - R);
          this.renderer(0,0,0,W);
          break;
        case 'bottom':
          let B = this.scaleBottom.nativeElement.offsetTop;
          let H = this.dragBox.nativeElement.clientHeight + (y - B);
          this.renderer(0,0,H,0);
          break;
        case 'left':
          let L = this.scaleLeft.nativeElement.offsetLeft;
          let W = this.dragBox.nativeElement.clientWidth + (x - L);
          this.renderer(0,x,0,W);
          this.tool.boxLeft = x;
          break;
        default:
          break;
      }
    }

  }
  renderer(top: number, left? : number, height?: number, width? : number) {
    if(top) {
      this.render.setStyle(this.dragBox.nativeElement,'top',`${top}px`);
    }
    if(left) {
      this.render.setStyle(this.dragBox.nativeElement,'left',`${left}px`);
    }
    if(height) {
      this.render.setStyle(this.dragBox.nativeElement,'height',`${height}px`);
    }
    if(width) {
      this.render.setStyle(this.dragBox.nativeElement,'width',`${width}px`);
    }
  }
  getpointToElement(x,y) {

    let L = this.dragBox.nativeElement.offsetLeft;
    let T = this.dragBox.nativeElement.offsetTop;
    this.gap = {gapX : x - L , gapY : y - T};
  }
  isScalePoint(x: number, y: number, x1: number, y1: number) {
    let isTop = Math.sqrt(Math.pow((x - x1),2) + Math.pow((y - y1),2));
  }

}
