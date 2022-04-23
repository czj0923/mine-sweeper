<template>
  <div class="menupanel">
    <div class="collapsible mode">
      <input id="collapsible-mode" type="checkbox" name="collapsible" />
      <label for="collapsible-mode"
        ><p class="badge success">游戏难度</p></label
      >
      <div class="collapsible-body">
        <ul>
          <li v-for="(item, index) in state.modeArr" :key="index">
            <button
              :class="[`btn-${item.btn}-outline`, 'btn-small']"
              @click="changeMode(index + 1)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="collapsible record">
      <input id="collapsible-record" type="checkbox" name="collapsible" />
      <label for="collapsible-record"
        ><p class="badge secondary">纪录</p></label
      >
      <div class="collapsible-body">
        <ul>
          <li>{{ store.getRecord.cj }}</li>
          <li>{{ store.getRecord.zj }}</li>
          <li>{{ store.getRecord.gj }}</li>
        </ul>
      </div>
    </div>
    <div class="collapsible set">
      <input id="collapsible-set" type="checkbox" name="collapsible" />
      <label for="collapsible-set"><p class="badge">设置</p></label>
      <div class="collapsible-body">
        <ul>
          <li>
            方块大小
            <div class="form-group">
              <input
                class="input-block"
                type="range"
                name="percentage"
                id="percentage"
                min="20"
                max="50"
                v-model="store.set.size"
              />
              <p>{{ store.set.size }}px</p>
            </div>
          </li>
          <li>
            全屏
            <fieldset class="form-group">
              <label class="paper-switch-2">
                <input
                  id="paperSwitch"
                  name="paperSwitch"
                  type="checkbox"
                  v-model="store.set.fullScreen"
                />
                <span class="paper-switch-slider round"></span>
              </label>
            </fieldset>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from "vue";
import { useMainStore } from "../store/main";

const props = defineProps({
  mode: Number,
});

const emit = defineEmits(["update:mode"]);
const state = reactive({
  size: 25,
  modeArr: [
    {
      name: "初级",
      btn: "success",
    },
    {
      name: "中级",
      btn: "warning",
    },
    {
      name: "高级",
      btn: "danger",
    },
  ],
});
const store = useMainStore();
//切换游戏难度
const changeMode = (type: number) => {
  emit("update:mode", type);
};
</script>
<style scoped lang="scss">
.menupanel {
  li {
    cursor: pointer;
    margin-bottom: 10px;
  }
  .set {
    .form-group {
      display: flex;
      justify-content: center;
      input {
        display: block;
        margin-right: 20px;
      }
    }
  }
}
</style>
