import Mock from 'mockjs'
import home from './mockServerData/home'

//当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
Mock.mock('/api/main/getData',home.getStaticData)