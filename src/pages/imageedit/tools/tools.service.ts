/**
 * Created by itwo on 23/5/2018.
 */
import { Injectable } from "@angular/core";
import { ToolStruct } from "../config/tool.list";
import { DrawService } from "../canvas/drawService";

export interface ActionStruct {
  action : string;
  data: any;
}
export interface point {
  x: number;
  y: number;
}

export interface lineStatus {
  color: string;
  lineWidth : number;
  pointGroup: Array<point>
}

export interface textStatus {
  boxLeft: number;
  boxTop:number;
  boxHeight : number;
  boxWidth : number;
  boxRotate: number;
  font: number;
  color: string;
  content: string;
}

export interface FigureStatus {
  color: string;
  lineWidth : number;
  point: point;
  endPoint : point;
  figure: number;
}

export interface CropStatus {
  crop : number;
  cropLeft : number;
  cropTop : number;
  cropWidth : number;
  cropHeight : number;
}

@Injectable()
export class ToolsService implements lineStatus , textStatus, FigureStatus, CropStatus{

  action: ToolStruct;
  //base
  lineWidth : number;
  font: number;
  color: string;


  //lineStatus
  pointGroup: Array<point>;

  //textStatus
  boxLeft: number;
  boxTop:number;
  boxHeight : number;
  boxWidth : number;
  boxRotate: number;
  content: string;

  //reactStatus and circleStatus
  figure: number;
  figureFill: boolean;
  point: point;
  endPoint: point;

  crop: number;
  cropLeft : number;
  cropTop : number;
  cropWidth : number;
  cropHeight : number;

  constructor(
    private dw: DrawService
  ) {}


  reset() {
    this.lineWidth= 2;
    this.font= 25;
    this.color = '#000';
    this.figure = 1;
    this.figureFill = false;
    this.content = '';
    this.boxLeft = 100;
    this.boxTop = 200;
    this.boxWidth = 200;
    this.boxRotate = 0;
  }

  getParameter() {
    let d ={};
    this.action.parameter.forEach((k)=>{
      d[k]= this[k];
    })
    return d;
  }

  save() {
    if(this.action) {
      if(this.action.parameter) {
        this.dw.canvasStack.push({
          action: this.action.action,
          data: this.getParameter()
        });
      }
      this.dw.drawAll();
    }

  }
}
