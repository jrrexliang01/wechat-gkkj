<template>
  <div class="counter-warp">
    <div class="search-wrapper">
      <input type="text" class="search" placeholder="请输入查询条件" v-model.lazy:value="search" confirm-type="search" @confirm="confirm()"/>
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import { genTestUserSig } from '../../../static/utils/GenerateTestUserSig'
export default {
  data () {
    return {
      userID: 'user0',
      password: '',
      selected: false,
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      docList: {},
      current: 'homepage'
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
    handleChange (detail) {
      this.current = detail.mp.detail.key
      if (detail.mp.detail.key.toString() === 'homepage') {
        wx.switchTab({
          url: '../home/main'
        })
      } else if (detail.mp.detail.key.toString() === 'kepu') {
        wx.switchTab({
          url: '../newsDoc/main'
        })
      } else if (detail.mp.detail.key.toString() === 'mine') {
        wx.switchTab({
          url: '../own/main'
        })
      } else if (detail.mp.detail.key.toString() === 'chat') {
        wx.switchTab({
          url: '../index/main'
        })
      }
    },
    toDocInfo1 (id) {
      wx.navigateTo({
        url: '/pages/testDocInfo1/main?docId=' + id
      })
    },
    toDocInfo2 () {
      wx.navigateTo({
        url: '/pages/testDocInfo2/main'
      })
    },
    toDocInfo3 () {
      wx.navigateTo({
        url: '/pages/testDocInfo3/main'
      })
    },
    testSearchDoc () {
      wx.navigateTo({
        url: '/pages/testSearchDoc/main'
      })
    },
    testSearchDisease () {
      wx.navigateTo({
        url: '/pages/testSearchDisease/main'
      })
    },
    testSearchNews () {
      wx.navigateTo({
        url: '/pages/newsDoc/main'
      })
    },
    choose () {
      this.selected = !this.selected
    },
    select (e) {
      this.userID = e.target.id
      this.choose()
    },
    getUserInfo (e) {
      let options = genTestUserSig(this.userID)
      options.runLoopNetType = 0
      if (options) {
        wx.$app.login({
          userID: 'user0',
          userSig: options.userSig,
          hasUserInfo: true
        }).then(() => {
          wx.showLoading({
            title: '登录成功'
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-wrapper
  background-color #E7E9EA
  padding 10px 20px
  .search
    width 100%
    box-sizing border-box
    background-color white
    height 30px
    font-size 14px
    line-height 30px
    border-radius 20px
    text-align center
.row-class
  background: #fff
.col-class
  height: 32px
  line-height: 32px
  color: #fff
  text-align: center
  background: #2d8cf0
  font-size: 12px
.col-class
  .light
    background: #5cadff
.label-size
  margin-top: 5px
  display: block
  text-align: center
  color: #1c2438
  font-size: 8px
  text-overflow: ellipsis
  overflow: hidden
.card-demo image
  border-radius: 50%
.top-grid-menu
  background: #fff
  margin-bottom: 20rpx
  display: flex
.grid-item
  display: flex
  flex-direction: column
  flex-grow: 1
  padding: 30rpx 0rpx
  justify-content: center
  align-items: center
.grid-icon
  width: 70rpx
  height: 70rpx
  background-color: none
.grid-title
  font-size: 24rpx
  margin-top: 15rpx
.card-bottom
  margin-bottom: 10px
</style>
