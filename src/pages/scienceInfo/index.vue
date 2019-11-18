<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-ver" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-24 z-color-000" style="border-bottom: 1px solid #f5f5f5">{{newsInfo.title}}</p>
        <p class="z-font-size-14 z-color-666">发表时间:{{newsInfo.createTime}}</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col">
        <ul class="ub-box ub-col">
          <div class="z-font-size-14 z-color-333 z-box-sizing-border z-lineHeight-24">{{newsInfo.content}}</div>
        </ul>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
import { getNewsInfo } from '../../config'
export default {
  data () {
    return {
      newsId: 0,
      newsInfo: {
        title: '',
        content: ''
      }
    }
  },
  async onLoad (options) {
    this.newsId = parseInt(options.newsId)
    const { newsInfo } = await getNewsInfo(this.newsId)
    wx.setStorageSync('newsInfo', newsInfo)
  },
  methods: {
  },
  mounted () {
    this.newsInfo = wx.getStorageSync('newsInfo')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
  .buyBtn{background: #f90;padding: 8px 12px;border-radius:3px}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
</style>
