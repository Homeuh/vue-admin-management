<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    #app {
      color: #2c3e50;
    }
    /*全局滚动条样式覆盖*/
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #a1a3a9;
        border-radius: 10px;
    }
    /*二级菜单的父级菜单也随之高亮*/
    .el-submenu.is-active > .el-submenu__title{
        color: #409EFF !important;
    }
    /*父级菜单i内容被写死要再次定义*/
    .el-submenu.is-active > .el-submenu__title i{
        color: #409EFF ;
    }
</style>
