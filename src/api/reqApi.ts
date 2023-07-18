import { http } from "@/plugins/axios";

export interface CategoryList {
    categoryChild?: CategoryList[]
    categoryName: string
    categoryId: number
}

function reqCategoryListApi() {
    return http.request<CategoryList[]>({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}




interface attrs {
    attrId: 106
    attrName: "手机系统"
    attrValueList: string[]
}
interface trademark {
    tmId: number
    tmName: string
}
interface good {
    attrs?: string
    category1Id?: string
    category1Name?: string
    category2Id?: string
    category2Name?: string
    category3Id?: string
    category3Name?: string
    createTime?: string
    defaultImg: string
    hotScore: number
    id: number
    price: number
    title: string
    tmId?: number
    tmName?: string
}
export interface SearchInfo {
    attrsList: attrs[]
    goodsList: good[]
    pageNo: number
    pageSize: number
    total: number
    totalPages: number
    trademarkList: trademark[]

}
function reqGetSearchInfoApi(data: any) {
    return http.request<SearchInfo>({
        url: '/list',
        method: 'post',
        data
    })
}


interface categoryView {
    id: number,
    category1Id: number,
    category1Name: string,
    category2Id: number,
    category2Name: string,
    category3Id: number,
    category3Name: string
}
export interface skuImageList {
    id: number
    imgName: string
    imgUrl: string
    isDefault: string
    skuId: number
    spuImgId: number
}
export interface skuInfo {
    category3Id: number
    createTime: string
    id: number
    isSale: number
    price: number
    skuAttrValueList: [{
        id: number,
        attrId: number,
        valueId: number,
        skuId: number,
        attrName: string,
        valueName: string
    }]
    skuDefaultImg: string
    skuDesc: string
    skuImageList: skuImageList[]
    skuName: string
    skuSaleAttrValueList: [{
        id: number
        saleAttrId: number
        saleAttrName: string
        saleAttrValueId: number
        saleAttrValueName: string
        skuId: number
        spuId: number
    }]
    spuId: number
    tmId: number
    weight: string
}
interface spuSaleAttrValueList {
    baseSaleAttrId: number
    id: number
    isChecked: string
    saleAttrName: string
    saleAttrValueName: string
    spuId: number
}
interface spuSaleAttrList {
    baseSaleAttrId: number
    id: number
    saleAttrName: string
    spuId: number
    spuSaleAttrValueList: spuSaleAttrValueList[]
}
export interface goodInfo {
    categoryView: categoryView,
    price: number,
    skuInfo: skuInfo,
    valuesSkuJson: string,
    spuSaleAttrList: spuSaleAttrList[]
}
function reqGoodsInfo(skuId: string) {
    return http.request<goodInfo>({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

function reqAddOrUpdataShopCart(skuId: string, skuNum: string) {
    return http.request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}
export interface cartInfo {
    cartPrice: number
    couponInfoList: [] | null
    createTime: string
    id: number
    imgUrl: string
    isChecked: number
    isOrdered: number
    operateTime: string
    orderTime: string | null
    skuId: number
    skuName: string
    skuNum: number
    skuPrice: number
    sourceId: number
    sourceType: string
    userId: string
}
export interface cartList {
    activityRuleList: [] | null
    cartInfoList: cartInfo[]
    createTime: string
}
function reqCartList() {
    return http.request<[cartList]>({
        url: "/cart/cartList",
        method: 'get',
    })
}

function reqDeleteCartById(skuId: string) {
    return http.request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    })
}

function reqUpdateCheckedById(skuId: string, isChecked: string) {

    return http.request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get',
    })
}

function reqGetCode(phone: string) {

    return http.request({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}
export interface userRegister {
    phone: string,
    code: string,
    password: string,
    password1: string,
}
function reqUserRegister(data: userRegister) {
    return http.request({
        url: `/user/passport/register`,
        method: 'post',
        data
    })
}
export interface LoginData {
    phone: string,
    password: string,
}
interface token {
    name: string
    nickName: string
    token: string
    userId: number

}
function reqUserLogin(data: LoginData) {
    return http.request<token>({
        url: `/user/passport/login`,
        method: 'post',
        data
    })
}

export interface userInfo {
    birthday: string | null
    createTime: string
    email: string | null
    gender: string
    headImg: string
    id: number
    loginName: string
    name: string
    nickName: string
    openId: string | null
    operateTime: string
    passwd: string
    phoneNum: string
    status: number
    userLevel: string
    permissions?:string[]
}
function reqUserInfo() {
    return http.request<userInfo>({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get',
    })
}

interface detailArrayList {
    imgUrl: string
    orderPrice: number
    skuId: number
    skuName: string
    skuNum: number
}
export interface TradeInfo {
    totalAmount: number
    totalNum: number
    tradeNo: string
    detailArrayList: detailArrayList[]
}
function reqTradeInfo() {
    return http.request<TradeInfo>({
        url: `/order/auth/trade`,
        method: 'get',
    })
}

function reqSubmitOrder(tradeNo: string, data: any) {
    return http.request<number>({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}

interface payInfo {
    codeUrl: string
    orderId: number
    totalFee: number
    resultCode: string
}
function reqPayInfo(orderId: number) {
    return http.request<payInfo>({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',
    })
}

function reqPayStatus(orderId: number) {
    return http.request({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}

export interface orderDetailList extends detailArrayList {
    createTime: string
    id: number
    orderId: number
    sourceId: number
    sourceType: string
    splitTotalAmount: number
}
export interface OrderRecords {
    consignee: string
    createTime: string
    deliveryAddress: string
    expireTime: string
    id: number
    orderComment: string
    orderDetailList: orderDetailList[]
    orderStatus: string
    orderStatusName: string
    outTradeNo: string
    paymentWay: string
    processStatus: string
    totalAmount: number
    tradeBody: string
    userId: number
}
export interface OrderList {
    current: number
    pages: number
    records: OrderRecords[]
    searchCount: boolean
    size: number
    total: number
}
function reqOrderList(page: string, limit: string) {
    return http.request<OrderList>({
        url: `/order/auth/${page}/${limit}`,
        method: 'get',
    })
}
export { reqOrderList, reqPayStatus, reqPayInfo, reqSubmitOrder, reqTradeInfo, reqUserInfo, reqUserLogin, reqCategoryListApi, reqGetSearchInfoApi, reqGoodsInfo, reqAddOrUpdataShopCart, reqCartList, reqDeleteCartById, reqUpdateCheckedById, reqGetCode, reqUserRegister };