<template>
    <swiper
                    :modules="modules"
                	:loop="true"
                	:slides-per-view="1"
                	:space-between="50"
                	:autoplay="{ delay: 4000, disableOnInteraction: false }"
                	:navigation="navigation"
                	:pagination="{ clickable: true }"
	                :scrollbar="{ draggable: false }"
                  	class="swiperBox"
                >
                    <swiper-slide v-for="item in swiperItem" :key="item.id"><img :src=item.imgUrl alt=""></swiper-slide>
                    <div class="swiper-button-prev"  />
                    <!--左箭头。如果放置在swiper外面，需要自定义样式。同时可定义点击事件@click.stop="prevEl"-->
                    <div class="swiper-button-next"  />
                    <!--右箭头。如果放置在swiper外面，需要自定义样式。同时可定义点击事件@click.stop="nextEl"-->
                    <!-- 如果需要滚动条 -->
                    <!-- <div class="swiper-scrollbar"></div> -->
    </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Banner } from '@/api/mockApi'
// 引入swiper样式（按需导入）
import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
// import 'swiper/css/scrollbar'  // 轮播图的滚动条， 轮播图里一般不怎么会使用到滚动条，如果有用到的话import导入就行
// 引入swiper核心和所需模块
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper'

interface props{
    swiperItem:Banner[]
}
const {swiperItem} =withDefaults(defineProps<props>(),{
    swiperItem:[] as any
}) 




const navigation = ref({
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
});
// 在modules加入要使用的模块
const modules = [Autoplay, Pagination, Navigation, Scrollbar]
// const prevEl = (item, index) => {
//    console.log('上一张' + index + item)
// };
// const nextEl = () => {
//    console.log('下一张')
// };
// 更改当前活动swiper
// const onSlideChange = (swiper) => {
// // swiper是当前轮播的对象，里面可以获取到当前swiper的所有信息，当前索引是activeIndex
//   console.log(swiper);
// }
</script>

<style scoped>

</style>