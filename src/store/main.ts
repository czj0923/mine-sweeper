import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      id: 0,
      alertQueue: [],
      record: {
        //最快纪录
        cj: 0,
        zj: 0,
        gj: 0,
      },
      set: {
        //设置项
        size: "25",
        fullScreen: false,
      },
    };
  },
  getters: {
    getRecord(state: { record: { cj: number; zj: number; gj: number } }) {
      return {
        cj: `初级纪录 ${state.record.cj}秒`,
        zj: `中级纪录 ${state.record.zj}秒`,
        gj: `高级纪录 ${state.record.gj}秒`,
      };
    },
  },
  actions: {
    //添加alert
    addAlert(data: any) {
      this.$patch((state: { id: number }) => state.id++);
      if (this.alertQueue.length > 1) {
        this.alertQueue.shift();
      }
      this.alertQueue.push(Object.assign(data, { id: this.id }));
      setTimeout(() => {
        this.alertQueue.shift();
      }, 2000);
    },

    //更新纪录
    refreshRecord(data: { [x: string]: any }) {
      //和现有纪录作比较
      Object.keys(data).forEach((key) => {
        if (data[key] < this.record[key] || !this.record[key]) {
          this.record[key] = data[key];
        }
      });
      const newRecord = this.record;
      //同时存入localStorage
      window.localStorage.setItem("record", JSON.stringify(newRecord));
    },
  },
});
