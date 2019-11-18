<template>
  <div @click.stop="gotoDetail(val.id)" class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
      <img :src="val.icon" class="z-img-cover">
      <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
        <p class="ub-flex-1 ub-box ub-ver ub-between">
          <span class="z-width-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.mainTitle}}</span>
          <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">{{val.title}}</span>
        </p>
        <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
          <span class="z-font-size-12 z-color-666 z-lineHeight-20">{{val.subTitle}}</span>
          <span class="z-font-size-12 z-color-888">{{val.hospitals.hospitalName}}</span>
        </p>

        <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
          <span class="z-font-size-16" style="color:#06c1ae">{{val.price}}元</span>
        </p>
      </div>
  </div>
</template>
<script>
  export default {
    props: ['curGood', 'isLast'],
    data () {
      return {
        val: {
          id: '1',
          icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573637483420&di=8dded1f5739ba6afff8e46ee9f8a8840&imgtype=0&src=http%3A%2F%2Fwww.csytv.com%2Fd%2Ffile%2Fpinlv%2Fshenghuo%2Fztlm_1431313069%2Fnews%2F2017-11-14%2F17d3cace8d41d8415c23fcdd6800814b.png',
          mainTitle: '徐迪',
          subTitle: '擅长科目：乳腺增生',
          title: '主任医生',
          price: '0',
          sales: '协和医院',
          hospitals: {
            hospitalName: ''
          }
        }
      }
    },
    methods: {
      gotoDetail (id) {
        wx.navigateTo({url: '/pages/testDocInfo1/main?docId=' + id})
      }
    }
  }
</script>
<style scoped>
  .card img{width: 80px;height: 80px}
</style>
