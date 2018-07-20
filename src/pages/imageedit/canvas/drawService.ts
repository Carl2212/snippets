import { Injectable } from "@angular/core";
import { ActionStruct } from "../tools/tools.service";
import { getOffset } from "./canvas.service";
/**
 * Created by Ellen on 20/7/2018.
 */

@Injectable()
export class DrawService {
  canvasStack: Array<ActionStruct>=[];
  canvasTop: number = 0;
  canvasLeft: number = 0;
  public cs: any;

  constructor(
  ) {}

  drawAll(){
    this.cs.clear();
    if(this.canvasStack.length > 0) {
      this.canvasStack.forEach((s)=>{
        this.cs.draw(s);
      })
    }
  }

  offsetFormat(ev) {
    let point = getOffset(ev);
    if(point) {
      return {x: point.x - this.canvasLeft ,y: point.y - this.canvasTop};
    }
    return {x: 0 ,y: 0}
  }

}
