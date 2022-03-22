<template>
  <teleport to="body">
    <transition name="alert">
      <div class="alert" :class="['alert-' + type]" v-if="visible">
        <slot>切换成功</slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      default: "success",
    },
    visible: {
      type: Boolean,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const state = reactive({});

    //监听弹窗出现，2s后自动关闭
    watchEffect(() => {
      if (props.visible) {
        setTimeout(() => {
          emit("update:visible", false);
        }, 2000);
      }
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped>
.alert {
  text-align: center;
  margin: 0 auto;
  width: 50%;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
}
</style>
