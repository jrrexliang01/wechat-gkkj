<template>
  <div class="container ub-box ub-col">
    <dl class="ub-box ub-ver z-padding-v-10-px" style="background:#fff;">
      <dd @click.stop="$openWin('/pages/citySelect/main')" class="z-padding-h-10-px ub-box ub-ver">
        <span class="z-font-size-14 z-color-666 z-margin-right-3-px">{{curCity}}</span>
        <i class="iconfont icon-xiangxiazhankai z-color-666 z-font-size-16"></i>
      </dd>
      <dd class="ub-flex-1 ub-box ub-ver">
        <div @click.stop="$openWin('/pages/search/main')" class="search ub-box ub-ver-v z-width-90-percent z-box-sizing-border">
          <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>
          <span class="z-font-size-14 z-color-999 z-margin-left-8-px">请输入疾病、医生名称...</span>
        </div>
      </dd>
    </dl>
    <scroll-view scroll-y style="height: calc(100vh - 50px);" scroll-top="0">
      <!--图标九宫格入口-->
      <dl class="ub-box ub-wrap z-padding-v-5-px" style="background:#fff">
        <div class="icon-item ub-box ub-col ub-ver" :key="key" v-for="(idx, key) in iconMap">
          <dd @click.stop="$openWin('/pages/search/main')" class="icon ub-box ub-ver iconfont" :class="key" :style="{background: iconMap[key]['bk']}"></dd>
          <span class="z-padding-v-8-px z-font-size-12 z-color-333">{{iconMap[key]['title']}}</span>
        </div>
      </dl>
      <!--专家列表-->
      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">
        <p class="z-width-100-percent ub-box ub-ver" style="border-bottom:1px solid #eee">
          <span class="z-font-size-12 z-color-888 z-lineHeight-36">—专家列表—</span>
        </p>
        <dd class="ub-box ub-col" style="padding-bottom: 40px;">
          <div class="ub-end" v-for="(val, idx) in docList" :key="val.id" :isLast="idx===6">
            <div @click.stop="gotoDetail(val.id)" class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
                <p class="ub-flex-1 ub-box ub-ver ub-between">
                  <span class="z-width-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.docName}}</span>
                  <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">{{val.title}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-12 z-color-666 z-lineHeight-20">{{val.department}}</span>
                  <span class="z-font-size-12 z-color-888">{{val.hospitals.hospitalName}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-16" style="color:#06c1ae">{{val.price}}元</span>
                </p>
              </div>
            </div>
          </div>
        </dd>
      </dl>
    </scroll-view>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="消息"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
  import good from '../../components/good.vue'
  import { getDocList } from '../../config'
  import { mapState } from 'vuex'
  import { genTestUserSig } from '../../../static/utils/GenerateTestUserSig'
  export default {
    props: ['curGood', 'isLast'],
    components: {good},
    computed: {
      ...mapState({
        isSdkReady: state => {
          return state.global.isSdkReady
        }
      }),
      curCity () {
        return this.$store.state.curCity
      }
    },
    data () {
      return {
        iconMap: {
          'icon-shoucang': {title: '医生', bk: '#5CA2F2'},
          'icon-jiesuan': {title: '疾病', bk: '#E4463B'},
          'icon-zitigui': {title: '新闻', bk: '#8B67E5'}
        },
        current: 'homepage',
        docList: {}
      }
    },
    methods: {
      handleChange (detail) {
        this.current = detail.mp.detail.key
        if (detail.mp.detail.key.toString() === 'homepage') {
          wx.redirectTo({
            url: '../home/main'
          })
        } else if (detail.mp.detail.key.toString() === 'science') {
          wx.redirectTo({
            url: '../science/main'
          })
        } else if (detail.mp.detail.key.toString() === 'mine') {
          wx.redirectTo({
            url: '../own/main'
          })
        } else if (detail.mp.detail.key.toString() === 'chat') {
          wx.redirectTo({
            url: '../index/main'
          })
        }
      },
      toCitySelect () {
        wx.switchTab({
          url: '../citySelect/main'
        })
      },
      gotoDetail (id) {
        wx.navigateTo({url: '/pages/docInfo/main?docId=' + id})
      }
    },
    async onLoad () {
      // 调用应用实例的方法获取全局数据
      const { docList } = await getDocList()
      wx.setStorageSync('docList', docList)
      console.log(wx.getStorageSync('userInfo'))
      if (wx.getStorageSync('userInfo') === '') {
      } else {
        let options = genTestUserSig(wx.getStorageSync('userInfo').openId)
        options.runLoopNetType = 0
        if (options) {
          wx.$app.login({
            userID: wx.getStorageSync('userInfo').openId,
            userSig: options.userSig,
            hasUserInfo: true
          }).then(() => {
          })
        }
      }
    },
    onShow () {
      this.current = 'homepage'
    },
    async mounted () {
      // 调用应用实例的方法获取全局数据
      const { docList } = await getDocList()
      wx.setStorageSync('docList', docList)
      this.docList = wx.getStorageSync('docList')
    },
    onPullDownRefresh () {
      setTimeout(() => {
        this.docList = wx.getStorageSync('docList')
        wx.stopPullDownRefresh()
      }, 600)
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8;}
  .search{background: #f5f5f5;border-radius: 12px;padding: 5px 10px}
  .swiper{height: 120px;width: calc(100% - 16px)}
  .icon-item{width:33.33%;padding: 10px 13px 0 13px;box-sizing: border-box;}
  .icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
  .adv{border-right: 2px solid #eee}
  .adv img{width: 50px;height: 50px}
  .good{border-bottom: 1px solid #DDD8CE}
  .good img{width: 80px;height: 80px}
  .card img{width: 80px;height: 80px}
</style>
