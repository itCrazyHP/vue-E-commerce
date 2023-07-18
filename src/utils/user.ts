import { cacheEnum } from "@/enum/cacheEnum";
import store from "./localStore";
import { reqUserLogin } from "@/api/reqApi";
import type { LoginData } from "@/api/reqApi";
import router from "@/router";
import userStore from "@/store/userStore"

export async function login(values: LoginData) {
    const res = await reqUserLogin(values)
    if (res.code === 200) {
        const token = res.data.token
        store.set(cacheEnum.TOKEN_NAME, { token }, 100000000)
        const routeName = store.get(cacheEnum.REDIRECT_ROUTE_NAME) ?? 'home'
        router.replace({ name: routeName })
        store.remove(cacheEnum.REDIRECT_ROUTE_NAME)
        return Promise.resolve(res.data)
    }
    return Promise.reject(new Error(res.message))
}

export function isLogin() {
    return Boolean(store.get(cacheEnum.TOKEN_NAME))
}

export function logout() {
    store.remove(cacheEnum.TOKEN_NAME)
    userStore().info = {} as any
}