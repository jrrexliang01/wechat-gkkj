<template>
  <div class="chat"
       id="chat"
       :style="{ paddingBottom: isIpx ? (safeBottom + 40) + 'px': '40px' }"
       @longpress="handleLongPress"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd">
    <div class="nav" @click="toDetail">
      查看资料
    </div>
    <div :class="isRecording ? '' : 'modal-display'" class="record-modal">
      <div class="wrapper">
        <div class="modal-loading"></div>
      </div>
      <div class="modal-title">
        {{title}}
      </div>
    </div>
    <i-modal title="确认下载？" :visible="modalVisible" @ok="download" @cancel="handleModalShow">
      <div class="input-wrapper">
        进度{{percent}}%
      </div>
    </i-modal>
    <i-modal title="发送自定义消息" i-class="custom-modal" :visible="customModalVisible" @ok="sendCustomMessage" @cancel="customModal">
      <div class="custom-wrapper">
        <input type="text" class="custom-input" placeholder="输入数据" v-model.lazy:value="customData"/>
        <input type="text" class="custom-input" placeholder="输入描述" v-model.lazy:value="customDescription"/>
        <input type="text" class="custom-input" placeholder="输入其他" v-model.lazy:value="customExtension"/>
      </div>
    </i-modal>
    <i-modal title="对医生的评分" i-class="custom-modal" :visible="rateModal" @ok="sendSurvey" @cancel="rateModal = false">
      <div class="custom-wrapper">
        <i-rate
          @change="onChange"
          :value="rate">
        </i-rate>
<!--        <input type="text" class="custom-input" placeholder="输入评价" v-model.lazy:value="customExtension"/>-->
      </div>
    </i-modal>
    <div id="list" @click="loseFocus">
      <li v-for="(message, index) in currentMessageList" :key="message.ID" :id="message.ID">
<!--        系统消息-->
        <div class="notice" v-if="message.type === 'TIMGroupTipElem' || message.type === 'TIMGroupSystemNoticeElem'" >
          <div class="content">
            <span v-for="(div, index1) in message.virtualDom" :key="message.ID + index1">
              <span v-if="div.name === 'groupTip' || 'system'">{{div.text}}</span>
            </span>
          </div>
        </div>
<!--        非系统消息-->
        <div v-else :class="(message.flow === 'out') ? 'item-right' : 'item-left'">
          <div class="load" @click="handleResend(message)">
            <div :class="message.status">
            </div>
          </div>
          <div class="content">
            <div class="name">
<!--              {{message.nick || message.from}}-->
            </div>
            <div class="message" v-if="message.type === 'TIMTextElem'">
              <div class="text-message">
                <span v-for="(div, index2) in message.virtualDom" :key="message.ID + index2">
                  <span v-if="div.name === 'span'">{{div.text}}</span>
                  <image v-if="div.name === 'img'" :src="div.src" style="width:20px;height:20px;"/>
                </span>
              </div>
            </div>
            <div class="message" v-else-if="message.type === 'TIMImageElem'" @click="previewImage(message.payload.imageInfoArray[1].url)">
              <image class="img" :src="message.payload.imageInfoArray[1].url" mode='aspectFit' style="max-width:200px;height:150px" />
            </div>
            <div class="message" v-else-if="message.type === 'TIMFileElem'">
              <div class="file" @click="handleDownload(message.payload)">
                <i-avatar src="../../../static/images/file.png" size="large" shape="square"/>
                <div>{{message.payload.fileName}}</div>
              </div>
            </div>
            <div class="message" v-else-if="message.type === 'TIMCustomElem'">
              <div v-if="message.payload.data === 'survey'" class="survey">
                <div class="title">
                  对IM DEMO的评分和建议
                </div>
                <div class="description">
                  <i-rate
                    disabled="true"
                    :value="message.payload.description">
                  </i-rate>
                </div>
                <div class="suggestion">
                  <div>{{message.payload.extension}}</div>
                </div>
              </div>
              <div v-else-if="message.payload.data === 'group_create'">
                <div>{{message.payload.extension}}</div>
              </div>
              <div v-else class="custom-elem">这是自定义消息</div>
            </div>
            <div class="message" v-else-if="message.type === 'TIMSoundElem'" :url="message.payload.url">
              <div class="box" @click="openAudio(message.payload)">
                <image src="/static/images/audio.png" style="height:20px;width:14px"/>
                <div style="padding-left: 10px">{{message.payload.second}}s</div>
              </div>
            </div>
            <div class="message" v-else-if="message.type === 'TIMFaceElem'">
              <div class="custom-elem">
                <image :src="'https://webim-1252463788.file.myqcloud.com/assets/face-elem/' + message.payload.data + '.png'" style="height:90px; width:90px"/>
              </div>
            </div>
            <div class="message" v-else-if="message.type === 'TIMVideoFileElem'">
              <video :src="message.payload.videoUrl" class="video" :poster="message.payload.thumbUrl" object-fit="contain" @error="videoError"></video>
            </div>
          </div>
          <div class="avatar">
            <i-avatar :src="message.avatar || '../../../static/images/header.png'" shape="square"/>
          </div>
        </div>
      </li>
    </div>
