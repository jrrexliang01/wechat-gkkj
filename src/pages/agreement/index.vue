<template>
  <div class="container">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col">
      <ul class="ub-box ub-col">
        <li class="z-font-size-14 z-color-333 z-box-sizing-border z-lineHeight-24">&nbsp;&nbsp;&nbsp;&nbsp;{{user_agreement.content}}</li>
      </ul>
    </dd>
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
