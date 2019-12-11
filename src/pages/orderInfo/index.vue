<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height: 100vh" scroll-top="0">
      <dl class="ub-box ub-col z-width-100-percent">
        <dd class="item z-width-100-percent ub-box ub-ver z-box-sizing-border z-bg-color-fff">
          <p class="ub-box">
            <img class="z-img-cover" :src="orderInfo.doc.icon" />
          </p>
          <div class="ub-flex-1 ub-box ub-col z-padding-h-10-px z-box-sizing-border">
            <p class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold z-lines-1-overflow-hidden">{{orderInfo.doc.docName}}问诊</p>
            <p class="z-font-size-14 z-color-666 z-margin-bottom-3-px z-lines-1-overflow-hidden">在线问诊</p>
            <p class="z-font-size-14 z-margin-bottom-3-px" style="color:#06c1ae">¥{{orderInfo.total}}</p>
          </div>
        </dd>
        <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">所属医院/科室</span>
          <div class="z-width-100-percent ub-box ub-between">
            <span class="z-font-size-14 z-color-666">{{orderInfo.doc.hospitals.hospitalName}}/{{orderInfo.doc.hospitals.department}}</span>
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
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.patient.phone}}</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-8-px">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">下单时间</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.createTime}}</span>
            </li>
            <li class="z-width-100-percent ub-box ub-between ub-ver">
              <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">支付金额</span>
              <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.total}}</span>
            </li>
          </ul>
        </dd>
        <dd style="padding:8px 50px" class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">问诊单信息</span>
          <li class="z-width-100-percent ub-box ub-between ub-ver">
            <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">问诊开始时间</span>
            <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.createTime}}</span>
          </li>
          <li class="z-width-100-percent ub-box ub-between ub-ver">
            <span class="z-font-size-14 z-color-888 ub-flex-1 z-textAlign-left">评估报告时间</span>
            <span class="z-font-size-14 z-color-888 ub-flex-2 z-textAlign-right">{{orderInfo.createTime}}</span>
          </li>
        </dd>
        <dd class="item z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
          <span v-if="orderInfo.star ===0 " @click.stop="clickContact()" class="contactBtn z-width-100-percent ub-box ub-ver z-font-size-14 z-color-666">点赞</span>
          <div v-if="orderInfo.star !==0 ">
            <i-rate
              :value="orderInfo.star">
            </i-rate>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>
<script>
  import { getOrderInfo } from '../../config'
  export default {
    data () {
      return {
        orderInfo: {
          ordId: 0,
          total: 0.00,
          hospitals: {
            hospitalName: '',
            department: ''
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
        this.$store.commit('showToast', {
          title: '点赞成功',
          icon: 'none',
          duration: 1500
        })
      }
    },
    async onLoad (options) {
      this.ordId = parseInt(options.ordId)
      const { orderInfo } = await getOrderInfo(this.ordId)
      wx.setStorageSync('orderInfo', orderInfo)
      this.orderInfo = wx.getStorageSync('orderInfo')
    },
    mounted () {
      this.orderInfo = wx.getStorageSync('orderInfo')
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
