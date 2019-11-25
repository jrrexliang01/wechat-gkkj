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
        indexImg: 'http://39.100.255.143/img/wx/wenzhen.jpg',
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
                } else {
                  console.log('验证码无效')
                }
              }
            })
          }
        })
        // this.form.hospitals.id = 1
        // this.formData = JSON.stringify(this.form)
        // wx.request({
        //   url: 'http://localhost:8001/api/wx/doc/add',
        //   data: this.formData,
        //   method: 'POST',
        //   success (res) {
        //     wx.setStorageSync('userInfo', res.data.data)
        //     wx.navigateTo({url: '/pages/doc/home/main'})
        //   }
        // })
      },
      goTOAgreement () {
        wx.navigateTo({url: '/pages/agreement/main'})
      },
      changValue (val, event) {
        this[val] = event.target.detail.value
      }
      // chooseImage () {
      //   var _this = this
      //   wx.chooseImage({
      //     count: 1, // 默认9
      //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //     success: function (res) {
      //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      //       var tempFilePaths = res.tempFilePaths
      //       // 这里是上传操作
      //       wx.uploadFile({
      //         url: getApp().globalData.clientUrl + '/uploadAvatarUrl', // 里面填写你的上传图片服务器API接口的路径
      //         filePath: tempFilePaths[0], // 要上传文件资源的路径 String类型
      //         name: 'avatar', // 按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
      //         header: {
      //           'Content-Type': 'multipart/form-data'// 记得设置
      //         },
      //         formData: {
      //           // 和服务器约定的token, 一般也可以放在header中
      //           'session_token': wx.getStorageSync('session_token')
      //         },
      //         success (res) {
      //           // 当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
      //           if (res.statusCode = 200) {
      //             // var data = res.data
      //             // var statusCode = res.statusCode
      //             // console.log("返回值1" + data);
      //             // console.log("返回值2" + statusCode)
      //             // 这里调用后台的修改操作， tempFilePaths[0],是上面uploadFile上传成功，然后赋值到修改这里。
      //             wx.request({
      //               url: getApp().globalData.clientUrl + '/update?avatar=' + tempFilePaths[0], // 真正修改操作,填写你们修改的API
      //               header: {
      //                 'content-type': 'application/json'
      //               },
      //               method: 'POST',
      //               success: function (res) {
      //                 if (res.data.code === 200) {
      //                   wx.showToast({
      //                     title: '修改成功',
      //                     icon: 'success',
      //                     duration: 2500
      //                   })
      //
      //                   // wx.uploadFile自已有一个this，我们刚才上面定义的var _this = this 把this带进来
      //                   _this.setData({
      //                     'user.avatar': tempFilePaths[0]
      //                   })
      //                 }
      //               }
      //             })
      //           }
      //         }
      //       })
      //     }
      //   })
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>

