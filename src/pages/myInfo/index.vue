<template>
  <div class="counter-warp">
    <div class="revise" style="margin-top: 10px;">
      <img src="http://39.100.255.143:8013/img/wx/puru.png" @click="toAddIn" size="large" shape="square"  style="height: 200px;width: 100%;"/>
    </div>
    <div class="revise" style="margin-top: 20px;">
      <img src="http://39.100.255.143:8013/img/wx/feipuru.png" @click="toAddOut" size="large" shape="square"  style="height: 200px;width: 100%;"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      own: false,
      id: ''
    }
  },
  onLoad (options) {
    this.own = options.own
    this.id = options.caseId
  },
  methods: {
    toAddIn () {
      wx.setStorageSync('isIn', '1')
      wx.navigateTo({
        url: '/pages/lactatingCase/main?own=' + this.own + '&caseId=' + this.id
      })
    },
    toAddOut () {
      wx.setStorageSync('isIn', '2')
      wx.navigateTo({
        url: '/pages/nonLactatingCase/main?own=' + this.own + '&caseId=' + this.id
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
