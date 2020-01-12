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
      id: '',
      patId: ''
    }
  },
  onLoad (options) {
    this.own = options.own
    this.id = options.caseId
    this.patId = options.patId
  },
  methods: {
    toAddIn () {
      wx.setStorageSync('isIn', '1')
      wx.navigateTo({
        url: '/pages/doc/lactatingCase/main?own=' + this.own + '&caseId=' + this.id + '&patId=' + this.patId
      })
    },
    toAddOut () {
      wx.setStorageSync('isIn', '2')
      wx.navigateTo({
        url: '/pages/doc/nonLactatingCase/main?own=' + this.own + '&caseId=' + this.id + '&patId=' + this.patId
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
