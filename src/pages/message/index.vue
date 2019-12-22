<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd v-for="(val, idx) in msgList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.title}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.createTime}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.msg}}</span>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getMsgList } from '../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      msgList: {},
      patId: 0,
      orderStatus: 0
    }
  },
  async onLoad (options) {
    console.log(options.patId)
    const {msgList} = await getMsgList(parseInt(options.patId), 2)
    this.msgList = msgList
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
