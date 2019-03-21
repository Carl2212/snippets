import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";
import { colorList } from "../../config/color.list";



@Component({
  selector : 'colors',
  template : `
    <ion-item no-lines color="light" class="color-palette">
      <ion-icon name="color-palette" item-left [style.color]="tool.color"></ion-icon>
      <ion-row>
        <ion-col col-auto no-padding *ngFor="let l of colorList" [class.chosed]="tool.color == l.value" [style.background-color]="l.value" tappable (click)="tool.color = l.value">
        </ion-col>
      </ion-row>
    </ion-item>
   
  `
})
export class Colors {

  public colorList = colorList;
  constructor(
    public tool : ToolsService
  ){}
}
