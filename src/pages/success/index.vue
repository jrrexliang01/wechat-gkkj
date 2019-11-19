<template>
  <div class="counter-warp">
    <i-card @click="toMyInfo">
      <img src="../../../static/images/pay.png" size="large" shape="square"  style="height: 600px;width: 100%;"/>
    </i-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toMyInfo () {
      let url = '../myInfo/main'
      wx.navigateTo({ url: url })
    }
  }
}
</script>

<style lang="stylus" scoped>
.counter-warp
  text-align center
  margin-top 100px
</style>
