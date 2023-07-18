import { Random } from 'mockjs'
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/banner',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message:"请求成功",
        status:'success',
        data: [
          {
            "id":"1",
            "imgUrl":"/images/banner1.jpg"
          },
          {
            "id":"2",
            "imgUrl":"/images/banner2.jpg"
          },
          {
            "id":"3",
            "imgUrl":"/images/banner3.jpg"
          },
          {
            "id":"4",
            "imgUrl":"/images/banner4.jpg"
          }
        ]
      }
    },
  }
  
] as MockMethod[]