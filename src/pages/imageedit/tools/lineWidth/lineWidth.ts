import { Component } from "@angular/core";
import { ToolsService } from "../tools.service";
@Component({
  selector : 'line-width',
  template : `
    <ion-item no-lines color="light">
    <ion-range min="1" max="20" step="2" pin="true" snaps="true" [(ngModel)]="tool.lineWidth">
      <ion-icon range-left small name="brush"></ion-icon>
      <ion-icon range-right name="brush"></ion-icon>
    </ion-range>
  </ion-item>
  `
})
export class LineWidth {
  constructor(
    private tool: ToolsService
  ){}
  ngOnInit() {
    this.tool.lineWidth= 1;
  }
}
