import { ConfigEnv, build, loadEnv } from 'vite'
import path from 'path'
import {parseEnv} from './vite/utils'
import setupPlugins from './vite/plugins/index'
import { visualizer } from "rollup-plugin-visualizer";



export default ({ command, mode }:ConfigEnv) => {
  const isBuild = command ==='build'
  
  const env = parseEnv(loadEnv(mode,'.'))//取出.env文件,并调用转换方法
  
  return {
    plugins: [...setupPlugins(isBuild,env),visualizer()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src'),  '#': path.resolve(__dirname, 'types'),},
    },
    build:{
      rollupOptions:{
        emptyOutDir:true,
        output:{
          manualChunks(id:string){
            if(id.includes('node_modules')){
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    server:{
      proxy:{
        '/api': {
          target: 'http://gmall-h5-api.atguigu.cn/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/mock': {
          target: "/mock",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock/, ''),
        },
      }
    }
  }
}
// //// vite.config.ts 代理配置
// proxy: { // 代理配置
//   '/user': {
//   target: 'https://www.baidu.com',
//   changeOrigin: true,
//   rewrite: (path) => path.replace(/^\/user/, '')
//   },
//   '/cus': {
//   target: 'https://www.taobao.com',
//   changeOrigin: true,
//   rewrite: (path) => path.replace(/^\/cus/, '')
//   }
//   },
 
//  // 代理接口调用 
//  // 1.调用user部分接口
//  export function getUser(data: object) {
//   return request({
//   url: '/user/getUser',
//   method: 'get',
//   baseURL: '/user',
//   data
//   })
//  }
//  // 实际调用地址为
//  https://www.baidu.com/user/getUser // /user通过rewrite正则过滤掉了
 
//  // 2.调用cus部分接口
//  export function getCus(data: object) {
//   return request({
//   url: '/customer/getCus',
//   method: 'get',
//   baseURL: '/cus',
//   data
//   })
//  }
//  // 实际调用地址为
//  https://www.taobao.com/customer/getCus // /cus通过rewrite正则过滤掉了</pre>


