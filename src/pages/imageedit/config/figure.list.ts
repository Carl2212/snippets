export interface FigureStruct {
  idx: number;
  name: string;
  icon: string;
}

export let figureList: Array<FigureStruct>=
[
  {
    idx: 1,
    name: "rect",
    icon: "square-outline"
  },
  {
    idx: 2,
    name: "circle",
    icon: "radio-button-off-outline"
  },
  {
    idx: 3,
    name: "arrow",
    icon: "arrow-round-forward-outline"
  },
  {
    idx: 4,
    name: "heart",
    icon: "heart-outline"
  },
  {
    idx: 5,
    name: "text",
    icon: "text-outline"
  }
]
