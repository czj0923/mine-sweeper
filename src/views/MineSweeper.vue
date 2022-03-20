<template>
  <div class="minesweeper row">
    <div class="left-menu col md-3 card">
      <Menu v-model:mode="mode"></Menu>
    </div>
    <div class="right-content md-9">
      <p>剩余雷数：{{ mineCount - flagNum }}</p>
      <Timer ref="timerRef"></Timer>
      <div
        class="game-box"
        :style="{
          width: 25 * colCount + 'px',
        }"
      >
        <template v-for="(row, index) in mineArr" :key="index">
          <template v-for="(el, index2) in row" :key="index2">
            <div
              class="box"
              :class="[`box${el.num}`]"
              @click="openFlag(index, index2)"
              v-if="el.open"
            >
              {{ el.num === 10 ? "●" : el.num ? el.num : "" }}
            </div>
            <div
              class="box unopen"
              :class="{ light: el.light && !el.flag }"
              v-else
              @click="open(index, index2)"
              @contextmenu.prevent="setFlag(index, index2)"
            >
              <img v-if="el.flag" src="../assets/images/flag.png" />
            </div>
          </template>
        </template>
      </div>
      <div class="tool-bar">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item" @click="restart">重新开始</div>
      </div>
    </div>

    <Modal
      v-model:visible="successModalVisible"
      title="恭喜您"
      content="游戏成功！"
      @confirm="restart"
    ></Modal>
    <Modal
      v-model:visible="failModalVisible"
      title="很遗憾"
      content="游戏失败~请再接再厉"
      @confirm="restart"
    ></Modal>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref, watch } from "vue";
