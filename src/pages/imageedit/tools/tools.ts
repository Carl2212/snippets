import { Component } from "@angular/core";
import { ToolsService } from "./tools.service";
@Component({
  selector : 'tools',
  templateUrl : 'tools.html'
})
export class Tools {
  actions : Array<any> =[
    {name : '涂鸦笔' , icon : 'brush' , action : 'draw'},
    {name : '裁剪' , icon : 'crop' , action : 'cut'},
    {name : '文字' , icon : 'logo-tumblr' , action : 'font'},
    {name : '图形工具' , icon : 'photos-outline' , action : 'square'},
    {name : '回退' , icon : 'undo' , action : 'undo'},
  ];
  constructor(
    private tool : ToolsService
  ){}

  getAction(action: string) {
    return this.actions.find(v=>{
      return v.action == action;
    });
  }
}
