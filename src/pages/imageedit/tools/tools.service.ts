/**
 * Created by itwo on 23/5/2018.
 */
import { Injectable } from "@angular/core";

@Injectable()
export class ToolsService {

  lineWidth : number;
  font: number;
  color: string;
  figure: string;
  figureFill: boolean;
  action:string;
  text: string;

  boxLeft: number;
  boxTop:number;
  boxHeight : number;
  boxWidth : number;
  constructor() {

  }

  reset() {
    this.lineWidth= 2;
    this.font= 15;
    this.color = '#000';
    this.figure = 'square';
    this.figureFill = false;
  }
}
