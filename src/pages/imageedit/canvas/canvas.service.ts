
import { lineStatus, textStatus, point, ActionStruct, FigureStatus } from "../tools/tools.service";
import { CHOSEDFIGURE } from "../config/color.list";
import { getRadius } from "../figure/figure";
import { Renderer2, ElementRef } from "@angular/core";
/**
 * Created by Ellen on 16/7/2018.
 *
 */

export class CanvasService{
  public cs: any;
  private renderer: Renderer2;
  private canvas: any;
  static width: number= 0;
  static height: number= 0;
  constructor(
    renderer: Renderer2,
    canvas: ElementRef
  ) {
    this.renderer = renderer;
    this.canvas = canvas;
    this.canvasInit(canvas);
  }

  toDataURL() {
    return this.canvas.nativeElement.toDataURL('image/jpeg');
  }

  canvasInit(canvas: ElementRef) {
    this.cs = canvas.nativeElement.getContext('2d');
    this.renderer.setStyle(canvas.nativeElement,'width',`${CanvasService.width}px`);
    this.renderer.setStyle(canvas.nativeElement,'height',`${CanvasService.height}px`);

    let r = this.PixelRatio();
    canvas.nativeElement.height = CanvasService.height * r;
    canvas.nativeElement.width = CanvasService.width * r;
    this.cs.scale(r,r);
    return this;
  }

  PixelRatio() {
    return window.devicePixelRatio || 1;
  }

  drawLine(l: lineStatus) {
    if(l.pointGroup.length > 0) {
      this.cs.save();
      this.cs.strokeStyle = l.color;
      this.cs.lineWidth = l.lineWidth;
      this.cs.beginPath();
      this.cs.moveTo(l.pointGroup[0].x,l.pointGroup[0].y);
      l.pointGroup.forEach((p: point)=>{
        this.cs.lineTo(p.x,p.y);
      })
      this.cs.stroke();
      this.cs.closePath();
      this.cs.restore();
    }
  }

  drawText(t:textStatus) {
    this.cs.save();
    this.cs.font = t.font+'px Helvetica Neue';
    this.cs.fillStyle = t.color;
    if(t.boxRotate) {
      let centerPoint = {x: t.boxLeft+t.boxWidth/2 , y: t.boxTop+t.font/2};
      this.cs.translate(centerPoint.x,centerPoint.y);
      this.cs.rotate(t.boxRotate*Math.PI/180);
      this.cs.translate(-centerPoint.x,-centerPoint.y);
    }
    this.wrapText(t.content,t.boxLeft,t.boxTop,t.boxWidth,t.font);
    this.cs.restore();
  }

  private wrapText(content,x,y,maxWidth,lineHeight) {
    let lastSubStrIndex= 0;
    let lineWidth= 0;
    for(let i =0 ;i <content.length; i++) {
      lineWidth+= this.cs.measureText(content[i]).width;
      if(lineWidth > maxWidth) {
        this.cs.fillText(content.substr(lastSubStrIndex,i),x,y);
        y+= lineHeight;
        lastSubStrIndex = i;
        lineWidth = 0;
      }
      if(i == content.length-1) {
        this.cs.fillText(content.substr(lastSubStrIndex,i+1),x,y);
      }
    }
  }
  drawFigure(data: any) {
    switch(data.figure) {
      case 1 :
        this.drawRect(data);
        break;
      case 2 :
        this.drawCircle(data);
        break;
      case 3 :
        this.drawArrows(data);
        break;
      case 4 :
        this.drawHeart(data);
        break;
      case 5 :
        this.drawAlertBox(data);
        break;
      default:
        break;
    }
  }
  drawRect(r: FigureStatus) {
    this.cs.save();
    this.cs.beginPath();
    this.cs.strokeStyle = r.color;
    this.cs.lineWidth = r.lineWidth;
    let W = r.endPoint.x - r.point.x;
    let H = r.endPoint.y - r.point.y;
    this.cs.rect(r.point.x,r.point.y,W,H);
    this.cs.stroke();
    this.cs.closePath();
    this.cs.restore();
  }

  drawCircle(c: FigureStatus) {
    this.cs.save();
    this.cs.beginPath();
    this.cs.strokeStyle = c.color;
    this.cs.lineWidth = c.lineWidth;
    let R = getRadius(c.point,c.endPoint);
    this.cs.arc(c.point.x,c.point.y,R,0,2*Math.PI);
    this.cs.stroke();
    this.cs.closePath();
    this.cs.restore();
  }

