<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">问诊价钱</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="price" type="number" title="问诊价钱" placeholder="请输入问诊价钱" maxlength="10" right @change="changValue('price',$event)"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="savePrice()">保存</button>
    </dd>
  </div>
</template>

<script>
import { getDocInfo } from '../../../config'
export default {
  data () {
    return {
      price: 1000,
      docInfo: {},
      formData: {}
    }
  },
  async onLoad (options) {
    this.docId = parseInt(options.docId)
    const { docInfo } = await getDocInfo(this.docId)
    wx.setStorageSync('docInfo', docInfo)
    this.docInfo = wx.getStorageSync('docInfo')
  },
  methods: {
    async savePrice () {
      this.docInfo.price = this.price
      // TODO 补全后台AJAX
      this.formData = JSON.stringify(this.docInfo)
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
        data: this.formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          wx.removeStorageSync('docInfo')
          wx.setStorageSync('docInfo', res.data.data)
          this.$store.commit('showToast', {
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    changValue (val, event) {
      this[val] = event.target.detail.value
    }
  },
  mounted () {
    wx.removeStorage('docInfo')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
