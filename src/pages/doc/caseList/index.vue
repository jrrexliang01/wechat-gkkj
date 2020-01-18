<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);padding-bottom: 50px;" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col" v-if="caseList.length !== 0">
        <dd
          @click.stop="$openWin('/pages/doc/nonLactatingCase/main?own=false&caseId=' + val.id + '&patId=' +val.patient.id)"
          v-for="(val, idx) in caseList"
          :key="idx"
          class="order z-width-100-percent ub-box z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span
              class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.patientName}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">日期:{{val.createTime}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">病例类型:{{caseStatus[val.isLactation]}}</span>
            </div>
        </dd>
      </dl>
      <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
        <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="报告"></i-tab-bar-item>
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </scroll-view>
  </div>
</template>

<script>
  import {getCaseList} from '../../../config'
  import {switchUserTab} from '../../../utils/common'

  export default {
    data () {
      return {
        caseList: {},
        current: 'chat',
        user: {},
        caseStatus: {
          true: '哺乳期',
          false: '非哺乳期'
        }
      }
    },
    async onLoad (options) {
      const {caseList} = await getCaseList(parseInt(options.patId))
      this.caseList = caseList
    },
    async onShow () {
      this.current = 'chat'
    },
    methods: {
      handleChange (detail) {
        switchUserTab(this.current, detail)
      },
      add () {
        wx.navigateTo({url: '/pages/doc/myPatInfo/main?own=true'})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #fff
  }

  .order {
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 8px;
  }

  .order img {
    width: 55px;
    height: 55px;
    border-radius: 3px
  }

  .loginBtn {
    font-size: 18px;
    color: #fff;
    padding: 0px 20px;
    margin-left: 10px;
    margin-right: 10px;
    background: #5CA2F2
  }
</style>
