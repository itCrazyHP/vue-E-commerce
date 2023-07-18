import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { RouteRecordNormalized } from 'vue-router'
import {reqCategoryListApi,CategoryList,reqGetSearchInfoApi,SearchInfo,reqGoodsInfo,goodInfo, reqCartList,cartList} from '@/api/reqApi'
import { mockBannerApi,mockFloorsApi,Banner,Floor } from '@/api/mockApi'
export default defineStore('home',{
    state:()=>{
        return {
          categoryList:[] as CategoryList[],
          banner:[] as Banner[],
          floors:[] as Floor[],
          searchList:{} as SearchInfo,
          goodInfo:{} as goodInfo,
          cartList:[] as unknown as [cartList]
        }
    },
    actions:{
        // async getHomeData(){
        //     const res1 = await mockBannerApi()
        //     if(res1.code === 200)
        //     this.banner = res1.data
            
        //     const res2 = await mockFloorsApi()
        //     if(res2.code === 200)
        //     this.floors = res2.data
        // },
        async getHomeData(){
            this.banner = [
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
            
            this.floors = [
                {
                  id: "001",
                  name: "家用电器",
                  keywords: [
                      "节能补贴",
                      "4K电视",
                      "空气净化器",
                      "IH电饭煲",
                      "滚筒洗衣机",
                      "电热水器"
                  ],
                  imgUrl: "/images/floor-1-1.png",
                  navList: [
                      {
                          url: "#",
                          text: "热门"
                      },
                      {
                          url: "#",
                          text: "大家电"
                      },
                      {
                          url: "#",
                          text: "生活电器"
                      },
                      {
                          url: "#",
                          text: "厨房电器"
                      },
                      {
                          url: "#",
                          text: "应季电器"
                      },
                      {
                          url: "#",
                          text: "空气/净水"
                      },
                      {
                          url: "#",
                          text: "高端电器"
                      }
                  ],
                  carouselList: [
                      {
                          id: "0011",
                          imgUrl: "/images/floor-1-b01.png"
                      },
                      {
                          id: "0012",
                          imgUrl: "/images/floor-1-b02.png"
                      },
                      {
                          id: "0013",
                          imgUrl: "/images/floor-1-b03.png"
                      }
                  ],
                  recommendList: [
                      "/images/floor-1-2.png",
                      "/images/floor-1-3.png",
                      "/images/floor-1-5.png",
                      "/images/floor-1-6.png"
                  ],
                  bigImg: "/images/floor-1-4.png"
              },
              {
                  id: "002",
                  name: "手机通讯",
                  keywords: [
                      "节能补贴2",
                      "4K电视2",
                      "空气净化器2",
                      "IH电饭煲2",
                      "滚筒洗衣机2",
                      "电热水器2"
                  ],
                  imgUrl: "/images/floor-1-1.png",
                  navList: [
                      {
                          url: "#",
                          text: "热门2"
                      },
                      {
                          url: "#",
                          text: "大家电2"
                      },
                      {
                          url: "#",
                          text: "生活电器2"
                      },
                      {
                          url: "#",
                          text: "厨房电器2"
                      },
                      {
                          url: "#",
                          text: "应季电器2"
                      },
                      {
                          url: "#",
                          text: "空气/净水2"
                      },
                      {
                          url: "#",
                          text: "高端电器2"
                      }
                  ],
                  carouselList: [
                      {
                          id: "0011",
                          imgUrl: "/images/floor-1-b01.png"
                      },
                      {
                          id: "0012",
                          imgUrl: "/images/floor-1-b02.png"
                      },
                      {
                          id: "0013",
                          imgUrl: "/images/floor-1-b03.png"
                      }
                  ],
                  recommendList: [
                      "/images/floor-1-2.png",
                      "/images/floor-1-3.png",
                      "/images/floor-1-5.png",
                      "/images/floor-1-6.png"
                  ],
                  bigImg: "/images/floor-1-4.png"
              }
              ]
        },
        async getCategoryList(){
            if(this.categoryList.length===0){
            const res = await reqCategoryListApi()       
            this.categoryList = res.data.splice(0,res.data.length-1)
            }
        },
        async getSearchInfo(data={}){
           const res = await reqGetSearchInfoApi(data) 
           this.searchList = res.data
        },
        async getGoodInfo(skuId:string){
            const res = await reqGoodsInfo(skuId)
            if(res.code === 200){
                this.goodInfo = res.data
            }
        },
        async getCartList(){
            const res = await reqCartList()
            if(res.code === 200){   
                this.cartList = res.data
                
                if(!Boolean(this.cartList.length)){//当购物车没有东西时候防止没用数据导致页面渲染不出（直接赋值给cartInfoList并在页面调用这个也许更简单）
                    const cartInfo:any = {
                        cartInfoList:[]
                    }
                    this.cartList.push(cartInfo)
                }
             }
        }
    }
})

