<template>
    <div>
        <!-- 卡片视图 -->
        <el-card>
            <el-table :data="rightsList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                        <el-tag type="danger" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import axios from '@/api/axios'
export default {
    data () {
        return {
            // 权限列表
            rightsList: []
        }
    },
    created () {
        this.getRightsList()
    },
    methods: {
        async getRightsList () {
            const res = await axios.request({
                url: 'rights/list',
                method: "get"
            })
            if (res.meta.status !== 200) {
                return this.$message.error('获取权限列表失败！')
            }
            this.rightsList = res.data
        }
    }
}
</script>

<style lang='less' scoped>
</style>
