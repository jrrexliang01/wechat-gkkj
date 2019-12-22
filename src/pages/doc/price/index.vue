<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="price" type="number" title="问诊价钱" placeholder="请输入问诊价钱" maxlength="10" right @change="changValue('price',$event)"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="savePrice()">保存</button>
    </dd>
  </div>
</template>

<script>
  import {doctorAdd, getDocInfo} from '../../../config'

  export default {
    data () {
      return {
        price: 0,
        docInfo: {}
      }
    },
    async onLoad (options) {
      const {docInfo} = await getDocInfo(parseInt(options.docId))
      this.docInfo = docInfo
      this.price = this.docInfo.price
    },
    methods: {
      async savePrice () {
        this.docInfo.price = this.price
        await doctorAdd(JSON.stringify(this.docInfo)).then(
          wx.navigateBack()
        )
      },
      changValue (val, event) {
        this[val] = event.target.detail.value
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
