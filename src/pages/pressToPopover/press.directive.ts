import {
  Directive,Input, Renderer2,
} from '@angular/core';
import { TipPopoverController } from "./tip-popover/tip-popover-controller";

@Directive({
  selector: '[pressShowDetail]',
  host : {
    '(press)' :'onPress($event)',
    '(click)' :'onClick($event)'
  }
})

export class PressDirective {
  @Input('pressShowDetail') detail : string;
  isPress : boolean = false;
  private events;
  constructor(
      private renderer : Renderer2,
      private tipPopoverCtrl : TipPopoverController,

  ) {
  }
  onPress($event) {
      if(this.detail) {
        this.loadComponent($event);
      }
      this.isPress = true;
  }
  onClick($event) {
    if(this.isPress) {
      $event.stopPropagation();
      $event.preventDefault();
      this.isPress = false;
    }

  }
  loadComponent($event) {
    let p = this.tipPopoverCtrl.create({msg : this.detail});
    p.present({ev : $event});
    this.renderer.setStyle($event.target,'color' , '#990095');
    p.onDidDismiss((hide)=>{
        if(hide) {
          this.renderer.removeStyle($event.target,'color');
        }
    });
  }
}
