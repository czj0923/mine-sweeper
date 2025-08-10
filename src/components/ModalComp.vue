<template>
  <teleport to="body">
    <div class="modal" :class="{ show: visible }">
      <label class="modal-bg" @click="close"></label>
      <div class="modal-body">
        <label class="btn-close" @click="close">X</label>
        <h4 class="modal-title">{{ title }}</h4>
        <p class="modal-text">
          {{ content }}
        </p>
        <div class="btn-group">
          <button class="btn-success-outline btn-small" @click="close">
            {{ btn1 }}
          </button>
          <button class="btn-success btn-small" @click="confirm">
            重新开始
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  //第一个按钮的文案
  btn1: {
    type: String,
    default: "确定",
  },
});

const emit = defineEmits(["update:visible", "confirm"]);

//点击关闭
const close = () => {
  emit("update:visible", false);
};
const confirm = () => {
  emit("update:visible", false);
  emit("confirm");
};
</script>

<style scoped lang="scss">
.modal {
  &.show {
    visibility: visible;
    opacity: 1;
    .modal-body {
      top: 50%;
    }
  }
  .modal-body {
    min-width: 40%;
    .btn-group {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
