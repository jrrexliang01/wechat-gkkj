<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">医生注册</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入手机号（必填）" autofocus @change="changValue('phone', $event)" @blur="testVal($event)" right title="手机号"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="code" placeholder="请输入邀请码（非必填）" @change="changValue('code', $event)" right title="邀请码"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="docName" placeholder="请输入医生姓名（必填）" @change="changValue('docName', $event)" right title="医生姓名"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="title" placeholder="请输入医生职称（必填）" @change="changValue('title', $event)" right title="医生职称"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="hospitalName" placeholder="请输入所属医院（必填）" @change="changValue('hospitalName', $event)" right title="所属医院"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="department" placeholder="请输入科室（必填）" @change="changValue('department', $event)" right title="科室"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="subject" placeholder="请输入擅长描述（必填）" @change="changValue('subject', $event)" right title="擅长描述"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="introduce" placeholder="请输入医生介绍（必填）" @change="changValue('introduce', $event)" right title="医生介绍"/></span>
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
        phone: '',
        code: '',
        docName: '',
        title: '',
        hospitalName: '',
        department: '',
        subject: '',
        path: '',
        introduce: '',
        form: {
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
    onShow () {
      this.phone = ''
      this.code = ''
      this.docName = ''
      this.title = ''
      this.hospitalName = ''
      this.department = ''
      this.subject = ''
      this.introduce = ''
      this.id = ''
      this.form = {
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
      }
    },
    methods: {
      async reg () {
        let sessionKey = wx.getStorageSync('sessionKey')
        let userInfo = wx.getStorageSync('userInfo')
        let location = wx.getStorageSync('location')
        this.form.phone = this.phone
        if (this.form.phone === '') {
          this.$store.commit('showToast', {
            title: '请填写手机号',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (this.form.phone.length !== 11) {
          this.$store.commit('showToast', {
            title: '您输入的手机号长度有问题',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.docName = this.docName
        if (this.form.docName === '') {
          this.$store.commit('showToast', {
            title: '请填写医生姓名',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.subject = this.subject
        if (this.form.subject === '') {
          this.$store.commit('showToast', {
            title: '请填写擅长科目',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.title = this.title
        if (this.form.title === '') {
          this.$store.commit('showToast', {
            title: '请填写职称',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.department = this.department
        if (this.form.department === '') {
          this.$store.commit('showToast', {
            title: '请填写科室',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.introduce = this.introduce
        if (this.form.introduce === '') {
          this.$store.commit('showToast', {
            title: '请填写医生介绍',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (this.form.hospitalName === '') {
          this.$store.commit('showToast', {
            title: '请填写所属医院',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.form.openId = sessionKey.openid
        this.form.icon = userInfo.avatarUrl
        this.form.alias = userInfo.nickName
        let form = this.form
        let code = this.code
        if (form.hospitals.id !== 0) {
          form.id = this.id
          form.province = location.province
          form.city = location.city
          const number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
          form.uniqueCode = number
          let formData = JSON.stringify(form)
          wx.request({
            url: 'https://gkkj.jrrexliang.com/api/wx/code/get',
            data: {
              code: code
            },
            header: {
              'content-type': 'application/json', // 默认值
              'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
            },
            method: 'POST',
            success (res) {
              if (!res.data.data.isUse) {
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
                    wx.redirectTo({url: '/pages/init/main'})
                  }
                })
              } else {
                this.$store.commit('showToast', {
                  title: '邀请码已经使用请联系管理人员',
                  icon: 'none',
                  duration: 1500
                })
              }
            }
          })
        } else {
          wx.request({
            url: 'https://gkkj.jrrexliang.com/api/wx/hospital/add',
            data: {
              hospitalName: this.hospitalName,
              department: this.department,
              province: location.province,
              city: location.city,
              county: location.district,
              province_str: location.province,
              city_str: location.city,
              county_str: location.district
            },
            method: 'POST',
            header: {
              'content-type': 'application/json', // 默认值
              'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success (res) {
              form.hospitals.id = res.data.data.id
              form.hospitals.hospitalName = res.data.data.hospitalName
              form.hospitals.department = res.data.data.department
              form.province = location.province
              form.city = location.city
              let formData = JSON.stringify(form)
              wx.request({
                url: 'https://gkkj.jrrexliang.com/api/wx/code/get',
                data: {
                  code: code
                },
                header: {
                  'content-type': 'application/json', // 默认值
                  'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
                },
                method: 'POST',
                success (res) {
                  if (!res.data.data.isUse) {
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
                  } else {
                    this.$store.commit('showToast', {
                      title: '邀请码已经使用请联系管理人员',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
            }
          })
        }
      },
      goTOAgreement () {
        wx.navigateTo({url: '/pages/agreement/main'})
      },
      changValue (val, event) {
        this[val] = event.target.detail.value
      },
      testVal (event) {
        let phone = event.target.detail.value.replace(/\s/g, '')
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/

        if (regs.test(phone)) {
          let that = this
          wx.request({
            url: 'https://gkkj.jrrexliang.com/api/wx/doc/getDocByPhone',
            data: {
              phone: phone
            },
            header: {
              'content-type': 'application/json', // 默认值
              'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
            },
            method: 'POST',
            success (res) {
              if (res.data.data !== null) {
                that.id = res.data.data.id
                that.phone = res.data.data.phone
                that.docName = res.data.data.docName
                that.subject = res.data.data.subject
                that.title = res.data.data.title
                that.department = res.data.data.department
                that.hospitalName = res.data.data.hospitals.hospitalName
                that.introduce = res.data.data.introduce
                that.form.hospitals.id = res.data.data.hospitals.id
                that.form.hospitals.hospitalName = res.data.data.hospitals.hospitalName
                that.form.hospitals.department = res.data.data.hospitals.department
              }
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>

