import { mock } from "@/plugins/axios";

export interface Banner{
    id:string,
    imgUrl:string
}
//a a
// <CategoryList[]>放http.request后边
function mockBannerApi() {
    return mock.request<Banner[]>({
        url: '/banner',
        method:'get',
    })
}
interface navList{
    url:string,
    text:string
}
export interface Floor extends Banner{
    name:string,
    keywords:string[],
    navList:navList[],
    carouselList:Banner[],
    recommendList:string[],
    bigImg:string
}
function mockFloorsApi() {
    return mock.request<Floor[]>({
        url: '/floors',
        method:'get',
    })
}

export interface Address{
    name:string
    address:string
    tel:string
    isDefault:number
}
function mockAddressApi(){
    return mock.request<Address[]>({
        url: '/address',
        method:'get',
    })
}

export {mockBannerApi,mockFloorsApi,mockAddressApi}