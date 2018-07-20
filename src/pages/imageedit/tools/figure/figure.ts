import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";
import { figureList, FigureStruct } from "../../config/figure.list";

@Component({
  selector : 'squares',
  template : `
    <ion-row>
    <ion-col no-padding>
        <button ion-button no-margin clear full icon-only (click)="fill()">
          <ion-icon color="dark" name="color-fill"></ion-icon>
        </button>
      </ion-col>
      <ion-col no-padding *ngFor="let l of figureList">
        <button ion-button no-margin clear full [class.outline]="tool.figure == l.idx"  icon-only (click)="choose(l)">
          <ion-icon color="dark" [name]="l?.icon"></ion-icon>
        </button>
      </ion-col>
    </ion-row>
  `,
  styles:[`
   button[clear].outline{
    box-shadow: inset 0 -3px 0 #53C0F0;
    border-radius: 0;
   }
   `]
})

export class Figure {

  public figureList = figureList;
  constructor(
    private tool: ToolsService
  ){}
  choose(data:FigureStruct) {
    this.tool.figure= data.idx;
    this.tool.figureFill= false;
  }
  fill() {
    this.tool.figureFill= !this.tool.figureFill;
  }
}

