<template>
  <div class="container ub-box ub-col">
    <dl class="ub-box z-padding-all-10-px" style="background:#fff">
      <dd class="ub-box ub-ver">
        <image :src="userInfo.avatarUrl || '/static/images/header.png'" class="head-img" mode="aspectFill"></image>
      </dd>
      <dd class="ub-flex-1 z-font-size-18 z-color-333 ub-box ub-ver-v z-padding-h-10-px">
        <button v-if="isLogin===false" class="loginBtn" lang="zh_CN" @click.stop="login()">登录</button>
        <ul v-if="isLogin===true" class="ub-box z-margin-left-10-px ub-col">
          <li class="z-font-size-16 z-color-333 z-margin-bottom-5-px">{{userInfo.nickName}}</li>
        </ul>
      </dd>
      <dd class="z-font-size-18 z-color-333 ub-box ub-ver-v">
        <div @click.stop="exitLogin()" class="exitBtn ub-box ub-ver z-font-size-14">退出</div>
      </dd>
    </dl>
    <!--订单详情-->
    <i-panel class="cell-panel-demo">
      <i-cell title="我的订单"></i-cell>
    </i-panel>
    <view class="sc df tc bte ">
      <navigator @click.stop="toOrdWList()" class="df_1" url="../user/dingdan?currentTab=0" hover-class="none" >
        <view><image src="../../static/images/dfh.png"></image></view>
        <text class="font_12">待付款</text>
      </navigator>
      <navigator @click.stop="toOrdFList()" class="df_1" url="../user/dingdan?currentTab=3" hover-class="none" >
        <view><image src="../../static/images/dfk.png"></image></view>
        <text  class="font_12">已完成</text>
      </navigator>
      <navigator @click.stop="toOrdList()" class="df_1" url="../user/dingdan?currentTab=4" hover-class="none" >
        <view><image src="../../static/images/tksh.png"></image></view>
        <text class="font_12">全部订单</text>
      </navigator>
    </view>
    <dl class="ub-box ub-col z-margin-top-10-px" style="background:#fff;">
      <dd @click.stop="toOrdList()" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon-danju" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">我的订单</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
      <dd @click.stop="toMsgList()" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon-ziyuan" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">我的消息</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
      <dd @click.stop="toMyInfo()" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon-zhiliang" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">个人信息</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
      <dd @click.stop="toMyPat()" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon-shangpin" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">我的患者</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
      <dd @click.stop="$openWin('/pages/agreement/main')" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon--fuwu" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">用户协议</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
      <dd @click.stop="$openWin('/pages/agreement/main')" class="z-padding-all-10-px ub-box ub-between" style="border-bottom:1px solid #eee">
        <p class="ub-box ub-ver">
          <i class="iconfont icon--fuwu" style="color:#357cfb;font-size:20px"></i>
          <span class="z-font-size-15 z-color-666 z-padding-h-10-px">随访设置</span>
        </p>
        <p class="ub-box ub-ver">
          <i class="iconfont icon-xiayiyeqianjinchakangengduo z-font-size-14 z-color-888"></i>
        </p>
      </dd>
    </dl>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="消息"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      search: '',
      myInfo: {},
      current: 'mine',
      docId: 0,
      user: {}
    }
  },
  methods: {
    login () {
      wx.navigateTo({
        url: '/pages/login/main'
      })
    },
    onGetUserInfo (e) {
      this.$store.commit('updateIsLogin', true)
      this.$store.commit('updateUser', e.mp.detail.userInfo)
    },
    exitLogin () {
      this.$store.commit('resetGroup')
      this.$store.commit('resetUser')
      this.$store.commit('resetCurrentConversation')
      this.$store.commit('resetAllConversation')
      this.$store.commit('updateIsLogin', false)
      this.$store.commit('cleanUserInfo')
      wx.$app.logout()
      wx.clearStorage()
      wx.hideLoading()
      wx.reLaunch({
        url: '../init/main'
      })
    },
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
    reviseInfo () {
      let url = '../profile/main'
      wx.navigateTo({ url: url })
    },
    goUserAgreement () {
      let url = '../../agreement/main'
      wx.navigateTo({ url: url })
    },
    toOrdList () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      console.log(this.user)
      this.docId = this.user.id
      let url = '../myorder/main?docId=' + this.docId + '&orderStatus=2'
      wx.navigateTo({ url: url })
    },
    toOrdWList () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      this.docId = this.user.id
      let url = '../myorder/main?docId=' + this.docId + '&orderStatus=0'
      wx.navigateTo({ url: url })
    },
    toOrdFList () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      this.docId = this.user.id
      let url = '../myorder/main?docId=' + this.docId + '&orderStatus=1'
      wx.navigateTo({ url: url })
    },
    toMyInfo () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      this.docId = this.user.id
      let url = '../docInfo/main?docId=' + this.docId
      wx.navigateTo({ url: url })
    },
    toMyPat () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      this.docId = this.user.id
      let url = '../myPat/main?docId=' + this.docId
      wx.navigateTo({ url: url })
    },
    toMsgList () {
      this.user = wx.getStorageSync('userInfo')
      if (this.user === '') {
        wx.showToast({
          title: '请登录后重试',
          icon: 'info',
          duration: 2000
        })
        return
      }
      this.docId = this.user.id
      let url = '../message/main?docId=' + this.docId
      wx.navigateTo({ url: url })
    },
    logout () {
      this.$store.commit('resetGroup')
      this.$store.commit('resetUser')
      this.$store.commit('resetCurrentConversation')
      this.$store.commit('resetAllConversation')
      wx.$app.logout()
      wx.clearStorage()
      wx.hideLoading()
      wx.reLaunch({
        url: '../login/main'
      })
    }
  },
  // 更新自己的个人信息
  onShow () {
    this.current = 'mine'
    this.myInfo = this.$store.state.user.myInfo
    // this.myInfo = wx.getStorageSync('updateUser')
  }
}
</script>

