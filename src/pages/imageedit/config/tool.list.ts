/**
 * Created by Ellen on 18/7/2018.
 */
export interface ToolStruct {
  idx: number;
  name: string;
  icon: string;
  action?: string;
  parameter?: Array<string>;
}

export const ToolHeight = 200;

export const toollist : Array<ToolStruct> = [
  {
    idx : 1,
    name : '涂鸦笔' ,
    icon : 'brush' ,
    action: 'drawLine',
    parameter : ['color','lineWidth','pointGroup']
  },
  {
    idx : 2,
    name : '裁剪',
    icon : 'crop',
    action: 'drawCut',
    parameter : ['crop','cropTop','cropLeft','cropWidth','cropHeight']
  },
  {
    idx : 3,
    name : '文字',
    icon : 'logo-tumblr',
    action: 'drawText',
    parameter : ['color','font','content','boxLeft','boxTop','boxHeight','boxWidth','boxRotate']
  },
  {
    idx : 4,
    name : '图形工具' ,
    icon : 'photos-outline' ,
    action: 'drawFigure',
    parameter : ['figure','color','lineWidth','point','endPoint']
  },
  {
    idx : 5,
    name : '回退' ,
    icon : 'undo'
  },
];

