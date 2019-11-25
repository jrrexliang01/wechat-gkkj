<template>
  <div class="container ub-box">
    <dl class="ub-box ub-col z-width-100-percent">
      <dd class="item z-width-100-percent ub-box ub-ver ub-between z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-font-weight-bold">{{courseInfo.courseTitle}}</span>
        <span class="z-font-size-15 z-color-333 z-font-weight-bold">{{courseInfo.payNum}}人购买</span>
      </dd>
      <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-between z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-font-weight-bold">数量</span>
        <span class="z-font-size-15 z-font-weight-bold">1</span>
      </dd>
      <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-between z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-font-weight-bold">小计</span>
        <span class="z-font-size-15 z-font-weight-bold" style="color:red">
        ¥{{courseInfo.price}}
      </span>
      </dd>
      <!--fixed部分-->
      <ul class="fixCon ub-box ub-ver ub-between">
        <li class="ub-box ub-ver z-padding-h-10-px">
          <span class="z-font-size-12 z-color-999 z-margin-right-10-px">实付金额</span>
          <span class="z-font-size-18 z-font-weight-bold" style="color:red">¥{{courseInfo.price}}</span>
        </li>
        <li @click.stop="toSuccess()" class="sumbitBtn ub-box ub-ver z-font-size-16 z-color-fff">提交订单</li>
      </ul>
    </dl>
  </div>
</template>

<script>
import { orderCourseAdd } from '../../../config'
export default {
  data () {
    return {
      courseInfo: {},
      docInfo: {},
      status: 0,
      orderInfo: {
        total: '',
        doc: {
          id: 0
        },
        course: {
          id: 0
        },
        pay: 0,
        star: 0,
        status: 0,
        integral: 0
      },
      formData: {}
    }
  },
  methods: {
    async toSuccess () {
      this.orderInfo.total = this.courseInfo.price
      this.orderInfo.course.id = this.courseInfo.id
      this.orderInfo.doc.id = this.docInfo.id
      this.orderInfo.pay = this.courseInfo.price
      this.orderInfo.status = 1
      this.formData = JSON.stringify(this.orderInfo)
      const { status } = await orderCourseAdd(this.formData)
      this.status = status
      if (this.status === 1) {
        wx.navigateTo({
          url: '/pages/doc/success/main'
        })
      } else {
      }
    }
  },
  mounted () {
    this.courseInfo = wx.getStorageSync('courseInfo')
    this.docInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#f5f5f5}
  .item{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .fixCon{position: fixed;left: 0;bottom: 0;z-index: 10;width: 100%;background: #fff;}
  .sumbitBtn{padding: 15px 35px;background: #5CA2F2;box-sizing: border-box;}
</style>