<style lang='stylus' scoped>
.card
  border-bottom 1px solid $border-light
.avatar
  padding 10px
.right
  box-sizing border-box
  height 100px
  padding 10px
  display flex
  flex-direction column
  justify-content space-around
.username
  font-weight 600
  font-size 18px
  color $base
.account
  font-size 14px
  color $secondary
.start
  color white
  background-color $primary
  border-radius 8px
  height 50px
  width 200px
  line-height 50px
  font-size 16px
.revise
  padding 20px 40px 0 40px
  margin-bottom 70px
.sc
  background: #fff
  width: 100%
  font-size: 12px
  line-height: 16px
  color: #666
  padding: 4% 0
.sc image
  width: 24px
  height: 24px
  display: inline-block
.bte
  border-top: 1px solid #eee
.qbdd
  background: #fff
  width: 92%
  font-size: 12px
  color: #666
  padding: 4%
.mt110
  border-bottom: 1px solid #eee
.df
  display: -webkit-box
  display: -webkit-flex
  display: -ms-flexbox
  display: flex
.df_1
  -webkit-box-flex: 1
  -webkit-flex: 1
  -ms-flex: 1
  flex: 1
  -webkit-tap-highlight-color: transparent
.mt10
  margin-top: 10px
.font_17
  font-size: 16px
.font_12
  font-size: 12px
.c3
  color: #333
.fl_r
  float: right
.c9
  color: #999
  font-size: 12px
  line-height: 20px
.tc
  text-align: center
.bte
  border-top:solid 1px #eee
.container{width:100%;height:100vh;background:#e8e8e8;object-fit: cover}
.head-img{width:60px;height:60px;border-radius:50%;box-shadow:0 0 5px rgba(0,0,0,.2);background:#eee}
.loginBtn{font-size:14px;color:#fff;padding:0px 20px;margin-left: 10px;background: #ff5722}
.exitBtn{border: 1px solid #357cfb;padding:7px 15px;color:#357cfb;border-radius: 3px}
</style>
