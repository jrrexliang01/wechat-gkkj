<template>
  <div class="bg">
    <div class="card">
      <i-row>
        <i-col span="8">
          <div class="avatar">
            <image v-if="userDetail.userType == 1" style="width: 80px; height: 80px; border-radius: 8px" :src="userDetail.doc.icon" />
            <image v-if="userDetail.userType == 2" style="width: 80px; height: 80px; border-radius: 8px" :src="userDetail.patient.icon" />
          </div>
        </i-col>
        <i-col span="16">
          <div v-if="userDetail.userType == 1" class="right">
            <div class="username">{{userDetail.doc.docName}}</div>
          </div>
          <div v-if="userDetail.userType == 2" class="right">
            <div class="username">{{userDetail.patient.patientName}}</div>
          </div>
        </i-col>
      </i-row>
    </div>
    <div v-if="userDetail.userType == 1" class="card" style="margin-top:20px">
      <div class="item">
        <div class="key">姓名</div>
        <div clasa="value">{{userDetail.doc.docName}}</div>
      </div>
      <div class="item">
        <div class="key">职称</div>
        <div class="value">{{userDetail.doc.title}}</div>
      </div>
      <div class="item">
        <div class="key">医院</div>
        <div class="value">{{userDetail.doc.hospitals.hospitalName}}</div>
      </div>
      <div class="item">
        <div class="key">科室</div>
        <div class="value">{{userDetail.doc.hospitals.department}}</div>
      </div>
    </div>
    <div v-if="userDetail.userType == 2" class="card" style="margin-top:20px">
      <div class="item">
        <div class="key">姓名</div>
        <div clasa="value">{{userDetail.patient.patientName}}</div>
      </div>
      <div class="item">
        <div class="key">年龄</div>
        <div class="value">{{userDetail.patient.age}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserByOpenId } from '../../../config'
export default {
  data () {
    return {
      userProfile: {},
      userDetail: {}
    }
  },
  // 退出聊天页面的时候所有状态清空
  onUnload () {
    this.userProfile = {}
  },
  async onLoad () {
    this.userProfile = this.$store.state.user.userProfile
    const { userDetail } = await getUserByOpenId(this.userProfile.userID)
    console.log(userDetail.data.data)
    wx.setStorageSync('userDetail', userDetail.data.data)
    this.userDetail = wx.getStorageSync('userDetail')
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
