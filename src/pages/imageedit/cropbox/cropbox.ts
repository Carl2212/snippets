import { Component, ViewChild } from "@angular/core";
import { Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/gestures/ui-event-manager";
import { getOffset } from "../canvas/canvas.service";

@Component({
  selector : 'cropbox',
  template : `
    <div class="crop-box" #cropBox>
      
    </div>
  `
})
export class Cropbox {

  @ViewChild('cropBox') cropBox;
  private events: any;
  constructor(
    private plt: Platform
  ){}
  ngAfterViewInit() {
    this.events = new UIEventManager(this.plt);
    this.events.pointerEvents({
      element: this.cropBox.nativeElement,
      pointerDown: this.onDragStart.bind(this),
      pointerMove: this.onDragMove.bind(this),
      pointerUp: this.onDragEnd.bind(this)
    });
  }
  onDragMove(e) {
    let offset = getOffset(e);
  }

  renderer() {
  }
  onDragStart(e) {
    return true;
  }

  onDragEnd(e) {
  }

  getNativeElement() {
    return this.cropBox.nativeElement;
  }
}
