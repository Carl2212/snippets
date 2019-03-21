import { Injectable } from "@angular/core";
import { normalizeURL } from "ionic-angular";
import { ImageContentType, base64ToBlob } from "./common";

export const watermarkConfig = {
  fontColor : "#fff",
  font: "bold 18px sans-serif",
  shadowColor: "rgba(0,0,0,0.4)",
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  shadowBlur: 2,
  marginRight: 10,
  marginBottom : 10,
  lineSpacing: 10,
  referenceWidth : 400
}

@Injectable()
export class Watermark {

  private config : {[key:string]: any} = watermarkConfig;
  constructor(
  ){}

  public watermark(url:string,location?: string , time?: string): Promise<Blob> {
    return new Promise<any>((resolve)=>{
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let img = new Image();
      img.src = normalizeURL(url);
      img.onload = ()=>{
        let H = img.height;
        let W = img.width;

        canvas.height = H;
        canvas.width = W;
        context.drawImage(img, 0 , 0, W , H);

        let c: any= this.config;
        let fontHeight = 0;
        let ratio = img.width / c.referenceWidth;
        context.font = c.font.replace(/([0-9]+)(?=px)/,($0)=>{
          fontHeight = parseInt($0)  * ratio;
          return fontHeight;
        });
        context.fillStyle = c.fontColor;
        context.shadowBlur = c.shadowBlur;
        context.shadowColor = c.shadowColor;
        context.shadowOffsetX = c.shadowOffsetX * ratio;
        context.shadowOffsetY = c.shadowOffsetY * ratio;

        let lineSpacing = c.lineSpacing * ratio;
        let offsetX = W - (c.marginRight * ratio);
        let offsetY = H - (c.marginBottom * ratio);

        if(location) {
          let locationWidth = this.fontWidth(location , context);
          let LoffsetX = offsetX - locationWidth;
          let LoffsetY = offsetY - fontHeight;
          context.fillText(location , LoffsetX,LoffsetY);
          offsetY = LoffsetY - lineSpacing;
        }

        if(time) {
          let timeWidth = this.fontWidth(time , context);
          let ToffsetX = offsetX - timeWidth;
          let ToffsetY = offsetY - fontHeight;
          context.fillText(time , ToffsetX,ToffsetY);
        }

        let dataUrl = context.canvas.toDataURL(ImageContentType);
        let blob = base64ToBlob(dataUrl);
        resolve(blob);
      }
    });
  }

  private fontWidth(location : string, context: any): number {
    let lineWidth = 0;
    for(let i = 0 ; i< location.length; i++) {
      lineWidth+= context.measureText(location[i]).width;
    }
    return lineWidth;
  }

  public compressImage(url:string): Promise<Blob> {
    return new Promise<any>((resolve,reject)=>{
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let img = new Image();
      img.src = normalizeURL(url);
      let quality = 0.4;
      img.onload = ()=> {
        let dataUrl;
        let size;
        let width = img.width;
        let height = img.height;
        let isBreak: boolean;
        let blob: Blob;
        do{
          if(quality > 0.4){
            quality -= 0.06;
            dataUrl = context.canvas.toDataURL(ImageContentType,quality);
          }else if(!isBreak){
            let compress = this.computeSize(width,height);
            if(!size) {
              size = compress.size;
            }
            if(compress.width == width && compress.height == height) {
              isBreak = true;
            }
            quality = 0.9;
            height = compress.height;
            width = compress.width;
            canvas.height = height;
            canvas.width = width;
            context.drawImage(img, 0, 0, width, height);
            dataUrl = context.canvas.toDataURL(ImageContentType,quality);
          }else{
            break;
          }
          blob = base64ToBlob(dataUrl);
        }while(blob.size / 1024 > size && quality > 0);
        resolve(blob);
      };
    });
  }

  public computeSize(width : number , height: number) {
    width = width % 2 == 1 ? width + 1 : width;
    height = height % 2 == 1 ? height + 1 : height;

    let longSide = Math.max(width , height);
    let shortSide = Math.min(width , height);

    let scale = (shortSide / longSide);

    let size ;
    let newWidth;
    let newHeight;
    if(scale <= 1 && scale > 0.5625) {
      if(longSide < 1664) {
        newWidth = width;
        newHeight = height;
        size = this.size(newWidth,newHeight,1664,1664,150);
        size = size< 60 ? 60: size;
      }else if (longSide < 4990) {
        let n = 2;
        newWidth = width/n;
        newHeight = height/n;
        size = this.size(newWidth,newHeight,2495,2495,300);
        size = size< 60 ? 60: size;
      }else if (longSide >= 4990 && longSide < 10240) {
        let n = 4;
        newWidth = width/n;
        newHeight = height/n;
        size = this.size(newWidth,newHeight,2560,2560,300);
        size = size < 100 ? 100 : size;
      }else {
        let n = Math.ceil(longSide / 1280);
        newWidth = width/n;
        newHeight = height/n;
        size = this.size(newWidth,newHeight,2560,2560,300);
        size = size< 100 ? 100: size;
      }
    }else if(scale <= 0.5625 && scale > 0.5) {
      let n = longSide / 1280 == 0 ? 1 : longSide / 1280;
      newWidth = width/n;
      newHeight = height/n;
      size = this.size(newWidth,newHeight,2560,1440,400);
      size = size< 100 ? 100: size;
    }else {
      let n = Math.ceil(longSide / (1280.0 / scale));
      newWidth = width/n;
      newHeight = height/n;
      size = this.size(newWidth,newHeight,1280,(1280 / scale),500);
      size = size< 100 ? 100: size;
    }
    return {width: newWidth , height: newHeight,size: size};
  }

  private size(newW: number , newH: number ,width : number , height: number , m: number){
    return (newW * newH) / (width * height) * m;
  }
}
