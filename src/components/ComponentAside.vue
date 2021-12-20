<template>
    <el-menu class="el-menu-vertical-demo"
             :collapse="isCollapse"
             background-color="#34495e"
             text-color="#ffffff"
             :default-active="$route.path"
             :collapse-transition="false"
             unique-opened>
        <h3 v-show="!isCollapse">电商后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item :index="'/'+item.path" v-for="item in hasNoChildren" :key="item.path" @click="redirect(item)">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{ item.authName }}</span>
        </el-menu-item>
        <el-submenu :index="'/'+item.path" v-for="(item,key) in hasChildren" :key="item.children.path">
            <template slot="title">
                <i :class="icon[key].name"></i>
                <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/'+children.path"
                          v-for="children in item.children"
                          :key="children.path"
                          @click="redirect(children)">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ children.authName }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import axios from "@/api/axios";

export default {
    name: "Aside",
    data() {
        return {
            menu:[
                {path: "home", authName: "首页", icon: "s-home"}
                // {path: "/home", name: "home", authName: "首页", icon: "s-home", url: "Home/Home"},
                // {path: "/mall", name: "mall", label: "商品管理", icon: "video-play", url: "MallManage/MallManage"},
                // {path: "/user", name: "user", label: "用户管理", icon: "user", url: "UserManage/UserManage"},
                // {label: "其他", icon: "location",
                //     children: [
                //         {path: "/about/page1", name: "page1", label: "页面1", icon: "setting", url: "Other/PageOne"},
                //         {path: "/about/page2", name: "page2", label: "页面2", icon: "setting", url: "Other/PageTwo"},
                //     ]
                // }
            ],
            icon:[
                {name: "el-icon-user-solid"},
                {name: "el-icon-s-claim"},
                {name: "el-icon-s-goods"},
                {name: "el-icon-s-order"},
                {name: "el-icon-s-marketing"},
            ]
        };
    },
    computed: {
        hasNoChildren(){
            return this.menu.filter(item=>!item.children)
        },
        hasChildren(){
            return this.menu.filter(item=>item.children).slice(0,-1)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    },
    created(){
      this.getMenu();
    },
    methods: {
        async getMenu(){
            const res = await axios.request({
                url: "menus",
                method: "get"
            })
            // console.log(res)
            if(res.meta.status !== 200) return this.$message.error("获取菜单列表失败");
            this.menu = [...this.menu,...res.data];
            // console.log(this.menu)
        },
        redirect(item){
            this.$router.push({name: item.path});
            this.$store.commit("selectMenu",item);
            this.$store.commit("mapMenu",item);
            this.$store.commit("popMenu",item)
        }
    }
}
</script>

<style scoped>
    .el-menu{
        text-align: left;
        border: 0;
    }
    .el-menu-vertical-demo{
        width: 64px;
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
    }
    h3{
        text-align: center;
        padding: 17.56px 0;
        background: #2c3e50;
        color: #ffffff;
    }
</style>