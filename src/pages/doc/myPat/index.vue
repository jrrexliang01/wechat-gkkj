<template>
  <div class="container ub-box ub-col">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd class="ub-box ub-col" style="padding-bottom: 40px;" v-if="myPatInfo.length !== 0">
          <div class="ub-end" v-for="(val, idx) in myPatInfo" :key="idx" :isLast="idx===6"
               style="border-bottom: 1px solid #f5f5f5">
            <div class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
                <p class="ub-flex-1 ub-box ub-ver ub-between">
                <span
                  class="z-width-60-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.patientName}}</span>
                  <span class="ub-flex-1 z-textAlign-right z-font-size-12 z-color-888">年龄:{{val.age}}</span>
                </p>
                <p class="ub-flex-1 ub-box ub-ver ub-between ub-flex-end">
                  <span class="z-font-size-12 z-color-666 z-lineHeight-20">联系电话:{{val.phone}}</span>
                  <span class="z-font-size-12 z-color-888"></span>
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
  import { getMyPat } from '../../../config'
  export default {
    data () {
      return {
        myPatInfo: []
      }
    },
    async onLoad (options) {
      const {myPatInfo} = await getMyPat(parseInt(options.docId))
      this.myPatInfo = myPatInfo
      console.log(this.myPatInfo)
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #fff;
  }

  .search {
    background: #f5f5f5;
    border-radius: 12px;
    padding: 5px 10px
  }
  .swiper{height: 120px;width: calc(100% - 16px)}
  .icon-item{width:33.33%;padding: 10px 13px 0 13px;box-sizing: border-box;}
  .icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
  .adv{border-right: 2px solid #eee}
  .adv img{width: 50px;height: 50px}
  .good{border-bottom: 1px solid #DDD8CE}
  .good img{width: 80px;height: 80px}
  .card img{width: 80px;height: 80px}
</style>
