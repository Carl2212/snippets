import { Directive, Input, ElementRef, Renderer2 } from "@angular/core";
import { Content } from "ionic-angular";
@Directive({
  selector: '[rotate]'
})

export class RotateDirector{

  private eleWidth : number;
  private eleHeight: number;
  private contentWidth : number;
  private contentHeight : number;

  private _rotate: number;
  @Input('rotate')
  set rotate(r : number) {
    this._rotate = r;
    if(this.content.contentWidth) {
      let boxRadio = this.getBoxRadio();
      if(r == 90 || r == 270){
        let eleRadio = this.eleWidth / this.eleHeight;
        if(boxRadio > eleRadio) {
          this.setWidthAndHeight(`${this.contentWidth}px` , 'auto');
        }else{
          this.setWidthAndHeight('auto' , `${this.contentHeight}px`);
        }
        this.renderer.addClass(this.el.nativeElement,'rotate');
      }else{
        let eleRadio = this.eleHeight / this.eleWidth;
        if(boxRadio > eleRadio) {
          this.setWidthAndHeight('auto' , '100%');
        }else{
          this.setWidthAndHeight('100%' , 'auto');
        }
        this.renderer.removeClass(this.el.nativeElement,'rotate');
      }
      this.renderer.setStyle(this.el.nativeElement,'transform',`rotate(-${r}deg)`);
    }
  }
  get rotate() : number {
    return this._rotate;
  }

  constructor(
    private el: ElementRef,
    private content: Content,
    private renderer : Renderer2
  ) {
  }

  ngAfterViewInit() {
    let img = new Image();
    img.onload = (e: any)=>{
      this.eleWidth = e.target.width;
      this.eleHeight = e.target.height;
    }
    img.src = this.el.nativeElement.getAttribute('src');
  }

  private getBoxRadio() {
    this.contentWidth = this.content.contentWidth;
    this.contentHeight = this.content.contentHeight;
    return (this.contentHeight/this.contentWidth);
  }

  private setWidthAndHeight(height: string , width: string) {
    this.renderer.setStyle(this.el.nativeElement,'height',height);
    this.renderer.setStyle(this.el.nativeElement,'width',width);
  }

}
