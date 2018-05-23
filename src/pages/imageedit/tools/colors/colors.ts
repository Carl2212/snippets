import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";

interface ColorStruct{
  color : string;
  value : string;
}

@Component({
  selector : 'colors',
  template : `
    <ion-item no-lines color="light">
      <ion-icon name="color-palette" item-left [style.color]="tool.color"></ion-icon>
      <ion-row class="color-palette">
        <ion-col no-padding *ngFor="let l of colors" [style.background-color]="l.value" tappable (click)="tool.color = l.value">
        </ion-col>
      </ion-row>
    </ion-item>
   
  `
})
export class Colors {

  colors : Array<ColorStruct> = [
    {color : 'red' , value : '#f53d3d'},
    {color : 'white' , value : '#fff'},
    {color : 'yellow' , value : '#ff0'},
    {color : 'black' , value : '#000'},
    {color : 'blue' , value : '#488aff'},
    {color : 'green' , value : '#32db64'},
    {color : 'grey' , value : '#9C9C9C'},
    {color : 'Thistle' , value : '#FFE1FF'},
    {color : 'Purple' , value : '#9B30FF'},
    {color : 'DodgerBlue' , value : '#1E90FF'},
    {color : 'Honeydew' , value : '#F0FFF0'},
    {color : 'Bisque' , value : '#FFE4C4'}
  ];
  constructor(
    private tool : ToolsService
  ){}
  ngOnInit() {
    this.tool.color= this.colors[0].value;
  }
}
