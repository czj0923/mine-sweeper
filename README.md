# mine-sweeper

## 介绍
mine-sweeper是使用[vue3](https://v3.cn.vuejs.org/)开发的一个扫雷小游戏，实现了基本的扫雷游戏功能。\
欢迎热爱扫雷的玩家加入[扫雷网](http://saolei.wang/)

## 技术栈

1. 脚手架：vue-cli 4
2. 前端框架：vue 3.x
3. 状态管理：pinia
4. 路由:vue-router 4.x
5. css样式:paper.css

## 实现功能
- 插旗模式(FL)
- 不插旗模式(NF)
- 空白自动打开
- 难度选择
- 计时器
- 保存纪录


## 实现思路
使用一个二维数组存储每一个方格,用[row,col]来定位每一个方格坐标,数组每一项是一个对象，包含5个字段
```
 let obj={
    num: 0, //周围雷数
    open: false, //是否已打开
    hasLoop: false, //是否已递归
    flag: false, //是否已标雷
    light: false, //是否高亮
 }
 ```
 #### 初始化雷区
 生成随机数坐标，若该坐标已有雷，则重新生成，每生成一个雷，将周围一圈方块的雷数num++，最终若某个方块的num>10则该方块为雷

 #### 获取周围有效坐标
 某个方块周围的方块坐标为
 ```
 const aroundPos = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
 ```
通过filter筛选不超过边界的坐标

#### 打开方块
点击某一方块时使用递归查找周围无雷的方块，并把该方块open置为true

#### 游戏结束的判断
每次点击打开方块，或点击已打开方块自动打开
遍历方块数组，查找还有几个方块未打开

- 未打开的方块数<=总雷数，则为成功
- 只要有一个方块open和雷数10同时出现，则为失败

## 在线demo
扫雷 [点击试玩](https://czj0923.github.io/mine-sweeper/dist).

## 开发
### 克隆代码
```
git clone https://github.com/lin-xin/vue-manage-system.git
```
### 进入项目目录
```
cd mine-sweeper
```
### 安装依赖
```
npm install
```
### 使用淘宝镜像
```
npm install --registry=https://registry.npm.taobao.org
```
### 启动服务
```
npm run serve
```
### 打包
```
npm run build
```

