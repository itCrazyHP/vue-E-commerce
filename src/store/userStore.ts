import { defineStore } from 'pinia'
import {reqGetCode, reqUserRegister,reqUserInfo, TradeInfo, reqTradeInfo, reqOrderList, orderDetailList} from '@/api/reqApi'
import type { userRegister,userInfo,OrderList } from '@/api/reqApi'
import { Address, mockAddressApi } from '@/api/mockApi'
export default defineStore('user',{
    state:()=>{
        return {
          info:{} as userInfo,
          addressInfo:[] as Address[],
          tradeInfo:{} as TradeInfo,
          orderList:{} as OrderList,
        }
    },
    actions:{
        async getCode(phone:string){
            const res = await reqGetCode(phone)
            if(res.code === 200){
                return Promise.resolve(res.data)
            }
            return Promise.reject(new Error('faile'))
        },
        async userRegister(user:userRegister){
            const res = await reqUserRegister(user)
            if(res.code === 200){
                return Promise.resolve(res.data)
            }
            return Promise.reject(new Error(res.message))
        },
        async getUserInfo(){
            const res = await reqUserInfo()

            if(res.code === 200){
                this.info = res.data
                return Promise.resolve(res.data)
            }
        },
        // async getAddressInfo(){
        //     const res = await mockAddressApi()
        //     if(res.code === 200){
        //         this.addressInfo = res.data
        //     }
        // },
        async getAddressInfo(){
            this.addressInfo = [
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
        },
        async getTradeInfo(){
            const res = await reqTradeInfo()
            if(res.code === 200){
                this.tradeInfo = res.data
            }else{
                this.tradeInfo = {} as any
            }
        },
        async getOrderList(page:string,limit:string){
            const res = await reqOrderList(page,limit)
            if(res.code === 200){
                this.orderList = res.data
            }else{
                this.orderList = {} as any
            }
        }
    }
})

