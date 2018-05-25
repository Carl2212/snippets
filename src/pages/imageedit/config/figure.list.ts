export interface FigureStruct {
  idx: number;
  name: string;
  icon: string;
  allowFill: boolean;
}

export let figureList: Array<FigureStruct>=
[
  {
    idx: 1,
    name: "square",
    icon: "square-outline",
    allowFill: true
  },
  {
    idx: 2,
    name: "circle",
    icon: "radio-button-off-outline",
    allowFill: true
  },
  {
    idx: 3,
    name: "arrow",
    icon: "arrow-round-forward-outline",
    allowFill: false
  },
  {
    idx: 4,
    name: "heart",
    icon: "heart-outline",
    allowFill: true
  },
  {
    idx: 5,
    name: "text",
    icon: "text-outline",
    allowFill: true
  }
]
