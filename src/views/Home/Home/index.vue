<template>
    <div>
        <HomeTypeNav/>
        <HomeListContainer/>
        <HomeRecommend/>
        <HomeRank/>
        <HomeLike/>
        <HomeFloor/>
        <HomeBrand/>
        
        
        
    </div>
</template>

<script setup lang="ts">
import HomeListContainer from './ListContainer/index.vue'
import HomeRecommend from './Recommend/index.vue'
import HomeRank from './Rank/index.vue'
import HomeLike from './Like/index.vue'
import HomeFloor from './Floor/index.vue'
import HomeBrand from './Brand/index.vue'
import homeStore from '@/store/homeStore';
const home = homeStore();
await home.getHomeData()
</script>

<style scoped>

</style>