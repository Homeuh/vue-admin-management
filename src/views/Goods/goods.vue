<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddPage">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格数据 -->
            <el-table :data="goodsList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="80px"></el-table-column>
                <el-table-column label="商品数量" prop="goods_number" width="80px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="200px">
                    <template v-slot="scope">{{scope.row.add_time | dataFormat }}</template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template v-slot="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            @click="removeById(scope.row.goods_id)"
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
                background
            ></el-pagination>
        </el-card>

        <!--    编辑商品信息    -->
        <el-dialog title="修改商品信息" :visible.sync="editGoodsVisible" @close="editDialogClear">
            <el-form :model="editGoodsForm" :rules="editGoodsRules" ref="editGoodsForm" label-width="120px">
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="editGoodsForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="goods_price">
                    <el-input v-model="editGoodsForm.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="goods_number">
                    <el-input v-model="editGoodsForm.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="重量" prop="goods_weight">
                    <el-input v-model="editGoodsForm.goods_weight"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editGoodsVisible = false">取 消</el-button>
                <el-button type="primary" @click="editGoods('editGoodsForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "@/api/axios"
export default {
    data () {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            // 商品列表
            goodsList: [],
            // 商品总数
            total: 0,

            editGoodsVisible : false,
            editGoodsForm: {},
            picValue: "",//暂时用空字符串代替
            editGoodsRules: {
                goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur"}],
                goods_price: [{ required: true, message: "请输入商品价格", trigger: "blur"}],
                goods_number: [{ required: true, message: "请输入商品数量", trigger: "blur"}],
                goods_weight: [{ required: true, message: "请输入商品重量", trigger: "blur"}]
            }
        }
    },
    created () {
        this.getGoodsList()
    },
    methods: {
        // 根据分页获取对应的商品列表
        async getGoodsList () {
            const res = await axios.request({
                url: "goods",
                method: "get",
                params: this.queryInfo
            })
            // console.log(res)
            if (res.meta.status !== 200) {
                return this.$message.error('获取商品列表失败！')
            }
            this.goodsList = res.data.goods
              // console.log(this.goodsList)
            this.total = res.data.total
        },
        handleSizeChange (newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        handleCurrentChange (newSize) {
            this.queryInfo.pagenum = newSize
            this.getGoodsList()
        },

        //将该商品信息返回至对话框
        async showEditDialog(form){
            //商品数据获取
            this.editGoodsForm = form;
            this.editGoodsVisible = true;
        },
        //修改商品信息提交
        editGoods(formName){
            // console.log(formName)
            this.$refs[formName].validate(async (valid) => {
                if (!valid) {
                    this.$message.error('提交信息有误，请重新输入!!');
                    return false;
                }
                else {
                    const res1 = await axios.request({
                        url: `goods/${this.editGoodsForm.goods_id}`,
                        method: "put",
                        data: {
                            goods_name: this.editGoodsForm.goods_name,
                            goods_price: this.editGoodsForm.goods_price,
                            goods_number: this.editGoodsForm.goods_number,
                            goods_weight: this.editGoodsForm.goods_weight,
                        }
                    })
                    // console.log(res1)
                    //判断是否上传图片，有不一样的判别
                    if (!this.picValue){
                        if (res1.meta.status !== 200 ) {
                            return this.$message.error('修改商品失败！！')
                        }
                        this.$message.success('修改商品成功！')
                    }
                    // else{}
                    // 隐藏修改商品对话框
                    this.editGoodsVisible = false
                    //刷新表格数据
                    await this.getGoodsList()
                }
            });
        },
        //修改商品信息表单关闭时重置
        editDialogClear(){
            this.$refs.editGoodsForm.resetFields();
            this.getGoodsList()//①关闭后出现Goods表格数据污染，这里重新后端请求赋值解决；
                              // ②也可以通过插槽传值给showEditDialog()方法,请求返回数据赋值给editForm解决
        },

        // 通过Id删除商品
        async removeById (id) {
            const confirmResult = await this.$confirm(
                '此操作将永久删除该商品, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除！')
            }
            const res = await axios.request({
                url: 'goods/' + id,
                method: "delete"
            })
            if (res.meta.status !== 200) {
                return this.$message.error('删除商品失败！')
            }
            this.$message.success('删除商品成功！')
            this.getGoodsList()
        },
        goAddPage () {
            // this.$router.push('/goods/add');
            this.$message.info("该模块暂未实现，敬请期待")
        }
    }
}
</script>

<style lang="less" scoped>
.el-table{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
