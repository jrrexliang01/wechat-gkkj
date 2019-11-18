<template>
  <div class="bg">
    <div class="card" style="margin-top:20px">
      <view style="margin: 16px">用户信息</view>
      <i-input value="王某某" title="姓名" disabled />
      <i-input value="35" title="年龄" disabled />
      <i-input value="13566677777" title="电话" disabled />
      <i-cell title="疾病史">
        <i-switch value="false" bind:change="onChange" slot="footer"></i-switch>
      </i-cell>
      <i-cell title="过敏史">
        <i-switch value="false" bind:change="onChange" slot="footer"></i-switch>
      </i-cell>
      <i-input value="22" title="产后天数（天）" disabled />
      <i-input value="少奶" title="目前状态" disabled />
    </div>
    <div class="card" style="margin-top:20px">
      <view style="margin: 16px">就诊报告</view>
      <i-cell title="疼痛">
        <i-switch value="false" bind:change="onChange" slot="footer"></i-switch>
      </i-cell>
      <i-cell title="积乳">
        <i-switch value="false" bind:change="onChange" slot="footer"></i-switch>
      </i-cell>
      <i-input value="团结" title="包块" disabled />
      <i-input value="破裂" title="乳头问题" disabled />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switch1: false
    }
  },
  methods: {
    onChange (event) {
      const detail = event.detail
      this.setData({
        'switch1': detail.value
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg
  background-color $background
  height 100vh
.right
  box-sizing border-box
  height 100px
  padding 10px
  display flex
  flex-direction column
  justify-content space-around
  .username
    font-weight 600
    font-size 18px
    color $base
  .account
    font-size 14px
    color $secondary
.btn
  color white
  background-color $primary
  border-radius 20px
  height 40px
  width 150px
  line-height 40px
  font-size 16px
.delete
  background-color $danger
.container
  background-color $background
  height 100vh
  overflow scroll
.card
  border-top 1px solid $border-light
  border-bottom 1px solid $border-light
  background-color white
  margin-bottom -1px
  .item
    display flex
    width 100vw
    padding 10px 20px
    border-bottom 1px solid $border-base
    font-size 16px
    .key
      width 60vw
      font-weight 500
      color $base
      box-sizing border-box
    .value
      width 40vw
      font-weight 400
      color $regular
      box-sizing border-box
.avatar
  padding 10px
.revise
  padding-top 20px
  display flex
  flex-direction column
  justify-content space-around
  height 100px
</style>
