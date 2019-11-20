<template>
  <div class="container ub-box ub-col">
    <scroll-view scroll-y style="height: 100vh;padding: 10px;" scroll-top="0">
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-20 z-color-888" style="color: #5ca2f2;padding: 10px;">医生注册</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px" style="border-bottom: 1px solid #f5f5f5">
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入手机号" @change="changValue('phone', $event)" title="手机号"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入邀请码" @change="changValue('code', $event)" title="邀请码"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入医生姓名" @change="changValue('docName', $event)" title="医生姓名"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入医生职称" @change="changValue('title', $event)" title="医生职称"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入所属医院" @change="changValue('hospitalName', $event)" title="所属医院"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入科室" @change="changValue('department', $event)" title="科室"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入擅长描述" @change="changValue('subject', $event)" title="擅长描述"/></span>
        </p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333"><i-input placeholder="请输入医生介绍" @change="changValue('introduce', $event)" title="医生介绍"/></span>
        </p>
        <!--<p class="ub-box">-->
          <!--<span class="z-font-size-14 z-color-333" @click="chooseImage()"><i-input value="" v-model="path" title="资质证书"/></span>-->
        <!--</p>-->
      </dd>
      <div class="login-button">
        <button style="border-radius: 10px;background-color: #5ca2f2;color: #ffffff;" @click="reg" >注  册</button>
      </div>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding-right: 10px;">
        <p class="z-font-size-14 z-color-333" style="color: #5ca2f2;"><b>注册代表同意用户协议</b></p>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
  /* eslint-disable no-cond-assign,no-constant-condition */

  import { getDocInfo } from '../../config'
  export default {
    data () {
      return {
        indexImg: 'http://39.100.255.143/img/wx/wenzhen.jpg',
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
        docInfo: {
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
    async onLoad (options) {
      this.docId = parseInt(options.docId)
      console.log(this.docId)
      const { docInfo } = await getDocInfo(this.docId)
      wx.setStorageSync('docInfo', docInfo)
      this.docInfo = wx.getStorageSync('docInfo')
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
        wx.request({
          url: 'https://gkkj.jrrexliang.com/api/wx/hospital/add',
          data: {
            hospitalName: this.hospitalName,
            department: this.department
          },
          method: 'POST',
          success (res) {
            this.form.hospitals.id = res.data.data.id
            this.formData = JSON.stringify(this.form)
            wx.request({
              url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
              data: this.formData,
              method: 'POST',
              success (res) {
                wx.setStorageSync('userInfo', res.data.data)
                wx.navigateTo({url: '/pages/init/main'})
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
    },
    mounted () {
      wx.removeStorage('docInfo')
      console.log(this.docInfo)
      console.log(wx.getStorageSync('userId'))
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
  .buyBtn{background: #f90;padding: 8px 12px;border-radius:3px}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .tuijian{color: #f90;border:1px solid #f90;}
  .butuijian{color: #999;border:1px solid #ddd;}
  .login-button
    width 90%
    padding 15px 0
    display inline-block
</style>
