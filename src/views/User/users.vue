<template>
    <div>
    <el-card shadow="never">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getUserList" @change="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="addUserVisible = true">添加用户</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" row-key="id" border stripe style="width: 100%">
            <el-table-column type="index" label="编号"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_state" label="状态">
                <template v-slot="slotProps">
                    <el-switch v-model="slotProps.row.mg_state" @change="stateChange(slotProps.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="slotProps">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(slotProps.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteUser(slotProps.row.id)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--    分页栏    -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5,10,15,20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </el-card>

        <!--    添加用户对话框     -->
        <el-dialog title="新增用户" :visible.sync="addUserVisible" @close="addDialogClear">
            <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm" label-width="120px">
                <el-form-item label="用户名" prop="username" autocomplete="off">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser('addUserForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!--    编辑用户信息    -->
        <el-dialog title="修改用户信息" :visible.sync="editUserVisible" @close="editDialogClear">
            <el-form :model="editUserForm" :rules="editUserRules" ref="editUserForm" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserForm.email" type="email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editUserForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="roleValueID" placeholder="请选择角色" clearable>
                        <el-option
                            v-for="item in editUserRoleOptions"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUserVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUser('editUserForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from '@/api/axios'
export default {
    name: "users",
    data() {
        let checkEmail =  (rule, value, callback) => {
            if (value === "") {
                return callback();
            }
            const reg = /^([a-z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/
            if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱地址'));
            } else {
                callback();
                }
        };
        let checkMobile = (rule, value, callback) => {
            if (value === "") {
                return callback();
            }
            const reg =  /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        return {
            queryInfo: {
                query: "",
                // 当前页数
                pagenum: 1,
                // 每页显示多少数据
                pagesize: 5
            },
            tableData: [],
            total: 0,

            formLabelWidth: "120px",
            addUserVisible: false,
            addUserForm: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            addUserRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '用户名长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                ],
                mobile: [{ validator: checkMobile, trigger: 'blur' }]
            },

            editUserVisible : false,
            editUserForm: {},
            editUserRoleOptions: [],
            roleValueID: "",
            editUserRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '用户名长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                ],
                mobile: [{ validator: checkMobile, trigger: 'blur' }]
            }
        }
    },
    created(){
        this.getUserList()
    },
    methods: {
        async getUserList(){
            const res = await axios.request( {
                url: 'users',
                method: 'get',
                params: this.queryInfo
            });
            // console.log(res)
            this.tableData = res.data.users
            this.total = res.data.total
        },

        //用户状态修改
        async stateChange(user){
            // users/:uId/state/:type
            // console.log(user)
            const res = await axios.request({
                url: `users/${user.id}/state/${user.mg_state}`,
                method: 'put'
            });
            if (res.meta.status !== 200) {
                return this.$message.error('更新用户状态失败！');
            }
            this.$message.success('更新用户状态成功！');
        },

        //修改每页显示条数
        handleSizeChange(pageSize){
            // console.log(pagesize)
            this.queryInfo.pagesize = pageSize
            this.getUserList()
        },
        //修改当前页码
        handleCurrentChange(pageNum){
            // console.log(pagenum)
            this.queryInfo.pagenum = pageNum
            this.getUserList()
        },

        //添加用户表单提交
        addUser(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) {
                    this.$message.error('提交信息有误，请重新输入!!');
                    return false;
                } else {
                    const res = await axios.request({
                        url: "users",
                        method: "post",
                        data: this.addUserForm//post方法的参数传递是data不是params
                    })
                    if (res.meta.status !== 201) {
                        return this.$message.error('添加用户失败！')
                    }
                    this.$message.success('添加用户成功！')
                    // 隐藏添加用户对话框
                    this.addUserVisible = false
                    await this.getUserList()
                }
            });
        },
        //添加用户表单关闭时重置
        addDialogClear(){
            this.$refs.addUserForm.resetFields();
        },

        //将该用户信息返回至对话框
        async showEditDialog(form){
            //用户数据获取
            this.editUserForm = form;
            //所有角色获取
            const res = await axios.request({
                url: "roles",
                method: "get"
            })
            // console.log(res);
            this.editUserRoleOptions = res.data;
            this.editUserVisible = true;
        },
        //修改用户信息提交
        editUser(formName){
            console.log(formName)
            this.$refs[formName].validate(async (valid) => {
                if (!valid) {
                    this.$message.error('提交信息有误，请重新输入!!');
                    return false;
                }
                else {
                    const res1 = await axios.request({
                        url: `users/${this.editUserForm.id}`,
                        method: "put",
                        data: {
                            email: this.editUserForm.email,
                            mobile: this.editUserForm.mobile
                        }
                    })
                    // console.log(res1)
                    //判断是否更换角色，有不一样的判别
                    if (!this.roleValueID){
                        if (res1.meta.status !== 200 ) {
                            return this.$message.error('修改用户失败！！')
                        }
                        this.$message.success('修改用户成功！')
                    }
                    else{
                        //角色更改请求发送
                        const res2 = await axios.request({
                            url: `users/${this.editUserForm.id}/role`,
                            method: "put",
                            data: {
                                rid: this.roleValueID
                            }
                        })
                        // console.log(res2)
                        //判断是否角色数据和角色都修改成功
                        if (!await axios.all([res1,res2])) {
                            return this.$message.error('修改用户失败！！')
                        }
                        this.$message.success('修改用户成功！')
                    }
                    // 隐藏修改用户对话框
                    this.editUserVisible = false
                    //刷新表格数据
                    await this.getUserList()
                }
            });
        },
        //修改用户信息表单关闭时重置
        editDialogClear(){
            this.$refs.editUserForm.resetFields();
            this.roleValueID = "";
            this.getUserList()//①关闭后出现user表格数据污染，这里重新后端请求赋值解决；
                              // ②也可以通过插槽传值给showEditDialog()方法,请求返回数据赋值给editForm解决
        },

        //删除用户
        deleteUser(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await axios.request({
                    url: `users/${id}`,
                    method: 'delete'
                })
                if(res.meta.status === 200){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
                await this.getUserList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
}
</script>

<style scoped>
    .el-table{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .block{
        text-align: left;
    }
</style>