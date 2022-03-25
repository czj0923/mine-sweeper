<template>
  <teleport to="body">
    <transition-group name="alert" tag="ul" class="alert-group">
      <li
        v-for="item in store.alertQueue"
        :key="item.id"
        class="alert"
        :class="[`alert-${item.type}`]"
      >
        {{ item.content }}
      </li>
    </transition-group>
  </teleport>
</template>

<script>
import { useMainStore } from "../store/main";
export default {
  name: "Alert",
  setup() {
    const store = useMainStore();

    return {
      store,
    };
  },
};
</script>
<style scoped lang="scss">
.alert-group {
  text-align: center;
  margin: 0 auto;
  width: 40%;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  li::before {
    content: none;
  }
  .alert {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
  }
}
</style>