<!--    输入框及选择框部分-->
    <div class="bottom" :style="{ paddingBottom: isIpx ? safeBottom + 'px': '' }">
      <div class="bottom-div">
        <div class="btn" @click="chooseRecord">
          <image src="/static/images/record.png" class="btn-small"/>
        </div>
        <div v-if="!isRecord" style="width: 80%">
          <input type="text"
                 class="input"
                 v-model.lazy:value="messageContent"
                 confirm-type="send"
                 :focus="isFocus"
                 @confirm='sendMessage'/>
        </div>
        <div class="record"
             id="record"
            v-if="isRecord">
          <template v-if="!isRecording">
            长按进行录音
          </template>
          <template v-if="isRecording">
            抬起停止录音
          </template>
        </div>

        <div class="btn" @click="handleEmoji()">
          <image src="/static/images/emoji.png" class="btn-small"/>
        </div>
        <div class="btn" @click="handleMore()">
          <image src="/static/images/plus.png" class="btn-small"/>
        </div>
      </div>
<!--    emoji部分-->
      <div class="bottom-emoji" v-if="isEmojiOpen">
        <div class="emojis">
          <div v-for="(emojiItem, index3) in emojiName" class="emoji" :key="emojiItem" @click="chooseEmoji(emojiItem)">
            <image :src="emojiUrl + emojiMap[emojiItem]" style="width:25px;height:25px"/>
          </div>
        </div>
        <div class="emoji-tab">
          <i-row>
            <i-col span="21">
              <div style="line-height: 26px">
                😄
              </div>
            </i-col>
            <i-col span="3">
              <div class="sending" @click="sendMessage()">发送</div>
            </i-col>
          </i-row>
        </div>
      </div>
