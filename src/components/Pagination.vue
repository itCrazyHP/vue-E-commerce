<template>
    <div class="pagination">

        <button v-if="props.pageNo!==1" @click="getPageNo(props.pageNo-1)">上一页</button>
        <template v-if="startAndEnd.start>1">
            <button @click="getPageNo(1)">1</button>
            <button v-if="startAndEnd.start>2">···</button>
        </template>

        <template v-for="page,index in startAndEnd.end">
            <button @click="getPageNo(page)" :class="{active:page===props.pageNo}"  v-if="page>=startAndEnd.start">{{ page }}</button>
        </template>
        
        <template v-if="startAndEnd.end<props.totalPages">
            <button v-if="startAndEnd.end<props.totalPages-1">···</button>
            <button @click="getPageNo(props.totalPages)">{{props.totalPages}}</button>
        </template>
        <button v-if="pageNo!==props.totalPages" @click="getPageNo(props.pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ props.total }} 条</button>
        
    </div>
</template>

<script setup lang="ts">
    interface IProps {
    pageNo:number,
    pageSize:number,
    total:number,
    continues:number,
    totalPages:number
    }
    const props = withDefaults(defineProps<IProps>(), {
    pageNo:1,
    pageSize:3,
    total:91, 
    continues:5,
    totalPages:31
    })
    
    
    const startAndEnd = computed(()=>{
        let start = 0
        let end = 0
        if(props.continues>props.totalPages){
        start = 1
        end =  props.totalPages
    }else{
        start = props.pageNo - Math.floor(props.continues/2)
        end = props.pageNo + Math.floor(props.continues/2)
        if(start<1){
            start=1
            end = props.continues
        }
        if(end>props.totalPages){
            end = props.totalPages
            start = props.totalPages - props.continues +1
        }
    }
    return {start,end}
    })

    
   
    
   const emit = defineEmits(['getPageNo'])
    const getPageNo = (pageNo:number) =>{
    emit('getPageNo', pageNo)
    }


</script>

<style scoped lang="scss">
.pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>