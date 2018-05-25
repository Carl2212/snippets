import { Component, Input } from "@angular/core";
import { ToolsService } from "../tools.service";
@Component({
  selector : 'line-width',
  template : `
    <ion-item no-lines color="light">
    <ion-range [min]="min" [max]="max" step="1" pin="true" [(ngModel)]="tool[property]">
      <ion-icon range-left small name="brush"></ion-icon>
      <ion-icon range-right name="brush"></ion-icon>
    </ion-range>
  </ion-item>
  `
})
export class Range {
  @Input() property: string;
  @Input() min: number;
  @Input() max: number;

  constructor(
    private tool: ToolsService
  ){}
}
