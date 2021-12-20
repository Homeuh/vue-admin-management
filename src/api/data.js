import axios from './axios'

export  const getMenu = () => {
    return axios.request({
        url: "/menu",
        method: "get"
    })
}

export const getHome = () => {
    return axios.request({
        baseURL: "/api",
        url: "/main/getData",
        method: "get"
    })
}

// export const getMall = () => {
//
// }