import Modal from "@/components/Modal";
import Timer from "@/components/Timer";
import Menu from "@/components/Menu";
export default {
  name: "MineSweeper",
  components: {
    Modal,
    Timer,
    Menu,
  },
  setup() {
    const state = reactive({
      mineCount: 10, //雷数
      colCount: 8, //列数
      rowCount: 8, //行数
      mineArr: [[]], //存放雷
      flagNum: 0, //标记旗数
      successModalVisible: false,
      failModalVisible: false,
      hasStart: false, //标记游戏是否已开始
      mode: 1, //难度 1:初级 2：中级 3：高级
    });

    watch(
      () => state.hasStart,
      (newV, oldV) => {
        if (newV) {
          //开始游戏
          timerRef.value.start();
        } else {
          //结束游戏
          timerRef.value.stop();
        }
        console.log("监听", newV, oldV);
      }
    );

    watch(
      () => state.mode,
      (newV) => {
        if (newV === 1) {
          state.mineCount = 10;
          state.colCount = 8;
          state.rowCount = 8;
        } else if (newV === 2) {
          state.mineCount = 40;
          state.colCount = 16;
          state.rowCount = 16;
        } else if (newV === 3) {
          state.mineCount = 99;
          state.colCount = 30;
          state.rowCount = 16;
        }
        restart();
      }
    );

    const timerRef = ref(null);

    //获取在坐标面板内部的坐标
    const getPosition = (x, y) => {
      const aroundPos = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];
      return aroundPos.filter((arr) => {
        return (
          arr[0] >= 0 &&
          arr[0] < state.rowCount &&
          arr[1] >= 0 &&
          arr[1] < state.colCount
        );
      });
    };

    //初始化雷区
    const initMine = () => {
      state.mineArr = [[]];
      for (let i = 0; i < state.rowCount; i++) {
        state.mineArr[i] = [];
        for (let j = 0; j < state.colCount; j++) {
          state.mineArr[i][j] = {
            num: 0, //周围雷数
            open: false, //是否已打开
            hasLoop: false, //是否已递归
            flag: false, //是否已标雷
            light: false, //是否高亮
          };
        }
      }

      for (let i = 0; i < state.mineCount; i++) {
        let [row, col] = Random(state.rowCount, state.colCount);
        //如果该位置有雷，则重新获取随机坐标
        while (state.mineArr[row][col].num === 10) {
          [row, col] = Random(state.rowCount, state.colCount);
        }
        state.mineArr[row][col].num = 10;
        //设置雷之后，把周围一圈非雷方块数字+1

        const pos = getPosition(row, col);

        pos.forEach((item) => {
          const [x, y] = item;
          if (state.mineArr[x][y].num !== 10) {
            state.mineArr[x][y].num++;
          }
        });
      }
      console.log(state.mineArr);
      state.flagNum = 0;
    };

    //生成随机整数 [0,max)
    function Random(max_r, max_c) {
      let x = Math.floor(Math.random() * max_r);
      let y = Math.floor(Math.random() * max_c);
      return [x, y];
    }

    //点击方块
    const open = (row, col) => {
      if (!state.hasStart) {
        state.hasStart = true;
      }
      //如果点击的方块已插旗，则不触发
      if (state.mineArr[row][col].flag) {
        return false;
      }
      //点击的方块设置为打开
      state.mineArr[row][col].open = true;
      //点击的为雷
      if (state.mineArr[row][col].num === 10) {
        state.failModalVisible = true;
        //暂停计时器
        timerRef.value.pause();
        return false;
      } else {
        const pos = getPosition(row, col);
        console.log(pos);
        //遍历坐标，如果发现有一个值为10则停止递归
        loop(pos);
      }
      isFinish();
    };

    //判断是否游戏结束  成功or失败
    const isFinish = () => {
      //判断还有几个方块未打开
      let count = 0;
      for (let x = 0; x < state.mineArr.length; x++) {
        for (let y = 0; y < state.mineArr[x].length; y++) {
          if (!state.mineArr[x][y].open) {
            count = count + 1;
          }
          //只要有一个方块open和雷数10同时出现  则失败
          if (state.mineArr[x][y].open && state.mineArr[x][y].num === 10) {
            state.failModalVisible = true;
            //暂停计时器
            timerRef.value.pause();
            return false;
          }
        }
      }
      //未打开的方块数<=总雷数 则成功
      if (count <= state.mineCount) {
        state.successModalVisible = true;
        //暂停计时器
        timerRef.value.pause();
        return false;
      }
    };

    //标记旗
    const setFlag = (x, y) => {
      if (!state.hasStart) {
        state.hasStart = true;
      }
      if (!state.mineArr[x][y].flag) {
        state.mineArr[x][y].flag = true;
        state.flagNum++;
      } else {
        state.mineArr[x][y].flag = false;
        state.flagNum--;
      }
    };

    //使用递归打开方块
    const loop = (pos) => {
      //周围方块是否存在雷
      const bool = pos.every((item) => {
        const [x, y] = item;
        return state.mineArr[x][y].num !== 10;
      });

      if (bool) {
        pos.forEach((item) => {
          const [x, y] = item;
          if (!state.mineArr[x][y].hasLoop) {
            state.mineArr[x][y].open = true;
            state.mineArr[x][y].hasLoop = true;
            const _pos = getPosition(x, y);
            loop(_pos);
          }
        });
      } else {
        return false;
      }
    };

    //重新开始
    const restart = () => {
      initMine();
      state.hasStart = false;
    };

    //当鼠标在已打开方块上按下时，周围未打开方块显示效果
    //const showAround = (x, y) => {
    //  const pos = getPosition(x, y);
    //  pos.forEach((item) => {
    //    const [x, y] = item;
    //    if (!state.mineArr[x][y].open) {
    //      state.mineArr[x][y].light = true;
    //    }
    //  });
    //};
    ////当鼠标在已打开方块上按下时，周围未打开方块显示效果
    //const unShowAround = (x, y) => {
    //  const pos = getPosition(x, y);
    //  pos.forEach((item) => {
    //    const [x, y] = item;
    //    if (!state.mineArr[x][y].open) {
    //      state.mineArr[x][y].light = false;
    //    }
    //  });
    //};

    //已标雷的情况下，点击未打开方块时，如果数字等于周围一圈标雷数量，则自动打开周围一圈未标雷的方块
    const openFlag = (_x, _y) => {
      console.log("点击的坐标", _x, _y);
      const pos = getPosition(_x, _y);
      let flagCount = 0;
      //统计周围一圈标了几个旗
      pos.forEach((item) => {
        const [x, y] = item;
        if (state.mineArr[x][y].flag) {
          flagCount = flagCount + 1;
        }
      });
      //如果点击的数字等于周围旗数
      if (state.mineArr[_x][_y].num === flagCount) {
        //遍历周围一圈，把未插旗的方块打开
        pos.forEach((item) => {
          const [x, y] = item;
          if (!state.mineArr[x][y].flag) {
            state.mineArr[x][y].open = true;
            //打开一个方块就判断一次
            return isFinish();
          }
        });

        //去除已插旗的方块
        pos.forEach((item, index) => {
          if (state.mineArr[item[0]][item[1]].flag) {
            pos.splice(index, 1);
          }
        });
        console.log(pos);
        //递归点击的方块
        loop(pos);
      }

      isFinish();
    };
    initMine();
    onMounted(() => {});

    return {
      ...toRefs(state),
      open,
      setFlag,
      restart,
      openFlag,
      timerRef,
    };
  },
};
</script>
<style scoped lang="scss">
.minesweeper {
  padding: 0 20px;
  align-items: flex-start;
  .left-menu {
    background-color: #fff;
  }
  .right-content {
    .tool-bar {
      background-color: #fff;
      display: flex;
      margin-top: 20px;
      border: 1px solid #eee;
      box-shadow: 15px 28px 25px -18px rgb(0 0 0 / 20%);
      .item {
        flex: 1;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 10px 0;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }

  .game-box {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      background-color: rgb(197, 194, 194);
      border: 1px solid rgb(255, 255, 255);
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      transition: all 0.2s ease;
      img {
        border-radius: 0;
        border: none;
      }
      &10 {
        background-color: #f00;
      }
      &1 {
        color: blue;
      }
      &2 {
        color: green;
      }
      &3 {
        color: red;
      }
      &4 {
        color: rgb(102, 4, 167);
      }
      &5 {
        color: orange;
      }
      &6 {
        color: #555;
      }
      &7 {
        color: #444;
      }
      &7 {
        color: #000;
      }
      &.unopen {
        background-color: rgb(111, 111, 112);
        &:hover {
          opacity: 0.8;
        }
      }
      &.light {
        background-color: #555;
      }
    }
  }
}
</style>
