import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/address',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message:"请求成功",
        status:'success',
        data: [
          {
            name:"黄鹏",
            address:"深圳市宝安区",
            tel:'18033444871',
            isDefault:1
          },
          {
            name:"黄鹏",
            address:"山东省烟台市",
            tel:'17753545715',
            isDefault:0
          },
          {
            name:"后盾人",
            address:"山东工商学院",
            tel:'1963426456',
            isDefault:0
          },
          
        ]
      }
    },
  }
  
] as MockMethod[]