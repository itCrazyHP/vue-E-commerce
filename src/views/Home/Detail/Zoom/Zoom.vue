<template>
  <div class="spec-preview">
    <img :src="props.skuImageList[imgIndex].imgUrl" />
    <div class="event" @mousemove="handler($event)"></div>
    <div class="big" >
      <img ref="big" :src="props.skuImageList[imgIndex].imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script lang="ts" setup>
import type {skuImageList} from "@/api/reqApi"
import {getCurrentInstance} from 'vue'
  interface IProps{
    skuImageList:skuImageList[]
  }
  const props = withDefaults(defineProps<IProps>(), {
      skuImageList:[] as any
  })
  
  const imgIndex = ref(0)

  const instance = getCurrentInstance()
  instance?.proxy?.$Bus.on('getIndex',(index) =>{
    imgIndex.value = index as number
  })

  // 放大镜
  const handler = (event:MouseEvent) =>{
    let mask = instance?.refs.mask as HTMLDivElement
    let big = instance?.refs.big as HTMLImageElement
    
    let left = event.offsetX - mask.offsetWidth/2
    let top = event.offsetY - mask.offsetHeight/2
    
    if(left<=0) left=0
    if(left>=mask.offsetWidth) left=mask.offsetWidth
    if(top<=0) top=0
    if(top>=mask.offsetHeight) top=mask.offsetHeight

    mask.style.left = left+'px'
    mask.style.top = top+'px'
    big.style.left = -2*left + 'px'
    big.style.top = -2*top+'px'
    
  }

    
</script>

<style scoped lang="scss">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>