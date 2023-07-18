import 'vue-router'
import { IMenu } from './menu'
import { RouteParams } from 'vue-router'
declare module 'vue-router'{
    interface RouteMeta{
        auth?:boolean,
        guest?:boolean,
        menu?:IMenu
        permission?:string
    }
}
