//每一个方块的数据接口
interface MineInt {
  num: number; //周围雷数
  open: boolean; //是否已打开
  hasLoop: boolean; //是否已递归
  flag: boolean; //是否已标雷
  light: boolean; //是否高亮
}

//初始化reactive数据
export class InitData {
  mineCount = 10; //雷数
  colCount = 8; //列数
  rowCount = 8; //行数
  mineArr: Array<Array<MineInt>> = [[]]; //存放雷
  flagNum = 0; //标记旗数
  successModalVisible = false;
  failModalVisible = false;
  hasStart = false; //标记游戏是否已开始
  mode = "1"; //难度 1:初级 2：中级 3：高级
}
