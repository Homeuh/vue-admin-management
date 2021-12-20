<template>
    <div>
        <!-- 卡片视图 -->
        <el-card>
            <el-row>
                <el-col :span="6">
                    <!--  后端并未写查询的数据，返回认为全部数据  -->
                    <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getOrderList" @change="getOrderList">
                        <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 订单列表 -->
            <el-table :data="orderList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="订单编号" prop="order_number"></el-table-column>
                <el-table-column label="订单价格" prop="order_price"></el-table-column>
                <el-table-column label="是否付款">
                    <template slot-scope="scope">
                        <el-tag type="danger" size="mini" v-if="scope.row.pay_status">未付款</el-tag>
                        <el-tag type="success" size="mini" v-else>已付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否发货" prop="is_send"></el-table-column>
                <el-table-column label="下单时间" prop="create_time">
                    <template v-slot="scope">{{scope.row.create_time | dataFormat }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog"></el-button>
                        <el-button
                            type="success"
                            size="mini"
                            icon="el-icon-location"
                            @click="showProgressDialog"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>

        <!-- 编辑对话框 -->
        <el-dialog
            title="修改地址"
            :visible.sync="addressDialogVisible"
            width="50%"
            @close="addressDialogClosed"
        >
            <el-form
                :model="addressForm"
                :rules="addressFormRules"
                ref="addressFormRef"
                label-width="100px"
            >
                <el-form-item label="省市区/县" prop="address1">
                    <el-cascader
                        v-model="addressForm.address1"
                        :options="cityData"
                        :props="{ expandTrigger: 'hover' }"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
import cityData from './citydata.js'
import axios from '@/api/axios'

export default {
    data () {
        return {
            // 订单列表查询参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            total: 0,
            // 订单列表
            orderList: [],
            // 修改地址对话框
            addressDialogVisible: false,
            addressForm: {
                address1: [],
                address2: ''
            },
            addressFormRules: {
                address1: [
                    { required: true, message: '请选择省市区县', trigger: 'blur' }
                ],
                address2: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            },
            cityData,
        }
    },
    created () {
        this.getOrderList()
    },
    methods: {
        async getOrderList () {
            if(this.queryInfo.query !== "") return this.$message.info("查询接口尚未实现，敬请期待")
            const res = await axios.request({
                url: 'orders',
                method: "get",
                params: this.queryInfo
            })
            // console.log(res)
            if (res.meta.status !== 200) {
                return this.$message.error('获取订单列表失败！')
            }
            this.total = res.data.total
            this.orderList = res.data.goods
        },
        // 分页
        handleSizeChange (newSize) {
            this.queryInfo.pagesize = newSize
            this.getOrderList()
        },
        handleCurrentChange (newSize) {
            this.queryInfo.pagenum = newSize
            this.getOrderList()
        },
        showEditDialog () {
            this.addressDialogVisible = true
        },
        submitAddress(){
            this.$refs.addressFormRef.validate(async (valid) => {
                if (!valid) {
                    this.$message.error("提交信息有误，请重新输入！")
                    return false
                } else {
                    this.$message.info("修改地址模块尚未实现API接口，敬请期待！")
                    this.addressDialogVisible = false
                }
            });
        },
        addressDialogClosed () {
            this.$refs.addressFormRef.resetFields()
        },
        showProgressDialog () {
            this.$message.info("物流模块尚未实现，敬请期待！")
        }
    }
}
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 20px;
    margin-bottom: 20px;
}
.el-cascader {
    width: 100%;
}
</style>
