<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height: 100vh" scroll-top="0">
      <dl class="ub-box ub-col">
        <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
          <image @click.stop="previewImage([indexImg])" class="z-width-100-percent z-img-cover indexImg" :src="indexImg">
            <div class="indexImg-bk ub-box ub-col">
              <span class="z-font-size-18 z-lineHeight-30 z-color-fff z-box-sizing-border z-padding-h-8-px">{{docInfo.docName}}</span>
              <span class="z-font-size-14 z-color-fff z-box-sizing-border z-padding-h-8-px">{{docInfo.hospitals.hospitalName}}</span>
            </div>
          </image>
        </dd>
      </dl>
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="border-bottom: 1px solid #f5f5f5">
        <p class="ub-box ub-ver">
          <span class="z-font-size-24 z-margin-right-5-px" style="color:#06c1ae">¥{{docInfo.price}}</span>
          <span class="z-font-size-13 z-color-888"></span>
        </p>
        <p class="ub-box ub-ver">
				<span @click.stop="toGoods (docInfo.id) " class="buyBtn ub-box ub-ver z-font-size-16 z-color-fff">
					立即咨询
				</span>
        </p>
      </dd>
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
          <span class="z-font-size-14 z-color-333">{{docInfo.onlineStatus}}</span>
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
      <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-col">
        <ul class="ub-box ub-col">
          <li class="z-font-size-14 z-color-333 z-box-sizing-border z-lineHeight-24">{{docInfo.introduce}}</li>
        </ul>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
import { getDocInfo } from '../../config'
export default {
  data () {
    return {
      indexImg: 'http://p0.meituan.net/deal/522fd16a9b25479496188b59476d1b941062402.jpg',
      docId: 0,
      docInfo: {
        docName: '',
        hospitals: {
          hospitalName: ''
        },
        subject: '',
        title: '',
        department: '',
        introduce: ''
      }
    }
  },
  async onLoad (options) {
    this.docId = parseInt(options.docId)
    console.log(this.docId)
    const { docInfo } = await getDocInfo(this.docId)
    wx.setStorageSync('docInfo', docInfo)
    this.docInfo = wx.getStorageSync('docInfo')
  },
  methods: {
    toGoods (id) {
      wx.navigateTo({
        url: '/pages/docInfo/main?docId=' + id
      })
    }
  },
  mounted () {
    wx.removeStorage('docInfo')
    console.log(this.docInfo)
    console.log(wx.getStorageSync('userId'))
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
  .buyBtn{background: #f90;padding: 8px 12px;border-radius:3px}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .tuijian{color: #f90;border:1px solid #f90;}
  .butuijian{color: #999;border:1px solid #ddd;}
</style>
