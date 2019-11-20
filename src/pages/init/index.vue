<template>
  <div class="container ub-box ub-col ub-ver">
    <div class="login">
      精彩内容马上就来
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { genTestUserSig } from '../../../static/utils/GenerateTestUserSig'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isSdkReady: state => {
        return state.global.isSdkReady
      }
    })
  },
  onLoad () {
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
              var sessionKey = res.data
              wx.setStorageSync('sessionKey', sessionKey)
              wx.getUserInfo({
                success () {
                  wx.request({
                    url: 'https://gkkj.jrrexliang.com/api/wx/doc/userType',
                    data: {
                      openId: sessionKey.openid
                    },
                    method: 'POST',
                    success (res) {
                      console.log(res)
                      if (res.data.data.userType === null) {
                        console.log('null')
                        wx.redirectTo({
                          url: '/pages/home/main'
                        })
                      } else if (res.data.data.userType === 1) {
                        console.log('doc')
                        wx.setStorageSync('userInfo', res.data.data.doc)
                        let options = genTestUserSig(res.data.data.doc.openId)
                        options.runLoopNetType = 0
                        if (options) {
                          wx.$app.login({
                            userID: res.data.data.doc.openId,
                            userSig: options.userSig,
                            hasUserInfo: true
                          }).then(() => {
                            wx.navigateTo({url: '/pages/home/main'})
                          })
                        }
                        wx.redirectTo({
                          url: '/pages/doc/home/main'
                        })
                      } else if (res.data.data.userType === 2) {
                        console.log('patient')
                        wx.setStorageSync('userInfo', res.data.data.patient)
                        let options = genTestUserSig(res.data.data.patient.openId)
                        options.runLoopNetType = 0
                        if (options) {
                          wx.$app.login({
                            userID: res.data.data.patient.openId,
                            userSig: options.userSig,
                            hasUserInfo: true
                          }).then(() => {
                            wx.navigateTo({url: '/pages/home/main'})
                          })
                        }
                        wx.redirectTo({
                          url: '/pages/home/main'
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
</style>
