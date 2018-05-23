import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";

interface SquareStruct {
  name? : string;
  icon? : string;
  fill? : boolean;
}

@Component({
  selector : 'squares',
  template : `
    <ion-row>
      <ion-col no-padding *ngFor="let l of squares">
        <button ion-button no-margin clear full [class.outline]="tool.square == l.name"  icon-only (click)="choose(l)">
          <ion-icon color="dark" [name]="tool.square == l.name && l.fill  ? l?.icon.slice(0,-8) : l?.icon"></ion-icon>
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

export class Squares {

  private squares : Array<SquareStruct> = [
    {name : 'square', icon : 'square-outline',              fill : false},
    {name : 'circle', icon : 'radio-button-off-outline',    fill : false},
    {name : 'arrow',  icon : 'arrow-round-forward-outline', fill : false},
    {name : 'heart',  icon : 'heart-outline',               fill : false},
    {name : 'text',   icon : 'text-outline',                fill : false},
  ];
  constructor(
    private tool: ToolsService
  ){}

  ngOnInit() {
    this.choose(this.squares[0]);
  }
  getSquare(name : string) {
    return this.squares.find((v)=>{
      return v.name === name;
    });
  }
  choose(data:SquareStruct) {
    if(this.tool.square == data.name) {
      data.fill=!data.fill;
    }else{
      data.fill=false;
      this.tool.square = data.name;
    }
    this.tool.squareFill = data.fill;
  }
}

