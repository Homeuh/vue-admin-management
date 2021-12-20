<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImage" alt="">
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p><span>上次登录时间: </span><span>2021-07-19</span></p>
                    <p><span>上次登录地点: </span><span>中山</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px">
                <el-table :data="tableData">
                    <el-table-column
                        show-overflow-tooltip
                        v-for="(value,key) in tableLabel"
                        :key="key"
                        :prop="key"
                        :label="value">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card
                    shadow="hover"
                    v-for="(item,index) in countData"
                    :key="index"
                    :body-style="{
                        padding: 0,
                        width:'100%',
                        height:'100%',
                        display: 'flex',
                    }">
                    <div class="icon">
                        <i class="icon" :class="`el-icon-${item.icon}`"></i>
                    </div>
                    <div class="detail">
                        <p class="num">￥{{item.value}}</p>
                        <p class="num_description">￥{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover" style="height: 280px; margin-top: 20px">
                <div style="height: 280px" ref="echarts"></div>
            </el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-card shadow="hover" style="height: 260px">
                        <div style="height: 240px" ref="userEcharts"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover" style="height: 260px">
                        <div style="height: 240px" ref="videoEcharts"></div>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import {getHome} from "/src/api/data"
import * as echarts from 'echarts'
export default {
    name: "home",
    data() {
        return {
            userImage: require("@/assets/daolong.jpg"),
            tableData: [
                /*{
                    name: "oppo",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: "vivo",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: "三星",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: "小米",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: "华为",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: "苹果",
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },*/
            ],
            tableLabel: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: "1234",
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "今日收藏订单",
                    value: "210",
                    icon: "star-on",
                    color: "#ffb988"
                },
                {
                    name: "今日未支付订单",
                    value: "1234",
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
                {
                    name: "本月支付订单",
                    value: "310",
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "本月收藏订单",
                    value: "210",
                    icon: "star-on",
                    color: "#ffb988"
                },
                {
                    name: "本日未支付订单",
                    value: "1234",
                    icon: "s-goods",
                    color: "#5ab1ef"
                },
            ],
            echartsData: {
                order: {
                    legend: {
                        //图例文字颜色
                        textStyle: {
                            color: "#333"
                        }
                    },
                    grid: {
                        left: "20%"
                    },
                    //提示框
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: {
                        type: "category",
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333"
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        }
                    },
                    color: ["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
                    series: []
                },
                user: {
                    legend: {
                        //图例文字颜色
                        textStyle: {
                            color: "#333"
                        }
                    },
                    grid: {
                        left: "20%"
                    },
                    //提示框
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: {
                        type: "category",//类目轴
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333"
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3"
                            }
                        }
                    },
                    color: ["#2ec7c9","#b6a2de"],
                    series: []
                },
                video: {
                    tooltip: {
                        trigger: "item"
                    },
                    color: ["#0f78f4","#dd536b","#9462e5","#a6a6a6","#e1bb22","#39c362","#3ed1cf"],
                    series: []
                }
            },
        }
    },
    //挂载时mock模拟数据请求是否成功
    mounted() {
        getHome().then(res=>{
            // console.log(res);
            this.tableData = res.data.tableData;

            //折线图
            const order = res.data.orderData;
            // console.log(order)
            this.echartsData.order.xAxis.data = order.date;
            // console.log(order.data[0])
            for (const key in order.data[0]) {
                // console.log(key)
                this.echartsData.order.series.push({
                    name: key,
                    data: order.data.map(item => item[key]),
                    type: "line"
                });
            }
            // console.log(this.$refs.echarts)
            const myEcharts = echarts.init(this.$refs.echarts);
            myEcharts.setOption(this.echartsData.order);

            //柱状图->用户图
            this.echartsData.user.xAxis.data = res.data.userData.map(item => item.data);
            this.echartsData.user.series.push({
                name: '新增用户',
                data: res.data.userData.map(item => item.new),
                type: "bar"
            });
            this.echartsData.user.series.push({
                name: '活跃用户',
                data: res.data.userData.map(item => item.active),
                type: "bar"
            });
            const myUserEcharts = echarts.init(this.$refs.userEcharts);
            myUserEcharts.setOption(this.echartsData.user);

            //饼图
            this.echartsData.video.series.push({
                data: res.data.videoData,
                type: 'pie'
            });
            const myVideoEcharts = echarts.init(this.$refs.videoEcharts);
            myVideoEcharts.setOption(this.echartsData.video);
        })
    }
}
</script>

<style lang="less" scoped>
    .el-col{
        >.el-card{
            .user{
                display: flex;
                justify-content: space-around;
                padding-bottom: 20px;
                border-bottom: 1px solid #e6e6e6;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                .userInfo{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .name{
                        font-weight: bold;
                        font-size: 2em;
                    }
                }
            }
            .login-info{
                p{
                    font-size: .8em;
                    display: flex;
                    justify-content: space-between;
                    padding-top: 20px;
                    span{
                        width: 100px;
                        &:first-child{
                            color: #a1a3a9;
                        }
                    }
                }
            }
        }
        >.num{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 80px 80px;
            grid-gap: 20px 10px;
            .el-card{
                .icon{
                    width: 33.33%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ffffff;
                    font-size: 1.2em;
                };
                .detail{
                    width: 66.67%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p:first-child{
                        font-weight: bold;
                        font-size: 1.5em;
                    }
                    p:last-child{
                        font-size: .8em;
                        color: #a1a3a9;
                    }
                };
                &:nth-child(3n+1) .icon{
                    background: #2ec7c9;
                };
                &:nth-child(3n+2) .icon{
                    background: #ffb988;
                };
                &:nth-child(3n+3) .icon{
                    background: #5ab1ef;
                };
            }
        }
    }
</style>