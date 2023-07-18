import { cacheEnum } from "@/enum/cacheEnum"
import { v4 as uuidv4 } from 'uuid';

export interface IData {
    data:any
    expire?:number,
}

export default {
    set(key:string,data:any,expire?:number):void{
        let cache:IData = {data}
        if(expire){
            cache.expire = new Date().getTime() + expire*1000
        }
        localStorage.setItem(key,JSON.stringify(cache))
    },
    setUUID():void{
        let uuid_token = localStorage.getItem(cacheEnum.UUID_TOKEN)
        if(!uuid_token){
            uuid_token = uuidv4() as string;
            localStorage.setItem(cacheEnum.UUID_TOKEN,JSON.stringify(uuid_token))
        } 
    },
    getUUID():string|null{
        if(localStorage.getItem(cacheEnum.UUID_TOKEN)){
           return localStorage.getItem(cacheEnum.UUID_TOKEN)
        }
        return null
    },
    get(key:string):any{
        const cacheStore = localStorage.getItem(key)
        if(cacheStore){
            const cache =JSON.parse(cacheStore)
            const expire = cache?.expire
            if(expire && expire<new Date().getTime()){
                localStorage.removeItem(key)
                return null
            }
            return cache.data
        }
        return null
    },
    remove(key:string){
        localStorage.removeItem(key)
    }
}