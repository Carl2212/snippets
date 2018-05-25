import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";
import { figureList, FigureStruct } from "../../config/figure.list";

@Component({
  selector : 'squares',
  template : `
    <ion-row>
    <ion-col no-padding>
        <button ion-button no-margin clear full icon-only (click)="fill()">
          <ion-icon color="dark" name="radio-button-on"></ion-icon>
        </button>
      </ion-col>
      <ion-col no-padding *ngFor="let l of figureList">
        <button ion-button no-margin clear full [class.outline]="tool.figure == l.name"  icon-only (click)="choose(l)">
          <ion-icon color="dark" [name]="tool.figure == l.name && tool.figureFill  ? l?.icon.slice(0,-8) : l?.icon"></ion-icon>
        </button>
      </ion-col>
    </ion-row>
  `,
  styles:[`
   button[clear].outline{
    box-shadow: inset 0 -3px 0 #488aff;
    border-radius: 0;
   }
   `]
})

export class Figure {

  public figureList = figureList;
  constructor(
    private tool: ToolsService
  ){}

  getSquare(name : string) {
    return figureList.find((v)=>{
      return v.name === name;
    });
  }
  choose(data:FigureStruct) {
    this.tool.figure= data.name;
    this.tool.figureFill= false;
  }
  fill() {
    this.tool.figureFill= !this.tool.figureFill;
  }
}

