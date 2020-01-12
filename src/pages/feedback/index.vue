<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dd style="padding:8px 10px"
          class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">反馈内容</span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">
              <textarea placeholder="请填写您对于本小程序的意见" v-model="content" auto-focus/>
            </span>
          </li>
        </ul>
      </dd>
      <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px z-margin-bottom-20-px">
        <button class="loginBtn" lang="zh_CN" @click.stop="save()">保存</button>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
import { feedBackAdd } from '../../config'
export default {
  data () {
    return {
      id: '',
      content: '',
      userInfo: '',
      form: {
        content: '',
        patient: {
          id: ''
        },
        openid: ''
      },
      formData: {}
    }
  },
  methods: {
    async save () {
      this.userInfo = wx.getStorageSync('userInfo')
      this.form.content = this.content
      this.form.patient.id = this.userInfo.id
      this.form.openid = this.userInfo.openId
      this.formData = JSON.stringify(this.form)
      if (this.form.content === '') {
        this.$store.commit('showToast', {
          title: '请输入反馈内容',
          icon: 'none',
          duration: 1500
        })
        return
      }
      const {status} = await feedBackAdd(this.formData)
      this.status = status
      if (this.status === 1) {
        this.$store.commit('showToast', {
          title: '感谢您的反馈',
          icon: 'none',
          duration: 1500
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
  .buyBtn{background: #f90;padding: 8px 12px;border-radius:3px}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .fixCon{position: fixed;left: 0;bottom: 0;z-index: 10;width: 100%;background: #fff;}
  .submitBtn{padding: 15px 35px;background: #5CA2F2;box-sizing: border-box;}
  .input{font-size: 12px;}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #5CA2F2}
</style>
