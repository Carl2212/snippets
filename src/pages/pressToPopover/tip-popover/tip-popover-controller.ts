import {ViewController, App, NavOptions} from "ionic-angular";
import {TipPopover} from "./tip-popover";
import {Injectable} from "@angular/core";

@Injectable()
export class TipPopoverController{

  constructor(
      private app : App,
  ) {}
  create(opts : any) : TipPopoverView {
    return new TipPopoverView(this.app , opts);
  }

}

export class TipPopoverView extends ViewController {
  private app;
  constructor(
      app : App,
      opts : any,
  ) {
    super(TipPopover , opts , null);
    this.app = app;

  }
  present(navOptions? : NavOptions) {
    navOptions.animate = false;
    navOptions.disableApp = false;
    navOptions.keyboardClose = false;
    this.app.present(this,navOptions , 4).then((page)=>{
      if(navOptions.ev) {
        this.positionView(navOptions.ev);
      }
    });
  }
  positionView(ev : any) {
    let ele = this.pageRef().nativeElement;
    ele.style.display = 'block';
    let H = (ev.target.offsetHeight/2) + ele.offsetHeight;
    ele.style.top = (ev.center.y - H) + 'px';
    ele.style.left = ev.center.x + 'px';

  }
  getElement() {
    console.log(this.pageRef());
    return this.pageRef().nativeElement;
  }
}