<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col" v-if="reportList.length !== 0">
        <dd @click.stop="$openWin('/pages/patInfo/main?reportId=' + val.id)" v-for="(val, idx) in reportList" :key="idx"
            class="order z-width-100-percent ub-box z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span
              class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.doc.docName}}问诊报告</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">报告时间{{val.reportDate}}</span>
          </div>
        </dd>
      </dl>
      <dl class="z-width-100-percent ub-box ub-col" @click="$openWin('pages/home/main')" v-if="reportList.length === 0">
        <dd class="z-margin-top-100-px ub-box ub-col ub-ver" @click="$openWin('pages/home/main')">
          <p class="ub-ver" @click="$openWin('pages/home/main')" style="font-size: 12px;">暂无相关报告，在线咨询，可以了解自身乳腺健康情况</p>
          <span class="ub-ver" @click="$openWin('pages/home/main')" style="color: #357cfb;">去咨询</span>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
  import {getPatReportList} from '../../config'

  export default {
    data () {
      return {
        reportList: {}
      }
    },
    async onLoad (options) {
      const {reportList} = await getPatReportList(parseInt(options.patId))
      this.reportList = reportList
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
