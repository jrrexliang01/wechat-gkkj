<template>
  <div class="container ub-box ub-col ub-ver">
    <div class="login">
      精彩内容马上就来
    </div>
  </div>
</template>

<script>
import {enclosureFindAll, getBaseDocs} from '../../config'
export default {
  onLoad () {
    wx.clearStorage()
    wx.login({
      success (res) {
        if (res.code) {
          wx.request({
            url: 'https://gkkj.jrrexliang.com/wx/user/wx8610e4f0f0c5f3bb/login',
            data: {
              code: res.code
            },
            method: 'GET',
            success (res) {
              var sessionKey = res.data
              wx.setStorageSync('sessionKey', sessionKey)
              wx.setStorageSync('token', sessionKey.unionid)
              wx.request({
                url: 'https://gkkj.jrrexliang.com/api/wx/doc/userType',
                data: {
                  openId: sessionKey.openid
                },
                header: {
                  'content-type': 'application/json', // 默认值
                  'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
                },
                method: 'POST',
                success (res) {
                  if (res.data.data.userType === null) {
                    wx.redirectTo({
                      url: '/pages/home/main'
                    })
                  } else if (res.data.data.userType === 1) {
                    wx.setStorageSync('userInfo', res.data.data.doc)
                    wx.redirectTo({
                      url: '/pages/doc/home/main'
                    })
                  } else if (res.data.data.userType === 2) {
                    wx.setStorageSync('userInfo', res.data.data.patient)
                    wx.redirectTo({
                      url: '/pages/home/main'
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  async mounted () {
    const {enclosureList} = await enclosureFindAll()
    wx.setStorageSync('enclosureList', enclosureList)
    if (wx.getStorageSync('history') === '') {
      wx.setStorageSync('history', [])
    }
    const {allDocList} = await getBaseDocs()
    wx.setStorageSync('allDocList', allDocList)
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
</style>
