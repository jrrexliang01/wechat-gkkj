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
          <span class="z-font-size-14 z-color-999 z-margin-left-8-px">请输入疾病、医生</span>
        </div>
      </dd>
    </dl>
    <scroll-view scroll-y style="height: calc(100vh - 50px);" scroll-top="0">
      <div class="ub-box ub-ver z-bg-color-fff">
        <swiper class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="500">
          <block v-for="(item, idx) in imgUrls" :key="idx">
            <swiper-item @click="gotoNew(item.id)">
              <image :src="item.src" class="z-width-100-percent" mode="widthFix" style="height: 150px;"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
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
                  <span
                    class="z-width-60-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.docName}}</span>
                  <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">{{val.title}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-12 z-color-666 z-lineHeight-20">{{val.department}}</span>
                  <span class="z-font-size-12 z-color-888">{{val.hospitals.hospitalName}}</span>
                </p>
              </div>
            </div>
          </div>
        </dd>
      </dl>
    </scroll-view>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="病例"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
  import QQMapWX from 'qqmap-wx-jssdk'
  import {switchUserTab} from '../../utils/common'
  import {getDocList, getNewList} from '../../config'
  export default {
    props: ['isLast'],
    computed: {
      curCity () {
        return this.$store.state.curCity
      }
    },
    data () {
      return {
        imgUrls: [],
        current: 'homepage',
        docList: {},
        enclosureList: []
      }
    },
    methods: {
      handleChange (detail) {
        switchUserTab(this.current, detail)
      },
      gotoDetail (id) {
        wx.navigateTo({url: '/pages/docInfo/main?docId=' + id})
      },
      gotoNew (id) {
        if (id !== 0) {
          wx.navigateTo({
            url: '/pages/scienceInfo/main?newsId=' + id
          })
        }
      }
    },
    onLoad () {
      this.userInfo = wx.getStorageSync('userInfo')
      if (this.userInfo.examineStatus === '不通过') {
        wx.showModal({
          title: '提示',
          content: this.userInfo.examineMsg,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      const qqmapsdk = new QQMapWX({
        key: 'S5FBZ-ZBMW5-JZ4IQ-Q2JKE-WDNSF-NPBW6'
      })
      // 实例化API核心类
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success (res) {
              wx.setStorageSync('location', res.result.address_component)
              wx.setStorageSync('locationCity', res.result.address_component.city)
            }
          })
        }
      })
    },
    async onShow () {
      this.current = 'homepage'
      let location = wx.getStorageSync('location')
      const {docList} = await getDocList(location.province)
      if (docList.length === 0) {
        const {docList} = await getDocList('北京')
        this.docList = docList
      } else {
        this.docList = docList
      }
    },
    async mounted () {
      let banner = wx.getStorageSync('enclosureList')
      this.imgUrls = []
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'banner' && banner.data[i].delFlag === false) {
          this.imgUrls.push({
            id: 0,
            src: banner.data[i].enclosurePath
          })
        }
      }
      const {newList} = await getNewList()
      console.log(newList)
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].isBanner) {
          if (newList[i].banner !== null) {
            this.imgUrls.push({
              id: newList[i].id,
              src: newList[i].banner
            })
          }
        }
      }
    },
    onPullDownRefresh () {
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 600)
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8;}
  .search{background: #f5f5f5;border-radius: 12px;padding: 5px 10px}
  .swiper{height: 190px;width: calc(100% - 16px)}
  .icon-item{width:33.33%;padding: 10px 13px 0 13px;box-sizing: border-box;}
  .icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
  .adv{border-right: 2px solid #eee}
  .adv img{width: 50px;height: 50px}
  .good{border-bottom: 1px solid #DDD8CE}
  .good img{width: 80px;height: 80px}
  .card img{width: 80px;height: 80px}
</style>
