import { Directive, ElementRef, Output, EventEmitter, Input } from "@angular/core";
import { Gesture, Platform } from "ionic-angular";
import { UIEventManager } from "ionic-angular/gestures/ui-event-manager";


@Directive({
  selector: '[longpress]'
})

export class LongPressDirector{

  private _interval : number = 500;
  @Input('interval')
  set interval(val : number) {
    if(val < 500) {
      val = 500;
    }
    this._interval = val;
  }
  get interval() : number {
    return this._interval;
  }

  @Output('longpress') longpress : EventEmitter<any> = new EventEmitter<any>();
  @Output('longpressup') longpressup : EventEmitter<any> = new EventEmitter<any>();

  private gesture : Gesture;
  private status : boolean;

  private events : UIEventManager;
  constructor(
    private el: ElementRef,
    private plt: Platform
  ) {
  }

  ngAfterViewInit() {
    this.gesture = new Gesture(this.el.nativeElement,{
      recognizers: [
        [(<any>window).Hammer.Press ,{time: this.interval}]
      ]
    });
    this.gesture.listen();
    this.gesture.on('press',this.press.bind(this));
    this.gesture.on('pressup',this.pressEnd.bind(this));
    this.events = new UIEventManager(this.plt);
    this.events.listen(this.el.nativeElement,'touchend',this.pressEnd.bind(this),{
      capture: true,
      passive: false
    });
  }

  pressEnd(e) {
    if(this.status) {
      this.status = false;
      this.longpressup.emit(e);
    }
  }

  press(e) {
    this.status = true;
    this.longpress.emit(e);
    return true;
  }

  ngOnDestroy() {
    this.pressEnd(false);
    this.gesture.destroy();
    this.events.destroy();
  }
}
