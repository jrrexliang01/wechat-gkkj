<template>
  <div class="counter-warp">
    <div style="margin-bottom: 20px">
      <img src="../../../static/images/logo.png" size="large" shape="square"  style="height: 120px;width: 120px;"/>
    </div>
    <div class="login">
      国科康健
    </div>
    <div class="login-button">
      <button style="border-radius: 6px;background-color: #357cfb;" @click="getUserInfo" type="primary" shape="square" size="large" open-type="getUserInfo" @change="getUserInfo">获取微信授权</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { genTestUserSig } from '../../../static/utils/GenerateTestUserSig'
export default {
  data () {
    return {
      userID: 'user1',
      password: '',
      selected: false,
      userInfo: {
        id: 0,
        patientName: ''
      },
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  computed: {
    ...mapState({
      isSdkReady: state => {
        return state.global.isSdkReady
      }
    })
  },
  methods: {
    getUserInfo (e) {
      wx.login({
        success (res) {
          if (res.code) {
            wx.request({
              url: 'https://gkkj.jrrexliang.com/wx/user/wx67010d52ded34ff6/login',
              data: {
                code: res.code
              },
              method: 'GET',
              success (res) {
                wx.setStorageSync('sessionKey', res)
                wx.getUserInfo({
                  success (res) {
                    console.log(res.userInfo)
                    var sessionKey = wx.getStorageSync('sessionKey')
                    console.log(sessionKey.data.openid)
                    // let options = genTestUserSig(sessionKey.data.openid)
                    // options.runLoopNetType = 0
                  }
                })
              }
            })
          }
        }
      })
      // if (options) {
      //   wx.$app.login({
      //     userID: 'user1',
      //     userSig: options.userSig,
      //     hasUserInfo: true
      //   }).then(() => {
      //     wx.setStorageSync('userInfo', {
      //       id: 1,
      //       patientName: '黄一凡'
      //     })
      //     wx.setStorageSync('userId', 'user1')
      //     wx.setStorageSync('userStatus', 'user1')
      //     wx.showLoading({
      //       title: '登录成功'
      //     })
      //   })
      // }
    }
  }
}
</script>

<style lang="stylus" scoped>
.select-wrapper
  display flex
  justify-content space-between
  border 1px solid $border-light
  height 30px
  .show
    text-align center
    color $secondary
    padding-left 10px
    font-size 14px
    line-height 30px
  .down
    color white
    background-color $primary
    height 100%
    padding 10px 8px
    box-sizing border-box
    .inside
      width 0
      height 0
      border-left 8px solid transparent
      border-right 8px solid transparent
      border-top 10px solid white
.select-list
  position absolute
  z-index 9999
  background-color white
  width 200px
  height 200px
  overflow-y scroll
  border-left 1px solid $border-base
  border-right 1px solid $border-base
  box-sizing border-box
  .select
    border-bottom 1px solid $border-base
    font-size 14px
    text-align left
    padding 6px 8px
.counter-warp
  text-align center
  margin-top 100px
.login
  display inline-block
  padding 10px 0
  border-radius 8px
  width 200px
.input
  text-align center
  height 32px
  background-color white
  border-radius 8px
  font-size 16px
  border 1px solid $border-base
  margin-bottom 8px
.login-button
  width 320px
  padding 20px 0
  display inline-block
</style>
