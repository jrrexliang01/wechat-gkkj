import Vue from 'mpvue'
// import TIMApp from './App'
import TIM from 'tim-wx-sdk'
import store from './store/index'
import { openWin, redirectTo, backBeaforWin, Ajax } from './utils/common'
import COS from 'cos-wx-sdk-v5'
import { SDKAPPID } from '../static/utils/GenerateTestUserSig'
import TYPES from './utils/types'
import './css/common.css'
import './css/iconfont.css'

const tim = TIM.create({
  SDKAppID: SDKAPPID
})
wx.$app = tim
wx.$app.registerPlugin({'cos-wx-sdk': COS})
wx.hideTabBar()
let $bus = new Vue()
Vue.prototype.$type = TYPES
Vue.prototype.$store = store
Vue.prototype.$bus = $bus

Vue.config.productionTip = false
App.mpType = 'app'
// 把通用方法挂载到Vue原型上
Vue.prototype.$openWin = openWin
Vue.prototype.$redirectTo = redirectTo
Vue.prototype.$backBeaforWin = backBeaforWin
Vue.prototype.$ajax = Ajax

new Vue({
}).$mount()
