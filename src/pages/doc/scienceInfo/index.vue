<template>
  <div class="container ub-box ub-col ub-ver">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-ver" style="border-bottom: 1px solid #f5f5f5">
      <p class="z-font-size-24 z-color-000" style="border-bottom: 1px solid #f5f5f5">{{newsInfo.title}}</p>
      <p class="z-font-size-14 z-color-666">发表时间:{{newsInfo.createTime}}</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col" style="margin-top: 1px;">
      <parser :html="newsInfo.content" img-mode="widthFix"></parser>
    </dd>
  </div>
</template>

<script>
  import {getNewsInfo} from '../../../config'

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
      const {newsInfo} = await getNewsInfo(parseInt(options.newsId))
      this.newsInfo = newsInfo
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
