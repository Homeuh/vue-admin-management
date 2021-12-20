<template>
    <div class="tag">
        <el-tag v-for="(menu,index) in menuTags"
                :key="menu.path"
                :closable="index!==0"
                @click="redirect(menu)"
                :effect="$route.name === menu.path? 'dark' : 'plain'"
                @close="handleClose(index)"
                >{{menu.authName}}</el-tag>
    </div>
</template>

<script>
export default {
    name: "ComponentTag",
    data() {
        return {
            menuTags: this.$store.state.tab.menuTags
        }
    },
    methods: {
      redirect(item) {
          this.$router.push({name: item.path});
          this.$store.commit("selectMenu",item);
      },
      handleClose(index){
          //导航菜单标签menuTags去除当前选中
          this.$store.state.tab.menuTags.splice(index,1);
          //回退当前路由$route为删减后menuTags最后一个元素
          const length = this.$store.state.tab.menuTags.length - 1;
          const backRoute = this.$store.state.tab.menuTags[length];
          this.redirect(backRoute);
      }
    }
}
</script>

<style lang="less" scoped>
    .tag{
        text-align: left;
        .el-tag{
            margin: 10px 0 10px 20px;
        }
    }
</style>