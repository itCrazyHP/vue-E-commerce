<template>
    <div>
        <HomeHeader/>
        <RouterView></RouterView>
        <HomeFooter v-show="isShow"/>
    </div>
</template>

<script setup lang="ts">

import HomeHeader from '@/layouts/Home/Header/index.vue'
import HomeFooter from '@/layouts/Home/Footer/index.vue'

const route = useRoute()
const router = useRouter()
const isShow = ref<boolean>(true)
watch(route,()=>{
if(route.name === 'login' || route.name === 'register')
isShow.value = false
else
isShow.value = true
},{immediate:true})

</script>

<style scoped>

</style>