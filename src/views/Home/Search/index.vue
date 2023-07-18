<template>
    <div>
      
        <HomeTypeNav/>
        <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="data.categoryName">{{ data.categoryName }}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="data.keyword">{{ data.keyword }}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="data.trademark">{{ data.trademark.split(':')[1] }}<i @click="removeTradeMark">×</i></li>
            <li class="with-x" v-for="attr,index in data.props">{{ attr.split(":")[1] }}<i @click="removeAttrInfo(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a  class=" items-center">综合<svg-arrow-down v-if="isOne&&isUp" theme="outline" size="16" fill="#333"/><svg-arrow-up v-if="isOne&&isDown" theme="outline" size="16" fill="#333"/></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a >价格<svg-arrow-down v-if="isTwo&&isUp" theme="outline" size="16" fill="#333"/><svg-arrow-up v-if="isTwo&&isDown" theme="outline" size="16" fill="#333"/></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in home.searchList.goodsList||[]" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img :src=good.defaultImg /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em class=" mr-2">¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="home.searchList.pageNo" :pageSize="home.searchList.pageSize" :total="home.searchList.total" :continues="5" @getPageNo="getPageNo" :totalPages="home.searchList.totalPages"/>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router"
import SearchSelector from "./SearchSelector/SearchSelector.vue"
import homeStore from '@/store/homeStore'

import {getCurrentInstance} from 'vue'
import { ExtractPropTypes } from "vue"

// 初始化
const instance = getCurrentInstance()

const props = defineProps({
  keyword:String
})

let data:any = {}
let trademark = ref<any>('')

const route= useRoute()

const home = homeStore()


watch(route,()=>{
  if(route.params.keyword === ''){
    //route.query在后边会被调用赋值，所以不需要展开data
    data = {...route.query}
  }else{
    data = {...data,...route.params,...route.query,}
  }

  if(!data.order){
    data.order = "1:desc"
  }

  
home.getSearchInfo(data)
},{immediate:true})


let isOne = ref(data.order.indexOf('1')!=-1)
let isTwo = ref(data.order.indexOf('2')!=-1)
let isDown = ref(data.order.indexOf('desc')!=-1)
let isUp = ref(data.order.indexOf('asc')!=-1)


const removeCategoryName = () =>{
  if(route.params){
    router.push({name:'search',params:route.params})
  }else{
    router.push({name:'search'})
  }
  data.categoryName = undefined

}

const removeKeyword = () =>{
  if(route.query){
    router.push({name:'search',query:route.query})
  }else{
    router.push({name:'search'})
  }
  instance?.proxy?.$Bus.emit('clearInput')
  
  delete data.keyword

}

const trademarkInfo = (trademarkInfo:any) =>{
  delete data.pageNo
  data = {
    ...data,
    trademark:`${trademarkInfo.tmId}:${trademarkInfo.tmName}`
  }
  const query ={...route.query,...data}
  
   router.push({name:'search',params:route.params,query:query})
}

const removeTradeMark = ()=>{
  const query = {...route.query}
  delete query.trademark
  trademark = undefined
  
  router.push({name:'search',params:route.params,query:query})
}

const attrInfo = (attr:any,attrValue:string)=>{
  if(!data.props){
    data.props=[]
  }
  let attrItem = `${attr.attrId}:${attrValue}:${attr.attrName}`
  if(data.props.every((item:string)=>item!==attrItem)){
    data.props.push(attrItem)
  }
  home.getSearchInfo(data)
}
const removeAttrInfo = (index:number)=>{
  data.props.splice(index,1)
  home.getSearchInfo(data)
}
const changeOrder = (flag:string)=>{
  if(flag === data.order.split(":")[0]){
    data.order = data.order.split(":")[1]==='desc'?`${flag}:asc`:`${flag}:desc`
  }else{
    data.order = `${flag}:desc`
  }
    isOne.value = data.order.indexOf('1')!==-1
    isTwo.value = data.order.indexOf('2')!==-1
    isDown.value = data.order.indexOf('desc')!==-1
    isUp.value = data.order.indexOf('asc')!==-1
  home.getSearchInfo(data)
}
const getPageNo = (pageNo:number)=>{
  data.pageNo=pageNo
  home.getSearchInfo(data)
}
</script>

<style scoped lang="scss">
.main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: flex;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    display: flex;
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        
      }
    }
  }
</style>