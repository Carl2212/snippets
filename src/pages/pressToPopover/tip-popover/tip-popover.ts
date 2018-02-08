import {Component} from '@angular/core';
import {NavParams, ViewController, Platform, App} from "ionic-angular";
import {UIEventManager} from "ionic-angular/gestures/ui-event-manager";

@Component({
  selector: 'tipPopover',
  templateUrl: 'tip-popover.html'
})
export class TipPopover{

  msg : string;
  private events : any;
  constructor(
      private navParams : NavParams,
      private plt : Platform,
      private viewCtrl : ViewController
  ) {
    this.msg = this.navParams.get('msg');
  }
  dismissTip() {
    this.viewCtrl.dismiss(true,'',{animate : false});
    this.events.unlistenAll();
  }
  ngOnInit() {
    this.events = new UIEventManager(this.plt);
    let callback = this.dismissTip.bind(this);
    setTimeout(()=>{
      this.events.listen(document.body, 'click' , callback , {capture : true});
    },300);
  }
}
