<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">医生注册</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入手机号" autofocus @change="changValue('phone', $event)" right title="手机号"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入邀请码" @change="changValue('code', $event)" right title="邀请码"/></span>
        <span class="z-font-size-14 z-color-333" style="margin-top: 15px">非必填</span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="docName" placeholder="请输入医生姓名" @change="changValue('docName', $event)" right title="医生姓名"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入医生职称" @change="changValue('title', $event)" right title="医生职称"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入所属医院" @change="changValue('hospitalName', $event)" right title="所属医院"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入科室" @change="changValue('department', $event)" right title="科室"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入擅长描述" @change="changValue('subject', $event)" right title="擅长描述"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入医生介绍" @change="changValue('introduce', $event)" right title="医生介绍"/></span>
      </p>
      <!--<p class="ub-box">-->
        <!--<span class="z-font-size-14 z-color-333" @click="chooseImage()"><i-input value="" v-model="path" title="资质证书"/></span>-->
      <!--</p>-->
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="reg()">注  册</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-14 z-color-333 z-margin-bottom-30-px">注册代表同意<font style="color: #357cfb;" @click.stop="goTOAgreement()">用户协议</font></p>
    </dd>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        indexImg: 'http://39.100.255.143:8013/img/wx/wenzhen.jpg',
        docId: 0,
        phone: '13566688888',
        code: '644308',
        docName: '',
        title: '主任',
        hospitalName: '总医院',
        department: '妇科',
        subject: '乳腺',
        path: '',
        introduce: '强',
        form: {
          docName: '',
          phone: '',
          hospitals: {
            id: 0
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
    methods: {
      async reg () {
        let sessionKey = wx.getStorageSync('sessionKey')
        let userInfo = wx.getStorageSync('userInfo')
        this.form.docName = this.docName
        this.form.phone = this.phone
        this.form.subject = this.subject
        this.form.title = this.title
        this.form.department = this.department
        this.form.introduce = this.introduce
        this.form.openId = sessionKey.openid
        this.form.icon = userInfo.avatarUrl
        this.form.alias = userInfo.nickName
        let form = this.form
        let code = this.code
        wx.request({
          url: 'https://gkkj.jrrexliang.com/api/wx/hospital/add',
          data: {
            hospitalName: this.hospitalName,
            department: this.department
          },
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success (res) {
            form.hospitals.id = res.data.data.id
            let formData = JSON.stringify(form)
            wx.request({
              url: 'https://gkkj.jrrexliang.com/api/wx/code/get',
              data: {
                code: code
              },
              method: 'POST',
              success (res) {
                if (res.data.data.id !== null && !res.data.data.isUse) {
                  wx.request({
                    url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
                    data: formData,
                    method: 'POST',
                    header: {
                      'content-type': 'application/json', // 默认值
                      'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
                    },
                    success (res) {
                      wx.setStorageSync('userInfo', res.data.data)
                      wx.navigateTo({url: '/pages/init/main'})
                    }
                  })
                }
              }
            })
          }
        })
      },
      goTOAgreement () {
        wx.navigateTo({url: '/pages/agreement/main'})
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

