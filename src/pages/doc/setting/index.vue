<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="remindDay" type="number" title="随访天数"
                                                          placeholder="请输入随访天数" maxlength="2" right
                                                          @change="changValue('remindDay',$event)"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="saveDay()">保存</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-14 z-color-333">随访天数用来通过系统提示您何时对患者进行随访。</p>
    </dd>
  </div>
</template>

<script>
  import {getRemindInfo, remindConfigAdd} from '../../../config'

  export default {
    data () {
      return {
        remindDay: '',
        status: '',
        form: {
          id: '',
          remindDay: '',
          doc: {
            id: 0
          }
        }
      }
    },
    async onShow () {
      let userInfo = wx.getStorageSync('userInfo')
      const remindInfo = await getRemindInfo(userInfo.id)
      this.remindDay = remindInfo.remindInfo.remindDay
      this.form = remindInfo.remindInfo
    },
    methods: {
      async saveDay () {
        let userInfo = wx.getStorageSync('userInfo')
        if (this.form.doc === null) {
          this.form.doc = {id: 0}
        }
        this.form.doc.id = userInfo.id
        this.form.remindDay = this.remindDay
        await remindConfigAdd(JSON.stringify(this.form)).then(
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
