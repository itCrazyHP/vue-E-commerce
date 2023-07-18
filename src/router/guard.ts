import {RouteLocationNormalized, Router} from 'vue-router'
import util from '@/utils'
import userStore from '@/store/userStore'
import { cacheEnum } from '@/enum/cacheEnum'
import store from '@/utils/localStore'


class Guard{
    constructor(private router:Router){
        
    }
    public run(){ 
        this.router.beforeEach(this.beforeEach.bind(this))//this绑定为Guard，否则undefined
    }

    private beforeEach(to:RouteLocationNormalized,from:RouteLocationNormalized){
        if(from.name === 'login'){
            const user= userStore()
            user.getUserInfo()
        }
        
        if(to.meta.auth && !this.token()) {
            store.set(cacheEnum.REDIRECT_ROUTE_NAME,to.name)
            return {name:'login'}
        }

        if(to.meta.guest && this.token()) return from //有token表示已登陆不再返回登陆页面       
    }

    private token(){
        return store.get(cacheEnum.TOKEN_NAME)
    }
    private uuid():string | null{
        return util.localStore.get(cacheEnum.UUID_TOKEN)
    }

}
export default(router:Router)=>{
    new Guard(router).run()
}