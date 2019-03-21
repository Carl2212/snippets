import { Component, Input } from "@angular/core";

const DefaultValue = {
  color : '#649fe5',
  opacity : '1',
  bgColor: '#c8c7cc',
  bgOpacity: '1',
  fontColor: '#fff'
}

@Component({
  selector:'progress-comp',
  templateUrl: 'progress.html'
})

export class ProgressComponent {

  public _progress: any = 0;


  @Input() type : string;

  @Input()
  get progress() : any{
    return this._progress;
  }

  set progress(val: any) {
    if(!val || val === 0) {
      this._progress = 0;
      this.finish = 0;
    }else if(val && val > this._progress) {
      this._progress = val;
      let temp = this._progress / 100;
      this.finish = temp * this.perimeter;
    }
  }

  //circle style
  private viewbox : string;
  private radius : number;
  private centrePoint: {x: number , y: number};
  public perimeter: number;
  private finish: number;

  //line style
  private startPoint: {x: number , y: number};
  private endPoint: {x: number , y: number};

  //react style
  @Input() strokeColor : string;
  @Input() raduisX : number;
  @Input() raduisY : number;


  @Input() width: number;
  @Input() strokeWidth : number;
  @Input() bgColor : string;
  @Input() bgOpacity : string;
  @Input() color : string;
  @Input() opacity : string;
  @Input() linecap : string;
  @Input() defaultTxt : string;
  @Input() fontColor : string;



  constructor(){

  }

  init() {
    !this.linecap && (this.linecap = 'round');
    !this.bgColor && (this.bgColor = DefaultValue.bgColor);
    !this.color && (this.color= DefaultValue.color);
    !this.opacity && (this.opacity= DefaultValue.opacity);
    !this.bgOpacity && (this.bgOpacity= DefaultValue.bgOpacity);
    !this.fontColor && (this.fontColor= DefaultValue.fontColor);
    switch (this.type) {
      case 'circle':
        !this.width && (this.width = 40);
        !this.strokeWidth && (this.strokeWidth = 5);
        break;
      case 'react':
        !this.width && (this.width = 200);
        !this.strokeWidth && (this.strokeWidth = 40);
        !this.strokeColor && (this.strokeColor = '#222');
        !this.raduisX && (this.raduisX = 5);
        !this.raduisY && (this.raduisY = 5);
        break;
      case 'line':
        !this.width && (this.width = 200);
        !this.strokeWidth && (this.strokeWidth = 10);
        break;
      case 'circle-filled':
        !this.width && (this.width = 40);
        break;
    }

  }

  ngOnInit() {
    this.init();
    switch (this.type) {
      case 'circle':
        this.viewbox = `0 0 ${this.width} ${this.width}`;
        this.centrePoint = {x : this.width / 2 , y: this.width /2 };
        this.radius = (this.width / 2 - this.strokeWidth);
        this.perimeter = Math.PI * 2 * this.radius;
        this.finish = 0;
        break;
      case 'react':
        this.viewbox = `0 0 ${this.width} ${this.strokeWidth}`;
        this.perimeter = this.width;
        this.finish = 0;
        break;
      case 'line':
        this.viewbox = `0 0 ${this.width} ${this.strokeWidth}`;
        this.startPoint = {x : this.strokeWidth / 2 , y: this.strokeWidth / 2 };
        this.endPoint = {x : (this.width - this.startPoint.x / 2) , y: this.startPoint.y };
        this.perimeter = this.width;
        this.finish = 0;
        break;
      case 'circle-filled':
        this.viewbox = `0 0 ${this.width} ${this.width}`;
        this.centrePoint = {x : this.width / 2 , y: this.width /2 };
        this.strokeWidth = this.width/2;
        this.radius = this.width / 4;
        this.perimeter = Math.PI * 2 * this.radius;
        this.finish = 0;
        break;

    }

  }
}
