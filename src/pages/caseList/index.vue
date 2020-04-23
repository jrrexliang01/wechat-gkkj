<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px"
          style="margin-bottom: 0px;">
        <button class="loginBtn" lang="zh_CN" @click="add" style="display:flex;box-sizing:border-box;position:fixed;justify-content:space-around;align-items:center;-webkit-box-align:center;width:90%;top:calc(100vh - 150px)">添加</button>
      </dd>
      <dl class="z-width-100-percent ub-box ub-col" v-if="caseList.length !== 0" style="margin-bottom: 150px;">
        <dd @click.stop="$openWin('/pages/myInfo/main?own=false&caseId=' + val.id)" v-for="(val, idx) in caseList"
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
      <dl class="z-width-100-percent ub-box ub-col"  v-if="caseList.length === 0" style="align-items:center;-webkit-box-align:center;">
        暂无病例信息
      </dl>
      <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
        <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="病例"></i-tab-bar-item>
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </scroll-view>

  </div>
</template>

<script>
  import {getCaseList} from '../../config'
  import {switchUserTab} from '../../utils/common'

  export default {
    data () {
      return {
        caseList: {},
        current: 'chat',
        user: {},
        caseStatus: {
          true: '哺乳期',
          false: '非哺乳期'
        },
        allHeight: '100px'
      }
    },
    async onShow () {
      this.current = 'chat'
      this.user = wx.getStorageSync('userInfo')
      const {caseList} = await getCaseList(parseInt(this.user.id))
      this.caseList = caseList
      wx.getSystemInfo({
        success: function (res, rect) {
          this.setData({
            allHeight: res.windowHeight
          })
        }
      })
    },
    methods: {
      handleChange (detail) {
        switchUserTab(this.current, detail)
      },
      add () {
        if (this.user.id === undefined) {
          wx.showToast({
            title: '请登录后重试',
            icon: 'info',
            duration: 2000
          })
        } else {
          if (this.user.examineStatus === '2') {
            wx.showToast({
              title: '您已提交医生注册信息，请等待后台审核！',
              icon: 'none',
              duration: 2000
            })
          } else if (this.user.examineStatus === '不通过') {
            wx.showToast({
              title: '您提交的审核未通过，请重新提交！',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.navigateTo({url: '/pages/myInfo/main?own=true'})
          }
        }
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
