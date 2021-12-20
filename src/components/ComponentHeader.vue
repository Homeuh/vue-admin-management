<template>
    <header>
        <div class="l-header">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu()"></el-button>
            <el-breadcrumb >
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="matchMenu" v-if="matchMenu">{{ $store.state.tab.currentMenu.authName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-header">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img :src="userImage" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
export default {
    name: "ComponentHeader",
    data() {
        return {
            userImage: require("@/assets/daolong.jpg")
        }
    },
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        handleCommand(command){
            // console.log(command)
            if(command === "logout")
                this.logout()
        },
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login")
        }
    },
    computed: {
        matchMenu(){
            return this.$store.state.tab.currentMenu
        }
    }
}
</script>

<style scoped>
    header{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .l-header{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-breadcrumb{
        margin-left: 1em;
    }
    .el-dropdown-link{
        cursor: pointer
    }
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>