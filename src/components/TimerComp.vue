<template>
  <div class="timer">
    用时 {{ hour_str }} : {{ minute_str }} : {{ second_str }}
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      hour: 0,
      minute: 0,
      second: 0,
      timer: -1,
    });

    //开始计时
    const start = () => {
      state.timer = setInterval(() => {
        state.second++;
        if (state.second >= 60) {
          state.minute++;
          state.second = 0;
        }
        if (state.minute >= 60) {
          state.hour++;
          state.minute = 0;
        }
      }, 1000);
    };

    //格式化秒数
    const second_str = computed(() => {
      return state.second >= 0 && state.second < 10
        ? "0" + state.second
        : state.second;
    });
    //格式化分钟数
    const minute_str = computed(() => {
      return state.minute >= 0 && state.minute < 10
        ? "0" + state.minute
        : state.minute;
    });
    //格式化小时数
    const hour_str = computed(() => {
      return state.hour >= 0 && state.hour < 10 ? "0" + state.hour : state.hour;
    });

    //停止计时
    const stop = () => {
      clearInterval(state.timer);
      state.hour = 0;
      state.minute = 0;
      state.second = 0;
    };

    //暂停
    const pause = () => {
      console.log("暂停");
      clearInterval(state.timer);
    };

    const allSecond = () => {
      return state.hour * 3600 + state.minute * 60 + state.second;
    };

    return {
      ...toRefs(state),
      second_str,
      minute_str,
      hour_str,
      start,
      pause,
      stop,
      allSecond,
    };
  },
});
</script>
<style scoped>
.timer {
}
</style>
