<template>
    <div class="loginContainer">
        <h2>电商后台管理登录界面</h2>
        <div class="animation">
        <el-form label-width="80px"
                 :model="loginForm"
                 ref="loginForm"
                 :hide-required-asterisk="true"
                 style="width: 300px"
                 :rules="loginRules"
                 @keydown.enter.native="submitForm">
            <div class="after"></div>
            <el-form-item label="用户名" prop="username">
                <span slot="label" style="color: #ffffff; position: relative;z-index: 1">用户名</span>
                <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <span slot="label" style="color: #ffffff; position: relative; z-index: 1;">密码</span>
                <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
import axios from "@/api/axios"
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '用户名长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.loginForm.validate(async (valid) => {
                if (!valid) {
                    this.$message.error('登录信息有误，请重新输入！！！');
                    return false;
                }
                const res = await axios.request({
                    url: "login",
                    method: "post",
                    data: this.loginForm
                })
                // console.log(res)
                if(res.meta.status !== 200) return this.$message.error("用户名或密码错误，请重新输入！")
                this.$message.success("登录成功")
                //设置token令牌
                window.sessionStorage.setItem("token", res.data.token);
                await this.$router.push("/main")
            });
        },
        resetForm() {
            this.$refs.loginForm.resetFields();
        },
    }
}
</script>

<style lang="less" scoped>
    .loginContainer{
        width: 100vw;
        height: 100vh;
        background-color: #2c3e50;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2{
            margin-bottom: 30px;
            color: #5ab1ef;
        }
        .animation{
            width: 400px;
            height: 350px;
            border-radius: 5px;
            position: relative;
            overflow: hidden;
            //伪元素减少DOM渲染节点
            &::before{
                content: "";
                background-image: conic-gradient(#cd4a48 20deg,
                                    #ffA500 40deg,
                                    #f5e327 60deg,
                                    #16a085 80deg,
                                    #357bbf 100deg,
                                    transparent 120deg);
                width: 800px;
                height: 700px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                animation: rotate 2s linear infinite;
            }
            //不适合使用after伪元素，渲染层级会导致表单内容被覆盖
            .after{
                background: #2c3e50;
                width: 380px;
                height: 330px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .el-form{
            border: 10px solid #ffffff;
            padding: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: #ffffff;
            .el-form-item{
                .el-input{
                    position: relative;
                    overflow: hidden;
                }
                .el-input::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    z-index: 1;
                    height: 2px;
                    background-image: linear-gradient(90deg,#cd4a48,#ffA500,#f5e327,#16a085,#357bbf);
                    transform: translateX(-100%);
                }
                .el-input:hover::before{
                    transform: translateX(100%);
                    transition: 2s;
                }
            }
        }
    }
    @keyframes rotate {
        from{
            transform: translate(-50%,-50%) rotate(0deg);
        }
        to{
            transform: translate(-50%,-50%) rotate(360deg);
        }
    }
</style>