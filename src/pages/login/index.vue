<template>
  <div class="container ub-box ub-col">
    <dd class="ub-ver z-margin-bottom-20-px z-margin-top-40-px">
      <img src="../../../static/images/logo.png" size="large" shape="square"  style="height: 120px;width: 120px;"/>
    </dd>
    <dd class="z-box-sizing-border z-bg-color-fff ub-ver-h">
      <p class="z-font-size-18 z-color-000">国科康健</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-between z-margin-top-10-px" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-16 z-color-333">输入医生推荐码，可以获取医生的专属服务</p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="getUserInfo" type="primary" shape="square" size="large" open-type="getUserInfo" @change="getUserInfo">立即登陆</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-between z-margin-top-10-px" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-16 z-color-333" @click.stop="goBack()">暂不登录</p>
    </dd>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      getUserInfo () {
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
                  wx.request({
                    url: 'https://gkkj.jrrexliang.com/api/wx/doc/userType',
                    data: {
                      openId: sessionKey.openid
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/json', // 默认值
                      'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
                    },
                    success (res) {
                      console.log(res)
                      if (res.data.data.userType === null) {
                        wx.getUserInfo({
                          success (res) {
                            wx.setStorageSync('userInfo', res.userInfo)
                            wx.navigateTo({url: '/pages/register/main'})
                          }
                        })
                      } else if (res.data.data.userType === 1) {
                        wx.setStorageSync('userInfo', res.data.data.doc)
                        wx.navigateTo({url: '/pages/doc/home/main'})
                      } else if (res.data.data.userType === 2) {
                        console.log('patient')
                        wx.setStorageSync('userInfo', res.data.data.patient)
                        wx.navigateTo({url: '/pages/home/main'})
                      }
                    }
                  })
                }
              })
            }
          }
        })
      },
      goBack () {
        wx.navigateBack()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff;text-align:center;}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
