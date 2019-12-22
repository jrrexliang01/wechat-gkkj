<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <img :src="imgSrc" class="z-width-100-percent" mode="widthFix"/>
      <dl class="z-width-100-percent ub-box ub-col" style="margin-bottom: 50px;">
        <dd @click.stop="toNewsInfo(item.id)" v-for="(item,index ) in newList" :key="item.id" @click="toNewsInfo(item.id)" class="order z-width-100-percent z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col z-padding-bottom-10-px">
            <span class="z-font-size-17 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{item.title}}</span>
          </div>
          <img class="z-img-contain" :src="newSrc" />
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col z-margin-top-6-px">
<!--            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px" style="text-align: right;padding-right: 5px;">{{item.createTime}}</span>-->
<!--            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{item.content | ellipsis}}</span>-->
          </div>
        </dd>
      </dl>

      <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
        <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="消息"></i-tab-bar-item>
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </scroll-view>
  </div>
</template>

<script>
import { getNewList } from '../../config'
export default {
  data () {
    return {
      newList: {},
      imgSrc: '',
      newSrc: '',
      current: 'science'
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value
      }
      return value
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
    toNewsInfo (id) {
      wx.navigateTo({
        url: '/pages/scienceInfo/main?newsId=' + id
      })
    }
  },
  async onShow () {
    this.current = 'science'
  },
  async mounted () {
    // 调用应用实例的方法获取全局数据
    const { newList } = await getNewList()
    wx.setStorageSync('newList', newList)
    this.newList = wx.getStorageSync('newList')
    let banner = wx.getStorageSync('enclosureList')
    this.imgUrls = []
    for (let i = 0; i < banner.data.length; i++) {
      if (banner.data[i].enclosureName === 'new_banner') {
        this.imgSrc = banner.data[i].enclosurePath
      }
      if (banner.data[i].enclosureName === 'new_default') {
        this.newSrc = banner.data[i].enclosurePath
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 99%; height: 120px; border-radius: 3px}
</style>
