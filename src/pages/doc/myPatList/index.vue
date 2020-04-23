<template>
  <div class="container ub-box ub-col">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd class="ub-box ub-col" style="padding-bottom: 40px;" v-if="patList.length !== 0">
          <div @click.stop="$openWin('/pages/doc/caseList/main?patId=' + val.id)" class="ub-end"
               v-for="(val, idx) in patList" :key="idx" :isLast="idx===6" style="border-bottom: 1px solid #f5f5f5">
            <div class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
                <p class="ub-flex-1 ub-box ub-ver ub-between">
                <span
                  class="z-width-60-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.patientName}}</span>
                  <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">年龄:{{val.age}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-12 z-color-666 z-lineHeight-20">联系电话:{{val.phone}}</span>
                  <span class="z-font-size-12 z-color-888"></span>
                </p>
              </div>
            </div>
          </div>
        </dd>
      </dl>
      <dl class="z-width-100-percent ub-box ub-col"  v-if="patList.length === 0" style="margin-top: 50px;align-items:center;-webkit-box-align:center;">
        暂无患者
      </dl>
    </scroll-view>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="报告"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
  import { getMyPat } from '../../../config'
  import {switchDocTab} from '../../../utils/common'
  export default {
    data () {
      return {
        patList: [],
        user: {},
        current: 'chat'
      }
    },
    methods: {
      handleChange (detail) {
        switchDocTab(this.current, detail)
      }
    },
    async onLoad () {
      this.user = wx.getStorageSync('userInfo')
      const {myPatInfo} = await getMyPat(parseInt(this.user.id))
      this.patList = myPatInfo
      console.log(this.patList)
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #ffffff;
  }

  .search {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 5px 10px
  }
  .swiper{height: 120px;width: calc(100% - 16px)}
  .icon-item{width:33.33%;padding: 10px 13px 0 13px;box-sizing: border-box;}
  .icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
  .adv{border-right: 2px solid #eee}
  .adv img{width: 50px;height: 50px}
  .good{border-bottom: 1px solid #DDD8CE}
  .good img{width: 80px;height: 80px}
  .card img{width: 80px;height: 80px}
</style>

