<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart,index in home.cartList[0].cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked===1" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeHandler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="number" minnum="1" class="itxt" :value="cart.skuNum" @change="changeHandler('change',Number((<HTMLInputElement>$event.target).value),cart)">
            <a href="javascript:void(0)" class="plus" @click="changeHandler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(String(cart.skuId))">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all" v-if="home.cartList[0].cartInfoList.length">
        <input class="chooseAll" type="checkbox" :checked="AllCheck()" @click="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart" href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice.sum }}</i>
        </div>
        <div class="sumbtn">
          <RouterLink class="sum-btn" :to="{name:'trade'}">结算</RouterLink>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import homeStore from '@/store/homeStore';
import { cartInfo, reqAddOrUpdataShopCart, reqDeleteCartById, reqUpdateCheckedById } from '@/api/reqApi';
import _ from "lodash"
  const home = homeStore()
  await home.getCartList()

  const totalPrice = computed(()=>{
        const need = home.cartList[0].cartInfoList.filter(item=>item.isChecked===1)
        const sum = need.reduce((init,next)=>
          init+(next.skuPrice*next.skuNum)*1
        ,0)||0
        
    return {sum}
    })
  const AllCheck = () =>{
    return home.cartList[0].cartInfoList.every(item=>item.isChecked===1)||false
  }
  const changeHandler = _.throttle(async(type:string,disNum:number,cart:cartInfo)=>{
    switch (type){
      case "add":
        disNum = 1;
        break;
      case 'minus':
        disNum = cart.skuNum >1?-1:0
        break;
      case 'change':
        if(disNum<1){
          disNum = 0
        }else{
          disNum =Math.floor(disNum) - cart.skuNum;
        }
        
        break;
    }
    
    await reqAddOrUpdataShopCart(String(cart.skuId),String(disNum))
    await home.getCartList()
  },500) 

  const deleteCartById = async(skuId:string) =>{
    let result = await reqDeleteCartById(skuId)
    if(result.code !== 200){
      alert('删除失败')
    }
    await home.getCartList()
  }

  const updateChecked = async(cart:cartInfo,event:Event)=>{
    let checked = (<HTMLInputElement>event.target).checked ? "1":"0"
      
    let result = await reqUpdateCheckedById(String(cart.skuId),checked)
    if(result.code !== 200){
      alert('选择失败')
    }
    await home.getCartList()
  }

  const deleteAllCheckedCart = ()=>{
    home.cartList[0].cartInfoList.map(item=>{
      if(item.isChecked===1){
        deleteCartById(String(item.skuId))
        
      }
    })
  }

  const updateAllCartChecked =(event:Event)=>{
    home.cartList[0].cartInfoList.map(item=>{
      updateChecked(item,event)
    })
  }
</script>

<style lang="scss" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>