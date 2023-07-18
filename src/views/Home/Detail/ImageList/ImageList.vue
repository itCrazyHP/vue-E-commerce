<template>
  <div class="swiper-container">
    <swiper
                  :modules="modules"
                	:slides-per-view="3"
                  :slides-per-group="1"
                  :free-mode="true"
                	:navigation="navigation"
                  class="swiper-wrapper"
                >
                    <swiper-slide  class="swiper-slide" v-for="slide,index in props.skuImageList" :key="slide.id">
                      <img :src="slide.imgUrl" :class="{active:currentIndex===index}" @click="changeCurrentIndex(index)">
                    </swiper-slide>
                    <div class="swiper-button-prev"  /> 
                    <!--左箭头。如果放置在swiper外面，需要自定义样式。同时可定义点击事件@click.stop="prevEl"-->
                    <div class="swiper-button-next"  />
                    <!--右箭头。如果放置在swiper外面，需要自定义样式。同时可定义点击事件@click.stop="nextEl"-->
                    <!-- 如果需要滚动条 -->
                    <!-- <div class="swiper-scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/pagination' 
import { Navigation,FreeMode } from 'swiper'
import type {skuImageList} from "@/api/reqApi"
import {getCurrentInstance} from 'vue'
  interface IProps{
    skuImageList:skuImageList[]
  }
  const props = withDefaults(defineProps<IProps>(), {
      skuImageList:[] as any
  })

  const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
  });

  const modules = [  Navigation,FreeMode]
  
  const currentIndex = ref(0)
  const changeCurrentIndex=(index:number)=>{
  currentIndex.value = index
  instance?.proxy?.$Bus.emit('getIndex',index)
  }

  
const instance = getCurrentInstance()
    

</script>

<style scoped lang="scss">
  .swiper-container {
    height: 56px;
    width: 412px;
    padding: 0 12px 0 0;

    .swiper-slide {
      width: 56px;
      height: 56px;
      margin-left: 12px;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>