<template>
  <div class="minesweeper">
    <p>剩余雷数：{{ mineCount - flagNum }}</p>
    <div
      class="game-box"
      :style="{
        width: 35 * rowCount + 'px',
      }"
    >
      <template v-for="(row, index) in mineArr" :key="index">
        <template v-for="(el, index2) in row" :key="index2">
          <div
            class="box"
            :class="[`box${el.num}`]"
            @click="open(index, index2)"
            v-if="el.open"
          >
            {{ el.num ? el.num : "" }}
          </div>
          <div
            class="box unopen"
            v-else
            @click="open(index, index2)"
            @contextmenu.prevent="setFlag(index, index2)"
          >
            <img v-if="el.flag" src="../assets/images/flag.png" />
          </div>
        </template>
      </template>
    </div>
    <div class="row flex-spaces child-borders">
      <label class="paper-btn margin" for="modal-1">Open Modal!</label>
    </div>
    <input class="modal-state" id="modal-1" type="checkbox" />
    <div class="modal">
      <label class="modal-bg" for="modal-1"></label>
      <div class="modal-body">
        <label class="btn-close" for="modal-1">X</label>
        <h4 class="modal-title">Modal Title</h4>
        <h5 class="modal-subtitle">Modal Subtitle</h5>
        <p class="modal-text">
          This is an example of modal which is implemented with pure CSS! :D
        </p>
        <label for="modal-1">Nice!</label>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "MineSweeper",
  setup() {
    const state = reactive({
      mineCount: 10, //雷数
      colCount: 8, //列数
      rowCount: 8, //行数
      mineArr: [[]], //存放雷
      flagNum: 0, //标记旗数
    });

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
      for (let i = 0; i < state.rowCount; i++) {
        state.mineArr[i] = [];
        for (let j = 0; j < state.colCount; j++) {
          state.mineArr[i][j] = {
            num: 0, //周围雷数
            open: false, //是否已打开
            hasLoop: false, //是否已递归
            flag: false, //是否已标雷
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
    };

    //生成随机整数 [0,max)
    function Random(max_r, max_c) {
      let x = Math.floor(Math.random() * max_r);
      let y = Math.floor(Math.random() * max_c);
      return [x, y];
    }

    //点击方块
    const open = (row, col) => {
      //点击的方块设置为打开
      state.mineArr[row][col].open = true;
      //点击的为雷
      if (state.mineArr[row][col].num === 10) {
        alert("输了");
      } else {
        const pos = getPosition(row, col);
        console.log(pos);
        //遍历坐标，如果发现有一个值为10则停止递归
        loop(pos);
        console.log("state.mineArr", state.mineArr);
      }

      //判断还有几个方块未打开
      let count = 0;
      for (let x = 0; x < state.mineArr.length; x++) {
        for (let y = 0; y < state.mineArr[x].length; y++) {
          if (!state.mineArr[x][y].open) {
            count = count + 1;
          }
        }
      }
      //未打开的方块数<=总雷数
      if (count <= state.mineCount) {
        alert("成功");
      }
      console.log(count);
    };

    //标记旗
    const setFlag = (x, y) => {
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
    initMine();
    onMounted(() => {});

    return {
      ...toRefs(state),
      open,
      setFlag,
    };
  },
};
</script>
<style scoped lang="scss">
.minesweeper {
  .game-box {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      background-color: rgb(219, 219, 211);
      border: 1px solid #eee;
      cursor: pointer;
      font-size: 24px;
      font-weight: 600;
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
        background-color: rgb(150, 150, 187);
      }
    }
  }
}
</style>