  drawHeart(c: FigureStatus) {
    this.cs.save();
    this.cs.beginPath();
    this.cs.strokeStyle = c.color;
    this.cs.lineWidth = c.lineWidth;
    let R = getRadius(c.point,c.endPoint);
    this.cs.arc(c.point.x,c.point.y,R,0,2*Math.PI);
    this.cs.stroke();
    this.cs.closePath();
    this.cs.restore();
  }

  drawAlertBox(c: FigureStatus) {
    this.cs.save();
    this.cs.beginPath();
    this.cs.strokeStyle = c.color;
    this.cs.lineWidth = c.lineWidth;
    let P = c.point;
    let E = c.endPoint;
    console.log(P,E);
    let W = Math.abs(P.x - E.x);
    let H = Math.abs(P.y - E.y);
    let L = Math.min(P.x,E.x);
    let T = Math.min(P.x,E.x);
    let p1 = {x : L , y: T+(H/2)};
    let p2 = {x : L+(W/2) , y: T};
    let p3 = {x : L+W , y: T+(H/2)};

    let p4 = {x : L+(W/2) , y: T+(4*H/5)};
    let p5 = {x : L+(W/7) , y: T+H};
    let p6 = {x : L+(W/4) , y: T+(4*H/5)};

    let k1 = {x : L , y: T};
    let k2 = {x : L+W , y: T};
    let k3 = {x : L+W , y: T+(4*H/5)};
    let k4 = {x : L , y: T+(4*H/5)};
    let k5 = {x : L+(W/4) , y: T+H};
    let k6 = {x : L+(W/4) , y: T+H};


    this.cs.moveTo(p1.x,p1.y);
    this.cs.quadraticCurveTo(k1.x,k1.y,p2.x,p2.y);
    this.cs.quadraticCurveTo(k2.x,k2.y,p3.x,p3.y);
    this.cs.quadraticCurveTo(k3.x,k3.y,p4.x,p4.y);
    this.cs.quadraticCurveTo(k5.x,k5.y,p5.x,p5.y);
    this.cs.quadraticCurveTo(k6.x,k6.y,p6.x,p6.y);
    this.cs.quadraticCurveTo(k4.x,k4.y,p1.x,p1.y);
    this.cs.stroke();
    this.cs.closePath();
    this.cs.restore();
  }

  drawArrows(c: FigureStatus) {
    this.cs.save();
    this.cs.beginPath();
    this.cs.strokeStyle = c.color;
    this.cs.lineWidth = c.lineWidth;
    let P = c.point;
    let EP = c.endPoint;
    let point = {x : P.x+(EP.x-P.x)*3/4,y: c.point.y+(EP.y-P.y)*3/4};
    this.cs.moveTo(P.x,P.y);
    this.cs.lineTo(EP.x,EP.y);

    this.cs.translate(EP.x,EP.y);
    this.cs.rotate(-30*Math.PI/180);
    this.cs.translate(-EP.x,-EP.y);

    this.cs.moveTo(EP.x,EP.y);
    this.cs.lineTo(point.x,point.y);

    this.cs.translate(EP.x,EP.y);
    this.cs.rotate(60*Math.PI/180);
    this.cs.translate(-EP.x,-EP.y);

    this.cs.moveTo(EP.x,EP.y);
    this.cs.lineTo(point.x,point.y);

    this.cs.stroke();
    this.cs.closePath();
    this.cs.restore();
  }

  draw(a:ActionStruct) {
    if(this[a.action]){
      this[a.action](a.data);
    }
  }

  clear() {
    this.cs.clearRect(0,0,CanvasService.width,CanvasService.height);
  }

  isTouchInGraph(point: point,path: any) {
    let x = point.x * this.PixelRatio();
    let y = point.y * this.PixelRatio();
    if(this.cs.isPointInPath(x,y)) {
      this.cs.strokeStyle= CHOSEDFIGURE;
      this.cs.stroke();
      return true;
    }
    return false;
  }
}



export function getOffset(event : any) {
  if(event) {
    let changedTouches = event.changedTouches;
    if(changedTouches && changedTouches.length > 0) {
      let touch= changedTouches[0];
      return {x: touch.clientX, y: touch.clientY};
    }
    var pageX = event.pageX;
    if(pageX != undefined) {
      return {x: pageX, y: event.pageY};
    }
  }
  return {x : 0, y: 0}
}
