<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-ver z-border-bottom-1-5f5f5">
        <p class="z-font-size-24 z-color-000 z-border-bottom-1-5f5f5">{{newsInfo.title}}</p>
        <p class="z-font-size-14 z-color-666">发表时间:{{newsInfo.createTime}}</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col z-margin-top-1-px">
        <parser :html="newsInfo.content" img-mode="widthFix" lazy-load></parser>
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
        content: '',
        createTime: ''
      }
    }
  },
  async onLoad (options) {
    this.resetData()
    const { newsInfo } = await getNewsInfo(parseInt(options.newsId))
    this.newsInfo = newsInfo
  },
  onUnload () {
    this.resetData()
  },
  methods: {
    resetData () {
      this.newsInfo.title = ''
      this.newsInfo.content = ''
      this.newsInfo.createTime = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
</style>
