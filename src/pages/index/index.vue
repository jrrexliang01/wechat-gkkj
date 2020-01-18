<template>
  <div class="chatting">
    <div v-if="allConversation.length === 0" class="empty">
      <view class="z-margin-top-100-px">
        <div class="z-padding-h-10-px ub-flex-1 ub-box ub-col">
          <p class="ub-flex-1 ub-box ub-ver ub-between">
            <span class="z-width-100-percent z-font-size-15 z-lineHeight-26">暂无消息</span>
          </p>
        </div>
      </view>
    </div>
    <div class="chat" v-for="item in allConversation" :key="item.conversationID">
      <i-modal title="确认删除会话？" :visible="modalVisible" @ok="handleConfirm()" @cancel="handleModalShow">
      </i-modal>
      <div @longpress="longTimePress(item)">
        <i-row v-if="item.type === 'C2C'"
               @click="checkoutConversation(item, item.userProfile.nick || item.userProfile.userID)" slot="content">
          <i-col span="4">
            <div class="avatar">
              <i-avatar :src="item.userProfile.avatar || '/static/images/header.png'" size="large" shape="square"/>
            </div>
          </i-col>
          <i-col span="20">
            <div class="right">
              <div class="information">
                <div class="username">{{item.userProfile.nick || item.userProfile.userID}}</div>
                <div class="last">{{item.lastMessage._lastTime}}</div>
              </div>
              <div class="information">
                <div class="content">{{item.lastMessage.messageForShow}}</div>
                <div class="remain" v-if="item.unreadCount > 0">{{item.unreadCount}}</div>
              </div>
            </div>
          </i-col>
        </i-row>
      </div>
    </div>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="消息"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="science" icon="document" current-icon="document_fill" title="科普"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {throttle} from '../../utils/index'
  import {switchUserTab} from '../../utils/common'

  export default {
    data () {
      return {
        modalVisible: false,
        conversation: {},
        current: 'chat'
      }
    },
    computed: {
      ...mapState({
        allConversation: state => {
          let docList = wx.getStorageSync('allDocList')
          for (let j = 0; j < state.conversation.allConversation.length; j++) {
            for (let i = 0; i < docList.length; i++) {
              if (state.conversation.allConversation[j].userProfile.userID === docList[i].openId) {
                state.conversation.allConversation[j].userProfile.nick = docList[i].docName
                state.conversation.allConversation[j].userProfile.avatar = docList[i].icon
              }
            }
          }
          return state.conversation.allConversation
        }
      })
    },
    // 消息列表下拉
    onPullDownRefresh () {
      throttle(wx.$app.getConversationList(), 1000)
      wx.stopPullDownRefresh()
    },
    methods: {
      longTimePress (item) {
        this.conversation = item
        this.handleModalShow()
      },
      handleChange (detail) {
        switchUserTab(this.current, detail)
      },
      handleModalShow () {
        this.modalVisible = !this.modalVisible
      },
      handleConfirm () {
        this.handleModalShow()
        this.deleteConversation(this.conversation)
      },
      // 将某会话设为已读
      setMessageRead (item) {
        if (item.unreadCount === 0) {
          return
        }
        wx.$app.setMessageRead({
          conversationID: item.conversationID
        })
      },
      // 点击某会话
      checkoutConversation (item, name) {
        if (item.lastMessage.at) {
          this.$store.commit('offAtRemind', item)
        }
        this.$store.commit('resetCurrentConversation')
        this.$store.commit('resetGroup')
        this.setMessageRead(item)
        wx.$app.getConversationProfile(item.conversationID)
          .then((res) => {
            this.$store.commit('updateCurrentConversation', res.data.conversation)
            this.$store.dispatch('getMessageList')
            if (item.type === this.TIM.TYPES.CONV_GROUP) {
              let groupID = item.conversationID.substring(5)
              wx.$app.getGroupProfile({groupID: groupID})
                .then(res => {
                  this.$store.commit('updateCurrentGroupProfile', res.data.group)
                })
            }
          })
        let url = `../chat/main?toAccount=${name}`
        wx.navigateTo({url})
      },
      // 点击系统通知时，处理notification
      checkoutNotification (item) {
        this.$store.commit('resetCurrentConversation')
        this.$store.commit('resetGroup')
        this.setMessageRead(item)
        wx.$app.getConversationProfile(item.conversationID)
          .then((res) => {
            this.$store.commit('updateCurrentConversation', res.data.conversation)
            this.$store.dispatch('getMessageList')
          })
        let url = '../system/main'
        wx.redirectTo({url})
      },
      // 删除会话
      deleteConversation (item) {
        wx.$app.deleteConversation(item.conversationID).then((res) => {
        })
      },
      empty () {
        let url = '../friend/main'
        wx.redirectTo({url})
      }
    },
    // 初始化加载userProfile并且存入store
    onLoad () {
      wx.$app.getMyProfile().then(res => {
        this.$store.commit('updateMyInfo', res.data)
      })
      wx.$app.getBlacklist().then(res => {
        this.$store.commit('setBlacklist', res.data)
      })
    },
    onShow () {
      this.current = 'chat'
    }
  }
</script>

<style lang='stylus' scoped>
  .empty
    display flex
    align-content center
    justify-content center

    .empty-button
      color white
      margin-top 40vh
      background-color $primary
      border-radius 8px
      line-height 30px
      font-size 16px
      width 50vw

  .input
    text-align center
    height 32px
    background-color white
    border-radius 8px
    font-size 16px

  .avatar
    padding-right 10px

  .chatting
    background-color $dark-background
    min-height 100vh
    box-sizing border-box
    border-bottom 1px solid $border-base

  .chat
    background-color white
    margin-bottom -1px
    padding 15px 20px
    border-top 1px solid $border-base
    border-bottom 1px solid $border-base

  .right
    padding 0 18px 0 8px

  .information
    display flex
    flex-direction row
    justify-content space-between

  .username
    color $base
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    width 50%

  .last
    color $regular
    font-size 12px
    padding 2px 0

  .content
    color $regular
    font-size 12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    width 80%

  .content-red
    color $danger
    font-size 12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    width 80%

  .remain
    color white
    font-size 12px
    background-color $danger
    border-radius 8px
    padding 2px 8px

  .delete
    color white
    font-size 14px
    font-weight 600
    background-color $danger
    height 100%
    display flex
    flex-direction column
    justify-content center

  .delete-button
    text-align center

  .bottom
    position fixed
</style>
