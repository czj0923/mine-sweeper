<template>
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
          确定
        </button>
        <button class="btn-success btn-small" @click="confirm">重新开始</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
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
  },
  emits: ["update:visible", "confirm"],
  setup(props, { emit }) {
    //点击关闭
    const close = () => {
      emit("update:visible", false);
    };
    const confirm = () => {
      emit("update:visible", false);
      emit("confirm");
    };
    return {
      close,
      confirm,
    };
  },
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
