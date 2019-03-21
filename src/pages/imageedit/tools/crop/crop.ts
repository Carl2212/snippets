import { Component } from "@angular/core";
import { cropList } from "../../config/crop.list";
import { ToolsService } from "../tools.service";

@Component({
  selector : 'crop',
  template : `
    <ion-row>
      <ion-col no-padding *ngFor="let l of cropList">
        <button ion-button no-margin clear full icon-only [class.outline]="l.idx == tool.crop" (click)="toggle(l.idx)">
          <ion-icon color="dark" name="qr-scanner"></ion-icon>
          <span class="label">{{l.value}}</span>
        </button>
      </ion-col>
    </ion-row>
  `,
  styles:[`
   .label{
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 12px;
   }
   button[clear].outline{
    box-shadow: inset 0 -3px 0 #53C0F0;
    border-radius: 0;
   }
   `]
})

export class Crop {
  public cropList = cropList;
  constructor(
    public tool: ToolsService
  ){

  }

  toggle(id){
    this.tool.crop=id;
  }
}

