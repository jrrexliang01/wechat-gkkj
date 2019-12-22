<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="ub-box ub-col">
        <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
          <image @click.stop="previewImage([indexImg])" class="z-width-100-percent z-img-cover indexImg"
                 :src="indexImg">
            <div class="indexImg-bk ub-box ub-col">
              <span class="z-font-size-18 z-lineHeight-30 z-color-fff z-box-sizing-border z-padding-h-8-px">{{docInfo.docName}}</span>
              <span class="z-font-size-14 z-color-fff z-box-sizing-border z-padding-h-8-px">{{docInfo.hospitals.hospitalName}}</span>
            </div>
          </image>
        </dd>
      </dl>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-ver" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-888">介绍</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>姓名</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{docInfo.docName}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>所属医院</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{docInfo.hospitals.hospitalName}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>职称</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{docInfo.title}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>科室</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{docInfo.department}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-333"><b>状态</b></p>
        <p class="ub-box">
          <span class="z-font-size-14 z-color-333">{{lineStatus[docInfo.onlineStatus]}}</span>
        </p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-ver" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-888">擅长</p>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col">
        <ul class="ub-box ub-col">
          <li class="z-font-size-14 z-color-333 z-box-sizing-border z-lineHeight-24">{{docInfo.subject}}</li>
        </ul>
      </dd>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-ver" style="border-bottom: 1px solid #f5f5f5">
        <p class="z-font-size-14 z-color-888">简介</p>
      </dd>
      <dd
        class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col z-margin-bottom-40-px">
        <ul class="ub-box ub-col">
          <li class="z-font-size-14 z-color-333 z-box-sizing-border z-lineHeight-24">{{docInfo.introduce}}</li>
        </ul>
      </dd>
    </scroll-view>
    <!--fixed部分-->
    <ul class="fixCon ub-box ub-ver ub-between">
      <li v-if="docInfo.expertEducation===true" @click.stop="addStudy(docInfo.id)"
          class="courseBtn ub-box ub-ver z-font-size-16 z-color-000">专家带教
      </li>
      <li v-if="docInfo.expertLecture===true" @click.stop="$openWin('/pages/doc/lecture/main')"
          class="submitBtn ub-box ub-ver z-font-size-16 z-color-fff">申请讲座
      </li>
    </ul>
  </div>
</template>

<script>
  import {getDocInfo, studyAdd} from '../../../config'

  export default {
    data () {
      return {
        indexImg: '',
        docId: 0,
        docInfo: {
          docName: '',
          hospitals: {
            hospitalName: ''
          },
          subject: '',
          title: '',
          department: '',
          introduce: '',
          onlineStatus: ''
        },
        studyInfo: {
          teacher: {
            id: 0
          },
          student: {
            id: 0
          }
        },
        lineStatus: {
          '1': '在线',
          '2': '离线'
        }
      }
    },
    async onLoad (options) {
      const {docInfo} = await getDocInfo(parseInt(options.docId))
      this.docInfo = docInfo
    },
    mounted () {
      let banner = wx.getStorageSync('enclosureList')
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'doc_default') {
          this.indexImg = banner.data[i].enclosurePath
        }
      }
    },
    methods: {
      async addStudy (id) {
        let userInfo = wx.getStorageSync('userInfo')
        this.studyInfo.student.id = userInfo.id
        this.studyInfo.teacher.id = id
        await studyAdd(JSON.stringify(this.studyInfo)).then(
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 2000
          })
        )
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #e8e8e8
  }

  .indexImg {
    height: 170px;
    position: relative;
  }

  .indexImg-bk {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 30%;
    background: rgba(0, 0, 0, .3);
    padding: 5px 0px
  }

  .buyBtn {
    background: #f90;
    padding: 8px 12px;
    border-radius: 3px
  }

  .label {
    border-radius: 3px;
    background: #fff;
    padding: 3px 5px;
    margin: 0 5px 5px 0
  }

  .fixCon {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #fff;
  }

  .courseBtn {
    padding: 15px 20%;
    background: #ffffff;
    box-sizing: border-box;
  }

  .submitBtn {
    padding: 15px 20%;
    background: #5CA2F2;
    box-sizing: border-box;
  }
</style>
