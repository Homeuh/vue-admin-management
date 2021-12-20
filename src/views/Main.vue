<template>
    <el-container>
        <el-aside width="fit-content">
            <component-aside></component-aside>
        </el-aside>
        <el-container>
            <el-header>
                <component-header></component-header>
            </el-header>
            <el-main>
                <component-tag></component-tag>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import ComponentAside from "../components/ComponentAside"
import ComponentHeader from "../components/ComponentHeader"
import ComponentTag from "../components/ComponentTag"
export default {
    name: "Home",
    components: {
        ComponentAside,ComponentHeader,ComponentTag
    }
}
</script>

<style lang="less" scoped>
    .el-container{
        width: 100vw;
        height: 100vh;
    }
    .el-aside{
        overflow-x: hidden;
    }
    .el-header{
        background: #16a085;
    }
    .el-main{
        background: #ecf0f1;
        padding-top:0;
    }

</style>