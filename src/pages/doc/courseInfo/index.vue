<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh - 50px);" scroll-top="0">
      <dl class="ub-box ub-col">
        <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
          <image @click.stop="previewImage([indexImg])" class="z-width-100-percent z-img-cover indexImg"
                 :src="indexImg">
            <div class="indexImg-bk ub-box ub-col">
              <span class="z-font-size-18 z-lineHeight-30 z-color-fff z-box-sizing-border z-padding-h-8-px">{{courseInfo.courseTitle}}</span>
            </div>
          </image>
        </dd>
      </dl>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-ver"
          style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-888">介绍</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>课程类别</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{typeVal[courseInfo.type]}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between"
          style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>主讲医生</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{courseInfo.doc.docName}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-ver"
          style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-888">简介</p>
      </dd>
      <dd
        class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col z-margin-bottom-40-px">
        <parser :html="courseInfo.summary" img-mode="widthFix"></parser>
      </dd>
    </scroll-view>
    <!--fixed部分-->
    <ul class="fixCon ub-box ub-ver ub-between">
      <li class="ub-box ub-ver z-padding-h-10-px z-margin-bottom-10-px">
        <span class="z-font-size-12 z-color-999 z-margin-right-10-px">课程金额：</span>
        <span class="z-font-size-18 z-font-weight-bold" style="color:red">¥{{courseInfo.price}}</span>
      </li>
      <li @click.stop="toConsult(courseInfo.id)" class="submitBtn ub-box ub-ver z-font-size-16 z-color-fff">立即购买</li>
    </ul>
  </div>
</template>

<script>
  import {getCourseInfo} from '../../../config'

  export default {
    data () {
      return {
        indexImg: '',
        courseId: 0,
        courseInfo: {
          id: 0,
          courseTitle: '',
          payNum: '',
          price: '',
          type: '',
          summary: '',
          doc: {
            docName: ''
          }
        },
        typeVal: {
          '1': '技术培训',
          '2': '经验分享'
        }
      }
    },
    async onLoad (options) {
      const {courseInfo} = await getCourseInfo(parseInt(options.courseId))
      this.courseInfo = courseInfo
      this.videoContext = wx.createVideoContext('myVideo')
    },
    mounted () {
      let banner = wx.getStorageSync('enclosureList')
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'course_banner') {
          this.indexImg = banner.data[i].enclosurePath
        }
      }
    },
    methods: {
      toConsult: function (id) {
        wx.setStorageSync('courseInfo', this.courseInfo)
        wx.navigateTo({
          url: '/pages/doc/paymentInfo/main?courseId=' + id
        })
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
</style>
