//每一个方块的数据接口
export interface MineInt {
  num: number; //周围雷数
  open: boolean; //是否已打开
  hasLoop: boolean; //是否已递归
  flag: boolean; //是否已标雷
  light: boolean; //是否高亮
}

export interface InitData {
  mineCount: number; //雷数
  colCount: number; //列数
  rowCount: number; //行数
  mineArr: MineInt[][]; //存放雷
  flagNum: number; //标记旗数
  successModalVisible: boolean;
  failModalVisible: boolean;
  hasStart: boolean; //标记游戏是否已开始
  mode: 1 | 2 | 3; //难度 1:初级 2：中级 3：高级
}

export interface IAlert {
  type: string;
  content: string;
  id?: number;
}
export interface IRecord {
  [x: string]: number;
}
declare type posType = [number, number];
