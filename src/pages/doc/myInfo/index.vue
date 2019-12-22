<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="phone" placeholder="请输入手机号" autofocus @change="changValue('phone', $event)" right title="手机号"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="docName" placeholder="请输入医生姓名" @change="changValue('docName', $event)" right title="医生姓名"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="title" placeholder="请输入医生职称" @change="changValue('title', $event)" right title="医生职称"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="hospitalName" placeholder="请输入所属医院" @change="changValue('hospitalName', $event)" right title="所属医院"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="department" placeholder="请输入科室" @change="changValue('department', $event)" right title="科室"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="subject" placeholder="请输入擅长描述" @change="changValue('subject', $event)" right title="擅长描述"/></span>
      </p>
      <p>
        <span class="z-font-size-14 z-color-333"><i-input v-model="introduce" placeholder="请输入医生介绍" @change="changValue('introduce', $event)" right title="医生介绍"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="reg(docId)">保 存</button>
    </dd>
  </div>
</template>

<script>
  import { getDocInfo } from '../../../config'
  export default {
    data () {
      return {
        docId: 0,
        docName: '',
        phone: '',
        title: '',
        hospitalName: '',
        department: '',
        subject: '',
        introduce: '',
        form: {
          id: 0,
          docName: '',
          phone: '',
          hospitals: {
            id: 0,
            hospitalName: '',
            department: ''
          },
          subject: '',
          title: '',
          department: '',
          introduce: '',
          openId: '',
          icon: '',
          alias: ''
        },
        formData: {}
      }
    },
    async onLoad (options) {
      const {docInfo} = await getDocInfo(parseInt(options.docId))
      wx.setStorageSync('userInfo', docInfo)
      this.docId = options.docId
      this.docName = docInfo.docName
      this.phone = docInfo.phone
      this.title = docInfo.title
      this.hospitalName = docInfo.hospitals.hospitalName
      this.department = docInfo.hospitals.department
      this.subject = docInfo.subject
      this.introduce = docInfo.introduce
    },
    methods: {
      async reg (id) {
        this.form.id = id
        this.form.docName = this.docName
        this.form.phone = this.phone
        this.form.title = this.title
        this.form.hospitals.hospitalName = this.hospitalName
        this.form.hospitals.department = this.department
        this.form.subject = this.subject
        this.form.introduce = this.introduce
        this.formData = JSON.stringify(this.form)
        wx.request({
          url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
          data: this.formData,
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success (res) {
            wx.navigateBack()
          }
        })
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

