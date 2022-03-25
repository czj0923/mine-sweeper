import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      count: 1,
      id: 0, //alert的唯一id
      alertQueue: [], //alert队列
    };
  },
  getters: {},
  actions: {
    //添加alert
    addAlert(data) {
      this.$patch((state) => state.id++);
      if (this.alertQueue.length > 1) {
        this.alertQueue.shift();
      }
      this.alertQueue.push(Object.assign(data, { id: this.id }));
      setTimeout(() => {
        this.alertQueue.shift();
      }, 20000);
    },
  },
});
