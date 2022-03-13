<template>
  <div class="minesweeper">
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
          >
            {{ el.num ? el.num : "" }}
            {{ el.open ? "o" : "" }}
          </div>
        </template>
      </template>
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
    });

    //获取在坐标面板内部的坐标
    const getPosition = (x, y, max_x, max_y) => {
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
        return arr[0] >= 0 && arr[0] < max_x && arr[1] >= 0 && arr[1] < max_y;
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

        const pos = getPosition(row, col, state.rowCount, state.colCount);

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
      const pos = getPosition(row, col, state.rowCount, state.colCount);
      console.log(pos);
      //遍历坐标，如果发现有一个值为10则停止递归
      state.mineArr = loop(pos, state.mineArr);
      console.log("state.mineArr", state.mineArr);

      //state.mineArr[row][col];
    };

    //使用递归打开方块
    const loop = (pos, arr) => {
      //周围方块是否存在雷
      const bool = pos.every((item) => {
        const [x, y] = item;
        return arr[x][y].num !== 10;
      });

      if (bool) {
        pos.forEach((item) => {
          const [x, y] = item;
          arr[x][y].open = true;
          const _pos = getPosition(x, y, state.rowCount, state.colCount);
          loop(_pos, arr);
        });
      } else {
        console.log(54565464);
        return arr;
      }
    };
    initMine();
    onMounted(() => {});
    return {
      ...toRefs(state),
      open,
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
    }
  }
}
</style>
