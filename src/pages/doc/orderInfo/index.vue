<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height: 100vh" scroll-top="0">
      <dl class="ub-box ub-col z-width-100-percent">
        <dd class="item z-width-100-percent ub-box ub-ver z-box-sizing-border z-bg-color-fff">
          <p class="ub-box">
            <img class="z-img-cover" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573708198208&di=caad1e40da5a13dd206896e3494cffed&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F12%2F27%2Fd4e58d34321d4d7be62b4a6d7682c211.jpg" />
          </p>
          <div class="ub-flex-1 ub-box ub-col z-padding-h-10-px z-box-sizing-border">
            <p class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold z-lines-1-overflow-hidden">{{orderInfo.course.courseTitle}}</p>
            <p class="z-font-size-14 z-color-666 z-margin-bottom-3-px z-lines-1-overflow-hidden">专业课程</p>
            <p class="z-font-size-14 z-margin-bottom-3-px" style="color:#06c1ae">¥{{orderInfo.total}}</p>
          </div>
        </dd>
        <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">课程介绍</span>
          <div class="z-width-100-percent ub-box ub-between">
            <span class="z-font-size-14 z-color-666">{{orderInfo.course.summary}}</span>
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
    methods: {
      clickContact () {
        wx.showActionSheet({
          itemList: ['客服电话：10107888'],
          success (res) {
            switch (res.tapIndex) {
              case 0:
                wx.makePhoneCall({phoneNumber: '10107888'})
                break
            }
          }
        })
      }
    },
    async onLoad (options) {
      this.ordId = parseInt(options.ordId)
      const { orderCourseInfo } = await getOrderCourseInfo(this.ordId)
      wx.setStorageSync('orderCourseInfo', orderCourseInfo)
      this.orderInfo = wx.getStorageSync('orderCourseInfo')
    },
    mounted () {
      this.orderInfo = wx.getStorageSync('orderCourseInfo')
    },
    onShow () {
      wx.setNavigationBarTitle({title: '订单详情页'})
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100vh;background:#f5f5f5}
  .item{border-bottom: 1px solid #f5f5f5;padding: 8px 10px;}
  .item img{width: 80px;height: 60px;border-radius: 3px}
  .contactBtn{padding: 8px 0;border: 1px solid #eee;}
</style>
