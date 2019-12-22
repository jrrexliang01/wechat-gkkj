<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
          <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">是否在线</span>
          <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <i-switch :value="onLineStatus" @change="onChange()" slot="footer"></i-switch>
            </span>
        </li>
      </ul>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="saveStatus()">保存</button>
    </dd>
  </div>
</template>

<script>
  import {doctorAdd, getDocInfo} from '../../../config'

  export default {
    data () {
      return {
        onLineStatus: false,
        docInfo: {},
        formData: {}
      }
    },
    async onLoad (options) {
      const {docInfo} = await getDocInfo(parseInt(options.docId))
      this.docInfo = docInfo
      this.onLineStatus = this.docInfo.onlineStatus
    },
    methods: {
      onChange () {
        this.onLineStatus === true ? this.onLineStatus = false : this.onLineStatus = true
      },
      async saveStatus () {
        if (this.onLineStatus) {
          this.docInfo.onlineStatus = 1
        } else {
          this.docInfo.onlineStatus = 0
        }
        this.formData = JSON.stringify(this.docInfo)
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
