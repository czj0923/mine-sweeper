<template>
  <div class="minesweeper">
    <div
      class="game-box"
      :style="{
        width: 30 * rowCount + 'px',
      }"
    >
      <template v-for="(row, index) in mineArr" :key="index">
        <template v-for="(col, index2) in row" :key="col">
          <div
            class="box"
            :class="{ mine: col === 10 }"
            @click="open(index, index2)"
          >
            {{ col }}
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
export default {
  name: "MineSweeper",
  setup() {
    const { proxy } = getCurrentInstance();
    console.log(proxy);
    const state = reactive({
      mineCount: 10, //雷数
      colCount: 8, //列数
      rowCount: 8, //行数
      mineArr: [[]], //存放雷
    });

    //初始化雷
    const initMine = () => {
      for (let i = 0; i < state.rowCount; i++) {
        state.mineArr[i] = [];
        for (let j = 0; j < state.colCount; j++) {
          state.mineArr[i][j] = 0;
        }
      }
      for (let i = 0; i < state.mineCount; i++) {
        let [row, col] = Random(state.rowCount, state.colCount);
        //如果该位置有雷，则重新获取随机坐标
        while (state.mineArr[row][col] === 10) {
          [row, col] = Random(state.rowCount, state.colCount);
        }
        state.mineArr[row][col] = 10;
        //设置雷之后，把周围一圈非雷方块数字+1
        row > 0 && col > 0 && state.mineArr[row - 1][col - 1]++;
        row > 0 && state.mineArr[row - 1][col]++;
        row > 0 &&
          col < state.colCount - 1 &&
          state.mineArr[row - 1][col + 1]++;
        col > 0 && state.mineArr[row][col - 1]++;
        col < state.colCount - 1 && state.mineArr[row][col + 1]++;
        row < state.rowCount - 1 &&
          col > 0 &&
          state.mineArr[row + 1][col - 1]++;
        row < state.rowCount - 1 && state.mineArr[row + 1][col]++;
        row < state.rowCount - 1 &&
          col < state.colCount - 1 &&
          state.mineArr[row + 1][col + 1]++;
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
      console.log(row, col);
      state.mineArr[row][col];
    };
    onMounted(() => {
      initMine();
    });
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
      width: 30px;
      height: 30px;
      background-color: rgb(224, 222, 99);
      border: 1px solid #eee;
      cursor: pointer;
      font-size: 14px;
      &.mine {
        background-color: #f00;
      }
    }
  }
}
</style>
