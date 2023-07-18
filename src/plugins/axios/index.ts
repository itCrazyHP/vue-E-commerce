import Axios from './axios'

const http = new Axios({//基本配置对应axios.create
    baseURL:'/api',
    timeout:8000,
    headers:{}
})
const mock = new Axios({//基本配置对应axios.create
    baseURL:'/mock',
    timeout:8000,
    headers:{}
})
export {http,mock}
