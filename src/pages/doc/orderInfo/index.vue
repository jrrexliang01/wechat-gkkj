<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="ub-box ub-col z-width-100-percent">
        <dd class="item z-width-100-percent ub-box ub-ver z-box-sizing-border z-bg-color-fff">
          <p class="ub-box">
            <img class="z-img-cover" :src="imgSrc"/>
          </p>
          <div class="ub-flex-1 ub-box ub-col z-padding-h-10-px z-box-sizing-border">
            <p class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold z-lines-1-overflow-hidden">
              {{orderInfo.course.courseTitle}}</p>
            <p class="z-font-size-14 z-color-666 z-margin-bottom-3-px z-lines-1-overflow-hidden">专业课程</p>
            <p class="z-font-size-14 z-margin-bottom-3-px" style="color:#06c1ae">¥{{orderInfo.total}}</p>
          </div>
        </dd>
        <dd style="padding:8px 50px" class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">订单信息</span>
          <ul class="z-width-100-percent ub-box ub-col ub-ver">
            <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-8-px">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">订单号</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.orderNum}}</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-8-px">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">购买手机号</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.doc.phone}}</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-8-px">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">下单时间</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.createTime}}</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-8-px">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">数量</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">1</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">总价</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.total}}</span>
            </li>
          </ul>
        </dd>
        <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">评价</span>
          <span v-if="orderInfo.star ===0 " @click.stop="clickContact()" class="contactBtn z-width-100-percent ub-box ub-ver z-font-size-14 z-color-666">订单评价</span>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>
<script>
  import { getOrderCourseInfo } from '../../../config'
  export default {
    data () {
      return {
        imgSrc: '',
        orderInfo: {
          ordId: 0,
          total: 0.00,
          course: {
            courseTitle: '',
            payNum: 0.00,
            summary: ''
          },
          star: 0,
          orderNum: '',
          orderPhone: '',
          createTime: ''
        }
      }
    },
    async onLoad (options) {
      const {orderCourseInfo} = await getOrderCourseInfo(parseInt(options.ordId))
      this.orderInfo = orderCourseInfo
    },
    mounted () {
      let banner = wx.getStorageSync('enclosureList')
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'course_order') {
          this.imgSrc = banner.data[i].enclosurePath
        }
      }
    },
    methods: {
      clickContact () {
        this.$store.commit('showToast', {
          title: '点赞成功',
          icon: 'none',
          duration: 1500
        })
      }
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100vh;background:#f5f5f5}
  .item{border-bottom: 1px solid #f5f5f5;padding: 8px 10px;}
  .item img{width: 80px;height: 60px;border-radius: 3px}
  .contactBtn{padding: 8px 0;border: 1px solid #eee;}
</style>
