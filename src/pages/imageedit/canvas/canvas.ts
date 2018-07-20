import { Component, ViewChild, Renderer2, Input } from '@angular/core';
import { CanvasService } from "./canvas.service";
import { ToolsService } from "../tools/tools.service";
import { DrawService } from "./drawService";

@Component({
  selector: 'canvas-comp',
  templateUrl: 'canvas.html'
})
export class Canvas {

  @ViewChild('canvasBackground') canvasBackground;
  @ViewChild('canvasForeground') canvasForeground;

  @ViewChild('dragBox') dragBox;
  @ViewChild('pointLayer') pointLayer;
  background : any;
  events: any;

  @Input() imageUrl : string;

  constructor(
    private renderer : Renderer2,
    private dw: DrawService,
    public tool: ToolsService
  ) {
  }
  ngOnInit() {
    this.dw.canvasTop = this.canvasBackground.nativeElement.getBoundingClientRect().top;
    this.dw.canvasLeft = this.canvasBackground.nativeElement.getBoundingClientRect().left;
    let w= CanvasService.width;
    let h= CanvasService.height;
    this.background= new CanvasService(this.renderer,this.canvasBackground);
    let image = new Image();
    image.onload = ()=>{
      this.background.cs.drawImage(image,0,0,w,h);
    }
    image.src = this.imageUrl;
    this.dw.cs= new CanvasService(this.renderer,this.canvasForeground);
  }
}

