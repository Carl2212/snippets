import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Edit } from "./edit/edit";

@IonicPage()
@Component({
  selector: 'image-edit',
  templateUrl: 'imageedit.html'
})
export class ImageEdit {

  @ViewChild('img') element;
  public scaleStatus : boolean = false;
  public rotateDeg: number = 0;

  imageUrl : string = 'assets/imgs/demo.jpg';

  constructor(
    private modal : ModalController
  ) {}

  public edit(){
    let modal = this.modal.create(Edit,{img : this.imageUrl});
    modal.present();
    modal.onDidDismiss((dataUrl)=>{
      if(dataUrl) {
        this.imageUrl = dataUrl;
        //调用cordova 保存到本地文件上
      }

    })
  }

  public rotate() {
    this.rotateDeg = this.rotateDeg + 90 ;
    if(this.rotateDeg === 360) {
      this.rotateDeg = 0;
    }
  }

}
