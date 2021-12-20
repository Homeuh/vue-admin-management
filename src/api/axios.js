import axios from 'axios'
// import config from '../config'
//设置配置: 根据 开发环境 和 生产环境 不一样
// const baseURL = process.env.NODE_ENV === "development" ? config.baseURL.dev:config.baseURL.pro;
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'

class HttpRequest{
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    //默认配置
    getInsideConfig(){
        return {
            baseURL: this.baseURL,
            header: {}
        };
    }
    interceptors(instance){
        // 添加一个请求拦截器
        instance.interceptors.request.use(async function ( config ) {
            // 在发送请求之前做一些事情
            console.log("拦截处理请求");
            //请求头对象headers，添加token验证的Authorization字段
            config.headers.Authorization = window.sessionStorage.getItem('token')
            return config;
            }, function ( error ) {
            // 做一些有请求错误的事情
            return Promise .reject(error );
        });
        // 添加响应拦截器
        instance.interceptors.response.use( function ( response ) {
            // 对响应数据做一些事情
            console.log("拦截处理响应");
            return response.data;
            }, function ( error ) {
            // 对响应做一些事情错误
            return Promise .reject(error) ;
        });
    }
    request(options){
        //axios实例创建
        const instance = axios.create();
        //覆盖默认配置
        options = {...(this.getInsideConfig()),...options};
        //请求拦截
        this.interceptors(instance);
        return instance(options);
    }
    all(arr){
        return axios.all(arr);
    }
}
export default new HttpRequest(baseURL)