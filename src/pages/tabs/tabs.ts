import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import { FigureDemo } from "../figure/figure";


@Component({
  selector:'tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public tab1Root: any= HomePage;
  public tab3Root: any= FigureDemo;

  constructor() {}
}