<!--    更多部分-->
      <div class="bottom-image" v-if="isMoreOpen">
        <div class="images">
          <div class="block" @click="sendPhoto('album')">
            <div class="image">
              <image src="/static/images/image.png" class="icon"/>
            </div>
            <div class="name">
              图片
            </div>
          </div>
          <div class="block" @click="sendPhoto('camera')">
            <div class="image">
              <image src="/static/images/photo.png" class="icon"/>
            </div>
            <div class="name">
              拍照
            </div>
          </div>
          <div class="block" @click="rateModal = true">
            <div class="image">
              <image src="/static/images/dice.png" class="icon"/>
            </div>
            <div class="name">
              点赞
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emojiName, emojiMap, emojiUrl } from '../../utils/emojiMap'
import { throttle } from '../../utils/index'
const audioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
const recordOptions = {
  duration: 60000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
}
export default {
  data () {
    return {
      messageContent: '',
      conversation: {},
      messageKey: '',
      lastMsgTime: '',
      count: 15,
      isEmojiOpen: false,
      isMoreOpen: false,
      isFocus: false,
      isGroup: false,
      messageList: [],
      emojiName: emojiName,
      emojiMap: emojiMap,
      emojiUrl: emojiUrl,
      height: 0,
      modalVisible: false,
      downloadInfo: {},
      percent: 0,
      sysInfo: {},
      customModalVisible: false,
      customData: '',
      customDescription: '',
      customExtension: '',
      safeBottom: 34,
      isIpx: false,
      isRecord: false,
      isRecording: false,
      canSend: true,
      startPoint: 0,
      title: '正在录音',
      rateModal: false,
      rate: 1,
      isShow: false
    }
  },
  onShow () {
    this.isShow = true
  },
  onLoad (options) {
    this.set = options.toAccount
    // 设置header——聊天对象昵称或群名
    wx.setNavigationBarTitle({
      title: '医生咨询'
    })
    let sysInfo = wx.getSystemInfoSync()
    this.sysInfo = sysInfo
    this.height = sysInfo.windowHeight
    this.isIpx = (sysInfo.model.indexOf('iPhone X') > -1)
    let query = wx.createSelectorQuery()
    let that = this
    wx.$app.on(this.TIM.EVENT.MESSAGE_RECEIVED, () => {
      query.select('#chat').boundingClientRect(function (res) {
        if (res.bottom - that.height < 150) {
          that.scrollToBottom()
        }
      }).exec()
    })
    let interval = setInterval(() => {
      if (this.currentMessageList.length !== 0) {
        this.scrollToBottom()
        clearInterval(interval)
      }
    }, 600)
    this.$bus.$off('atUser')
    this.$bus.$on('atUser', (user) => {
      this.messageContent += user.userID
      this.messageContent += ' '
    })
    recorderManager.onStart(() => {
    })
    recorderManager.onPause(() => {
    })
    recorderManager.onStop((res) => {
      wx.hideLoading()
      if (this.canSend) {
        if (res.duration < 1000) {
          this.$store.commit('showToast', {
            title: '录音时间太短'
          })
        } else {
          const message = wx.$app.createAudioMessage({
            to: this.$store.getters.toAccount,
            conversationType: this.$store.getters.currentConversationType,
            payload: {
              file: res
            }
          })
          this.$store.commit('sendMessage', message)
          wx.$app.sendMessage(message)
        }
      }
    })
  },
  // 退出聊天页面的时候所有状态清空
  onUnload () {
    wx.$app.setMessageRead({conversationID: this.$store.state.conversation.currentConversationID})
    this.isEmojiOpen = false
    this.rateModal = false
    this.isMoreOpen = false
    this.messageContent = ''
    this.isShow = false
  },
  onPullDownRefresh () {
    throttle(this.getMessageList, 1000)()
  },
  computed: {
    ...mapState({
      currentMessageList: state => {
        return state.conversation.currentMessageList
      }
    })
  },
  methods: {
    onChange (e) {
      this.rate = e.mp.detail.index
    },
    handleLongPress (e) {
      this.startPoint = e.touches[0]
      if (e.target.id === 'record') {
        this.title = '正在录音'
        this.isRecording = true
        this.startRecording()
        this.canSend = true
      }
    },
    chooseRecord () {
      this.isRecord = !this.isRecord
    },
    handleTouchMove (e) {
      if (this.isRecording) {
        if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 100) {
          this.title = '松开手指，取消发送'
          this.canSend = false
        } else if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 20) {
          this.title = '上划可取消'
          this.canSend = true
        } else {
          this.title = '正在录音'
          this.canSend = true
        }
      }
    },
    handleTouchEnd () {
      this.isRecording = false
      wx.hideLoading()
      recorderManager.stop()
    },
    startRecording () {
      wx.getSetting({
        success: (res) => {
          let auth = res.authSetting['scope.record']
          if (auth === false) { // 已申请过授权，但是用户拒绝
            wx.openSetting({
              success: function (res) {
                let auth = res.authSetting['scope.record']
                if (auth === true) {
                  wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 1500
                  })
                } else {
                  wx.showToast({
                    title: '授权失败',
                    icon: 'none',
                    duration: 1500
                  })
                }
              }
            })
          } else if (auth === true) { // 用户已经同意授权
            this.isRecording = true
            recorderManager.start(recordOptions)
          } else { // 第一次进来，未发起授权
            wx.authorize({
              scope: 'scope.record',
              success: () => {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    // 滚动到列表bottom
    scrollToBottom () {
      if (this.isShow) {
        wx.pageScrollTo({
          scrollTop: 99999
        })
      }
    },
    customModal () {
      this.customModalVisible = !this.customModalVisible
    },
    sendCustomMessage () {
      if (this.customData.length === 0 && this.customDescription.length === 0 && this.customExtension.length === 0) {
        this.$store.commit('showToast', {
          title: '不能为空'
        })
        return
      }
      const message = wx.$app.createCustomMessage({
        to: this.$store.getters.toAccount,
        conversationType: this.$store.getters.currentConversationType,
        payload: {
          data: this.customData,
          description: this.customDescription,
          extension: this.customExtension
        }
      })
      this.$store.commit('sendMessage', message)
      wx.$app.sendMessage(message)
      this.customModal()
      this.customData = ''
      this.customDescription = ''
      this.customExtension = ''
    },
    // 失去焦点
    loseFocus () {
      this.handleClose()
    },
    // 下载文件模态框
    handleModalShow () {
      this.modalVisible = !this.modalVisible
    },
    handleDownload (message) {
      this.percent = 0
      this.downloadInfo = message
      this.handleModalShow()
    },
    download () {
      let that = this
      let downloadTask = wx.downloadFile({
        url: that.downloadInfo.fileUrl,
        success: function (res) {
        },
        fail: function ({errMsg}) {
          that.$store.commit('showToast', {
            title: '文件下载出错',
            icon: 'none',
            duration: 1500
          })
          that.handleModalShow()
        },
        complete: function (res) {
          downloadTask = null
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function (res) {
              that.$store.commit('showToast', {
                title: '打开文档成功',
                icon: 'none',
                duration: 1000
              })
              that.percent = 0
              that.handleModalShow()
            },
            fail: function () {
              that.$store.commit('showToast', {
                title: '小程序不支持该文件预览哦',
                icon: 'none',
                duration: 2000
              })
              that.handleModalShow()
            }
          })
        }
      })
      downloadTask.onProgressUpdate((res) => {
        that.percent = res.progress
      })
    },
    // 群简介或者人简介
    toDetail () {
      let conversationID = this.$store.state.conversation.currentConversationID
      this.isGroup = (conversationID.indexOf(this.TIM.TYPES.CONV_GROUP) === 0)
      if (!this.isGroup) {
        let id = conversationID.substring(3)
        let option = {
          userIDList: [id]
        }
        wx.$app.getUserProfile(option).then(res => {
          let userProfile = res.data[0]
          switch (userProfile.gender) {
            case this.TIM.TYPES.GENDER_UNKNOWN:
              userProfile.gender = this.$type.GENDER_UNKNOWN
              break
            case this.TIM.TYPES.GENDER_MALE:
              userProfile.gender = this.$type.GENDER_MALE
              break
            case this.TIM.TYPES.GENDER_FEMALE:
              userProfile.gender = this.$type.GENDER_FEMALE
              break
          }
          this.$store.commit('updateUserProfile', userProfile)
          let url = '../detail/main'
          wx.navigateTo({ url: url })
        })
      } else {
        let url = '../groupDetail/main'
        wx.navigateTo({ url: url })
      }
    },
    // 获取消息
    getMessageList () {
      this.$store.dispatch('getMessageList')
      wx.stopPullDownRefresh()
    },
    // 处理emoji选项卡
    handleEmoji () {
      if (this.isFocus) {
        this.isFocus = false
        this.isEmojiOpen = true
      } else {
        this.isEmojiOpen = !this.isEmojiOpen
        this.isMoreOpen = false
      }
    },
    // 处理更多选项卡
    handleMore () {
      if (this.isFocus) {
        this.isFocus = false
        this.isMoreOpen = true
      } else {
        this.isMoreOpen = !this.isMoreOpen
        this.isEmojiOpen = false
      }
    },
    // 选项卡关闭
    handleClose () {
      this.rateModal = false
      this.isFocus = false
      this.isMoreOpen = false
      this.isEmojiOpen = false
    },
    isnull (content) {
      if (content === '') {
        return true
      }
      const reg = '^[ ]+$'
      const re = new RegExp(reg)
      return re.test(content)
    },
    // 发送text message 包含 emoji
    sendMessage () {
      if (!this.isnull(this.messageContent)) {
        const message = wx.$app.createTextMessage({
          to: this.$store.getters.toAccount,
          conversationType: this.$store.getters.currentConversationType,
          payload: { text: this.messageContent }
        })
        let index = this.$store.state.conversation.currentMessageList.length
        this.$store.commit('sendMessage', message)
        wx.$app.sendMessage(message).catch(() => {
          this.$store.commit('changeMessageStatus', index)
        })
        this.messageContent = ''
      } else {
        this.$store.commit('showToast', { title: '消息不能为空' })
      }
      this.isFocus = false
      this.isEmojiOpen = false
      this.isMoreOpen = false
    },
    sendPhoto (name) {
      let self = this
      if (name === 'album') {
        this.chooseImage(name)
      } else if (name === 'camera') {
        wx.getSetting({
          success: function (res) {
            if (!res.authSetting['scope.camera']) { // 无权限，跳转设置权限页面
              wx.authorize({
                scope: 'scope.camera',
                success: function () {
                  self.chooseImage(name)
                }
              })
            } else {
              self.chooseImage(name)
            }
          }
        })
      }
    },
    videoError (e) {
      this.$store.commit('showToast', {
        title: `视频出现错误，错误信息${e.mp.detail.errMsg}`,
        duration: 1500
      })
    },
    chooseImage (name) {
      let self = this
      let message = {}
      wx.chooseImage({
        sourceType: [name],
        count: 1,
        success: function (res) {
          message = wx.$app.createImageMessage({
            to: self.$store.getters.toAccount,
            conversationType: self.$store.getters.currentConversationType,
            payload: {
              file: res
            },
            onProgress: percent => {
              self.percent = percent
            }
          })
          self.$store.commit('sendMessage', message)
          wx.$app.sendMessage(message).then(() => {
            self.percent = 0
          })
        }
      })
      this.handleClose()
    },
    previewImage (src) {
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src]
      })
    },
    // 发消息选中emoji
    chooseEmoji (item) {
      this.messageContent += item
    },
    // 重发消息
    handleResend (message) {
      if (message.status === 'fail') {
        wx.$app.resendMessage(message)
      }
    },
    sendSurvey () {
      if (this.customExtension) {
        const message = wx.$app.createCustomMessage({
          to: this.$store.getters.toAccount,
          conversationType: this.$store.getters.currentConversationType,
          payload: {
            data: 'survey',
            description: String(this.rate),
            extension: this.customExtension
          }
        })
        this.rate = 0
        this.customExtension = ''
        this.$store.commit('sendMessage', message)
        wx.$app.sendMessage(message)
        this.handleClose()
      } else {
        this.$store.commit('showToast', {
          title: '建议不要为空哦！'
        })
      }
    },
    // 播放音频
    openAudio (audio) {
      let that = this
      audioContext.src = audio.url
      audioContext.play()
      audioContext.onPlay(() => {
      })
      audioContext.onEnded(() => {
        wx.hideToast()
      })
      audioContext.onError(() => {
        that.$store.commit('showToast', {
          title: '小程序暂不支持播放该音频格式',
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-wrapper
  width 100%
  display flex
  flex-direction column
  justify-content center
  .custom-input
    border 1px solid $border-light
    color $base
    background-color white
    border-radius 8px
    height 30px
    margin 5px 0
    box-sizing border-box
.nav
  position fixed
  top 0
  left 0
  height 30px
  background-color $primary
  font-size 14px
  color white
  line-height 30px
  padding-left 20px
  width 100vw
  z-index 999
.loadMore
  font-size 14px
  color #8a8a8a
  box-sizing border-box
  width 100%
  padding 15px
  display flex
  justify-content center
.unload
  font-size 0
  color #fff
  box-sizing border-box
  width 100%
  text-align center
.emoji-open
  height calc(100vh - 262px)
.emoji-close
  height calc(100vh - 82px)
.custom-modal > view
  height 500px
.chat
  background-color white
  padding-top 40px
  box-sizing border-box
.file
  display flex
  text-align left
  width fit-content
  word-break break-all
  font-size 14px
  background-color white
  padding 10px 8px
.bottom
  background-color white
  position fixed
  bottom 0
  left 0
  width 100%
.bottom-div
  display flex
  width 100%
  background-color white
  border-top 1px solid $border-base
  padding-top 4px
  padding-left 10px
  direction row
  box-sizing border-box
.bottom-emoji
  .emojis
    height 150px
    border-bottom 1px solid $border-base
    display flex
    flex-direction column
    flex-wrap wrap
    overflow-x scroll
    .emoji
      height 30px
      width 30px
      padding 2px 3px 3px 2px
      box-sizing border-box
  .emoji-tab
    height 30px
    box-sizing border-box
    background-color $dark-background
.bottom-image
  height 180px
  border-bottom 1px solid $border-base
  box-sizing border-box
  background-color $dark-background
  .images
    height 90px
    box-sizing border-box
    display flex
    flex-direction row
    .block
      width 25vw
      padding 10px 5vw
      box-sizing border-box
      height 90px
      display flex
      flex-direction column
      .name
        font-size 12px
        color $secondary
        text-align center
      .image
        width 15vw
        height 15vw
        box-sizing border-box
        border-radius 8px
        background-color white
        padding 3vw
        .icon
          width 9vw
          height 9vw
.input
  border 1px solid $border-light
  background-color white
  border-radius 8px
  height 30px
  margin-right 10px
  box-sizing border-box
.btn
  padding 0
  margin 0
  margin-right 10px
.sending
  background-color $primary
  color white
  display flex
  justify-content center
  line-height 26px
  font-size 14px
  font-weight 600
  border-radius 8px
  margin-right 4px
.button
  color white
  background-color $primary
  border-radius 8px
  height 26px
  padding 0 6px
  line-height 26px
  font-size 16px
// 添加用户当弹窗
.input-wrapper
  width 100%
  display flex
  justify-content center
li
  padding 0 20px
.fail::before
  padding 2px 8px
  background-color $danger
  color white
  content '!'
  font-size 12px
  border-radius 50%
  cursor pointer
.fail
  background-color transparent
.unSend
  width 12px
  height 12px
  border 4px solid $light-primary
  border-bottom $border-base 4px solid
  border-radius 50%
  -webkit-animation load 1.1s infinite linear
.btn-small
  width 30px
  height 30px
@-webkit-keyframes load
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
.notice
  display flex
  justify-content center
  margin-bottom 10px
  .content
    background-color $background
    border-radius 8px
    font-size 14px
    color $regular
    padding 6px 8px
.message
  text-align left
  width fit-content
  word-break break-all
  font-size 14px
  background-color $dark-background
  margin-top 2px
  margin-bottom 10px
  padding 10px 15px
.text-message
  display flex
  flex-direction row
  flex-wrap wrap
  white-space pre-wrap
.custom-elem
  background-color white
  color $dark-primary
.item-right
  display flex
  flex-direction row
  justify-content flex-end
  .load
    height 100%
    display flex
    padding-top 8px
    padding-right 10px
  .content
    margin-right 10px
    .name
      display none
    .message
      background-color $light-primary
      border-radius 20px / 20px 0px 20px 20px
.survey
  padding 20px
  background-color white
  .title
    font-size 16px
    font-weight 600
  .rate
    display flex
    flex-direction flex-start
    align-content center
    .star
      width 30px
      height 30px
    .rating
      font-weight 600
      color $regular
      line-height 30px
      padding-left 10px
  .suggestion
    padding-top 10px
    font-size 14px
    color $black
    font-weight 500
  .description
    font-size 18px
    color $black
.video
  max-height 200px
  max-width 50vw
.item-left
  display flex
  flex-direction row-reverse
  justify-content flex-end
  .load
    display none
  .content
    margin-left 10px
    .name
      width 100%
      font-size 12px
      height 18px
      line-height 18px
      color $regular
    .message
      background-color $background
      border-radius 20px / 0px 20px 20px
// 音频解析
.box
  display flex
  height 20px
  line-height 20px
.record
  margin-right 10px
  width 100%
  border 1px solid $border-base
  color $secondary
  border-radius 8px
  box-sizing border-box
  height 30px
  line-height 30px
  display flex
  justify-content center
.record-modal
  height 150px
  width 60vw
  background-color black
  opacity 0.8
  position fixed
  top 200px
  z-index 9999
  left 20vw
  border-radius 12px
  display flex
  flex-direction column
  .wrapper
    display flex
    height 100px
    box-sizing border-box
    padding 10vw
    .modal-loading
      opacity 1
      width 20px
      height 8px
      border-radius: 2px
      background-color $primary
      animation loading 2s cubic-bezier(.17,.37,.43,.67) infinite
  .modal-title
    text-align center
    color white
@-webkit-keyframes loading
  0%
    transform translate(0,0)
  50%
    transform translate(30vw,0)
    background-color #f5634a
    width 40px
  100%
    transform translate(0,0)
.modal-display
  display none
</style>
