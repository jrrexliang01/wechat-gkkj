<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <div v-for="(val, idx) in billList" :key="idx">
        <dl class="ub-box ub-col z-width-100-percent z-margin-bottom-5-px">
          <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between">
            <p class="z-font-size-14 z-color-333"><b>{{billStatus[val.billTpe]}}收益</b></p>
            <p class="ub-box">
              <span class="z-font-size-14 z-color-333">{{val.createTime}}</span>
            </p>
          </dd>
          <dd v-if="val.income !== null"
              class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between">
            <p class="z-font-size-14 z-color-333"><b>收入</b></p>
            <p class="ub-box">
              <span class="z-font-size-14 z-color-333">{{val.income}}</span>
            </p>
          </dd>
          <dd v-if="val.pay !== null"
              class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between">
            <p class="z-font-size-14 z-color-333"><b>支出</b></p>
            <p class="ub-box">
              <span class="z-font-size-14 z-color-333">{{val.pay}}</span>
            </p>
          </dd>
          <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between"
              style="border-bottom: 1px solid #f5f5f5">
            <p class="z-font-size-14 z-color-333"><b>实际收入</b></p>
            <p class="ub-box">
              <span class="z-font-size-14 z-color-333">{{val.realIn}}</span>
            </p>
          </dd>
        </dl>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import {getDocBill} from '../../../config'

  export default {
    data () {
      return {
        billList: [],
        billStatus: {
          '1': '在线问诊',
          '2': '课程购买'
        }
      }
    },
    async onLoad (options) {
      const {docBill} = await getDocBill(parseInt(options.docId))
      this.billList = docBill
      console.log(docBill)
      for (const v of this.billList) {
        v.realIn = v.income - v.pay
      }
      let list = this.billList
      if (options.type === 'all') {
        this.billList = list
      } else if (options.type === 'in') {
        this.billList = []
        for (const v of list) {
          if (v.income !== null) {
            this.billList.push(v)
          }
        }
      } else {
        this.billList = []
        for (const v of list) {
          if (v.pay !== null) {
            this.billList.push(v)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #f5f5f5
  }

  .item {
    border-bottom: 1px solid #f5f5f5;
    padding: 8px 10px;
  }
</style>
