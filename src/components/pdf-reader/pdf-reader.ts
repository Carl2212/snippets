import { Component, ViewChild, ChangeDetectorRef, ElementRef, Renderer2 } from "@angular/core";
import { NavParams, normalizeURL, Platform } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { isArray } from "ionic-angular/util/util";

export function percentFormat(loaded,total) : number {
  let ratio: number = loaded / total ;
  let current = Math.floor(ratio*100);
  return current;
}

@Component({
  selector: 'pdf-reader',
  templateUrl:'pdf-reader.html'
})
export class PDFReader {

  public url: any;
  public title: string;
  public totalPage: number;
  public page : number = 1;
  public rotation: number = 0;
  public pdfBookmark: string = 'PDF_BOOKMARKS';
  @ViewChild('viewer') pdfViewer: any;
  public bookmark: Array<any> = [];
  public normalizeURL: any = normalizeURL;
  public progress: number;

  public scale: number;

  constructor(
    private navParams: NavParams,
    private storage: Storage,
    private platform: Platform,
    private cd: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.url = this.navParams.data.url;
    this.title = this.navParams.data.title;
  }

  ngOnInit() {
    this.getBookmark();

  }


  complete(pdf: any){
    this.totalPage = pdf.numPages;
    setTimeout(()=>{
      this.scaleUpdate();
    },500);
  }
  //after renderer pdf canvas
  scaleUpdate() {
    let page = this.el.nativeElement.querySelector('.canvasWrapper');
    let width = page.offsetWidth;
    let height = page.offsetHeight;
    let scale = window.innerWidth / width;
    let delta = (1- scale)/2;
    let deltaX = -delta * width;
    let deltaY = -delta * height;

    this.renderer.setStyle(this.pdfViewer.nativeElement,'width', width+'px');
    this.renderer.setStyle(this.pdfViewer.nativeElement,'left', deltaX+'px');
    this.renderer.setStyle(this.pdfViewer.nativeElement,'top', deltaY+'px');

    this.scale = scale;
  }

  sickToPage(insert: number) {
    let temp = this.page + insert;
    this.page = Math.max(Math.min(temp,this.totalPage),1);
    this.setBookmark();
  }

  setBookmark() {
    if(!this.bookmark)
      this.bookmark = [];
    this.bookmark = this.bookmark.filter((b)=>b.id != this.url);
    this.bookmark.push({id:this.url,pageNum: this.page})
    this.storage.set(this.pdfBookmark,this.bookmark);
  }

  getBookmark() {
    this.storage.get(this.pdfBookmark)
      .then((bookmark: Array<any>)=>{
        if(bookmark && isArray(bookmark)) {
          this.bookmark = bookmark;
        }else{
          this.bookmark = [];
        }
        let data = this.bookmark.find((b)=>b.id == this.url);
        if(data)
          this.page = data.pageNum;
      });
  }

  onProgress(progressData: any) {
    // do anything with progress data. For example progress indicator
    this.progress = percentFormat(progressData.loaded , progressData.total);
    this.cd.detectChanges();
  }
}
