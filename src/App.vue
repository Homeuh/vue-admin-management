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
</style>
