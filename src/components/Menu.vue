<template>
  <div class="menupanel">
    <div class="collapsible mode">
      <input id="collapsible-mode" type="checkbox" name="collapsible" />
      <label for="collapsible-mode">游戏难度</label>
      <div class="collapsible-body">
        <p @click="changeMode(1)">初级</p>
        <p @click="changeMode(2)">中级</p>
        <p @click="changeMode(3)">高级</p>
      </div>
    </div>
    <div class="collapsible set">
      <input id="collapsible-set" type="checkbox" name="collapsible" />
      <label for="collapsible-set">设置</label>
      <div class="collapsible-body">
        <p>12346</p>
        <p>12346</p>
        <p>12346</p>
        <p>12346</p>
        <p>12346</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  name: "Menu",
  props: {
    mode: Number,
  },
  emits: ["update:mode"],
  setup(props, { emit }) {
    const state = reactive({});
    //切换游戏难度
    const changeMode = (type) => {
      emit("update:mode", type);
    };
    onMounted(() => {});
    return {
      ...toRefs(state),
      changeMode,
    };
  },
};
</script>
<style scoped lang="scss">
.menupanel {
  p {
    cursor: pointer;
    margin-bottom: 10px;
  }
  .mode {
  }
}
</style>
