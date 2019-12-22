<template>
  <div class="container ub-box" style="background:#fff;">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd class="ub-box ub-col" style="padding-bottom: 40px;">
          <div class="ub-end" v-for="(val, idx) in orderList" :key="idx" :isLast="idx===6">
            <div @click.stop="gotoDocDetail(val.doc.id)" class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.doc.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
                <p class="ub-flex-1 ub-box ub-ver ub-between">
                  <span class="z-width-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.doc.docName}}</span>
                  <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">{{val.doc.title}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-12 z-color-666 z-lineHeight-20">{{val.doc.hospitals.department}}</span>
                  <span class="z-font-size-12 z-color-888">{{val.doc.hospitals.hospitalName}}</span>
                </p>
              </div>
            </div>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getOrderList } from '../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      orderList: {},
      patId: 0
    }
  },
  methods: {
    gotoDocDetail (id) {
      wx.navigateTo({url: '/pages/docInfo/main?docId=' + id})
    }
  },
  async onLoad (options) {
    this.patId = parseInt(options.patId)
    const { orderList } = await getOrderList(this.patId)
    this.orderList = orderList
  },
  mounted () {
    this.orderList = wx.getStorageSync('orderList')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8;}
  .search{background: #f5f5f5;border-radius: 12px;padding: 5px 10px}
  .swiper{height: 120px;width: calc(100% - 16px)}
  .icon-item{width:33.33%;padding: 10px 13px 0 13px;box-sizing: border-box;}
  .icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
  .adv{border-right: 2px solid #eee}
  .adv img{width: 50px;height: 50px}
  .good{border-bottom: 1px solid #DDD8CE}
  .good img{width: 80px;height: 80px}
  .card img{width: 80px;height: 80px}
</style>
