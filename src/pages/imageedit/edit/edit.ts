import { Component, ViewChild } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { CanvasService } from "../canvas/canvas.service";
import { ToolHeight } from "../config/tool.list";

@Component({
  selector: 'edit',
  templateUrl: 'edit.html'
})
export class Edit {

  @ViewChild('cs') cs;
  @ViewChild('content') content;

  imageUrl : string = 'assets/imgs/demo.jpg';
  canvasWillLoad: boolean = false;


  constructor(
    private navParams : NavParams,
    private viewCtrl: ViewController
  ) {
    this.imageUrl = this.navParams.data.img;
  }

  ionViewDidEnter() {
    let height = this.content.contentHeight - ToolHeight;
    let width = this.content.contentWidth;
    let contentAspectRatio = width / height;
    let image = new Image();
    image.onload = (e: any)=>{
      let imageAspectRatio = e.target.width / e.target.height;
      if(contentAspectRatio > imageAspectRatio) {
        CanvasService.height = height;
        CanvasService.width = height * imageAspectRatio;
      }else{
        CanvasService.height = width / imageAspectRatio;
        CanvasService.width = width
      }
      this.canvasWillLoad = true;
    }
    image.src = this.imageUrl;

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(){
    let url = this.cs.save();
    this.viewCtrl.dismiss(url);
  }
}
