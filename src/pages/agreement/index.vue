<template>
  <div class="container">
    <div class="card">
      <div class="item agreement">
        <span class="z-font-size-15 z-color-666 z-padding-h-10-px">{{user_agreement.content}}</span>
      </div>
  </div>
</div>
</template>

<script>
  import { getAgreementInfo } from '../../config'
  export default {
    data () {
      return {
        user_agreement: {
          content: ''
        }
      }
    },
    methods: {
    },
    async onLoad () {
      const { agreementInfo } = await getAgreementInfo()
      wx.setStorageSync('agreementInfo', agreementInfo)
      this.user_agreement = wx.getStorageSync('agreementInfo')
    }
  }
</script>

<style lang='stylus' scoped>
  .container{width:100%;height:100vh;background:#e8e8e8;}
</style>
