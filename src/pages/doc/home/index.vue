<template>
  <div class="container ub-box ub-col">
    <dl class="ub-box ub-ver z-padding-v-10-px" style="background:#fff;">
      <dd @click.stop="$openWin('/pages/citySelect/main')" class="z-padding-h-10-px ub-box ub-ver">
        <span class="z-font-size-14 z-color-666 z-margin-right-3-px">{{curCity}}</span>
        <i class="iconfont icon-xiangxiazhankai z-color-666 z-font-size-16"></i>
      </dd>
      <dd class="ub-flex-1 ub-box ub-ver">
        <div @click.stop="$openWin('/pages/search/main')" class="search ub-box ub-ver-v z-width-90-percent z-box-sizing-border">
          <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>
          <span class="z-font-size-14 z-color-999 z-margin-left-8-px">请输入疾病、医生名称...</span>
        </div>
      </dd>
    </dl>
    <scroll-view scroll-y style="height: calc(100vh - 50px);" scroll-top="0">
      <div class="ub-box ub-ver z-bg-color-fff">
        <swiper class="swiper" indicator-dots="false" autoplay="false" interval="5000" duration="500">
          <block v-for="(item, idx) in imgUrls" :key="idx">
            <swiper-item>
              <image :src="item" class="z-width-100-percent" mode="widthFix"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
      <!--图标九宫格入口-->
      <dl class="ub-box ub-wrap z-padding-v-5-px" style="background:#fff">
        <div class="icon-item ub-box ub-col ub-ver" :key="key" v-for="(idx, key) in iconMap">
          <dd @click.stop="toChoose(iconMap[key]['title'])" class="icon ub-box ub-ver iconfont" :class="key" :style="{background: iconMap[key]['bk']}"></dd>
          <span class="z-padding-v-8-px z-font-size-12 z-color-333">{{iconMap[key]['title']}}</span>
        </div>
      </dl>
      <!--经验分享-->
      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">
        <p class="z-width-100-percent ub-box ub-ver" style="border-bottom:1px solid #eee">
          <span class="z-font-size-12 z-color-888 z-lineHeight-36">—专业课程—</span>
        </p>
        <dd @click.stop="toCourseInfo(item.id)" v-for="(item,index ) in courseList" :key="item.id" class="order z-width-100-percent z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-17 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{item.courseTitle}}</span>
          </div>
          <img class="z-img-contain" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573711471422&di=925e0c1d65d6df1958bd6bf2dadb21fc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fd5d8822184fb61bd5b16bc940c5b02aa77f9efb426b3f-wrTF8y_fw658" />
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px" style="text-align: right;padding-right: 5px;">{{item.createTime}}</span>
            <!--            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{item.content | ellipsis}}</span>-->
          </div>
        </dd>
      </dl>
      <!--专家带教-->
      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">
        <p class="z-width-100-percent ub-box ub-ver" style="border-bottom:1px solid #eee">
          <span class="z-font-size-12 z-color-888 z-lineHeight-36">—专家列表—</span>
        </p>
        <dd class="ub-box ub-col" style="margin-bottom: 60px;">
          <div v-for="(val, idx) in docList" :key="val.id" :isLast="idx===10">
            <div @click.stop="gotoDetail(val.id)" class="card ub-box z-padding-v-10-px" :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-between ub-flex-1">
                <p class="ub-ver-left">
                  <span class="z-width-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.docName}}</span>
                </p>
                <p class="ub-ver-left">
                  <span class="ub-flex-1 z-textAlign-left z-font-size-12 z-color-888">{{val.title}}</span>
                </p>
                <p class="ub-ver-left">
                  <span class="ub-flex-1 z-textAlign-left z-font-size-12 z-color-888" style="width: 150px;">{{val.hospitals.hospitalName}}</span>
                </p>
              </div>
              <div class="z-padding-h-10-px ub-between ub-flex-1 z-margin-left-30-px" style="text-align: right;">
                <div class="z-font-size-18 z-color-333 ub-box ub-ver-v z-textAlign-right z-margin-bottom-20-px">
                  <div @click.stop="exitLogin()" class="exitBtn ub-box ub-ver z-font-size-14">申请带教</div>
                </div>
                <div class="z-font-size-18 z-color-333 ub-box ub-ver-v z-textAlign-right">
                  <div @click.stop="exitLogin()" class="exitBtn ub-box ub-ver z-font-size-14">申请讲座</div>
                </div>
              </div>
            </div>
          </div>
        </dd>
      </dl>

    </scroll-view>
    <i-tab-bar :current="current" color="#357cfb" @change="handleChange" fixed="true">
      <i-tab-bar-item key="chat" icon="interactive" current-icon="interactive_fill" title="消息"></i-tab-bar-item>
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
  import { getDocList, getCourseList } from '../../../config'
  export default {
    props: ['curGood', 'isLast'],
    computed: {
      curCity () {
        return this.$store.state.curCity
      }
    },
    data () {
      return {
        imgUrls: [
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=62930714,2472250701&fm=26&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=62930714,2472250701&fm=26&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=62930714,2472250701&fm=26&gp=0.jpg'
        ],
        iconMap: {
          'icon-weicheng': {title: '申请讲座', bk: '#5CA2F2'},
          'icon-shoucang': {title: '经验分享', bk: '#E4463B'},
          'icon-yonghu': {title: '专家带教', bk: '#8B67E5'},
          'icon-jisuanqilishuai': {title: '科普知识', bk: '#26e57c'}
        },
        current: 'homepage',
        courseList: {},
        docList: {}
      }
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 20) {
          return value.substring(0, 20) + '...'
        }
        return value
      }
    },
    methods: {
      handleChange (detail) {
        this.current = detail.mp.detail.key
        if (detail.mp.detail.key.toString() === 'homepage') {
          wx.redirectTo({
            url: '../home/main'
          })
        } else if (detail.mp.detail.key.toString() === 'mine') {
          wx.redirectTo({
            url: '../own/main'
          })
        } else if (detail.mp.detail.key.toString() === 'chat') {
          wx.redirectTo({
            url: '../index/main'
          })
        }
      },
      toCitySelect () {
        wx.switchTab({
          url: '../citySelect/main'
        })
      },
      gotoDetail (id) {
        wx.navigateTo({url: '/pages/doc/docInfo/main?docId=' + id})
      },
      toCourseInfo (id) {
        wx.navigateTo({
          url: '/pages/doc/courseInfo/main?courseId=' + id
        })
      },
      toChoose (val) {
        if (val === '申请讲座') {
          wx.navigateTo({
            url: '/pages/doc/course/main'
          })
        }
        if (val === '经验分享') {
          wx.navigateTo({
            url: '/pages/doc/article/main'
          })
        }
        if (val === '专家带教') {
          wx.navigateTo({
            url: '/pages/doc/docList/main'
          })
        }
        if (val === '科普知识') {
          wx.navigateTo({
            url: '/pages/doc/science/main'
          })
        }
      }
    },
    async beforeCreate () {
      // 调用应用实例的方法获取全局数据
      const { docList } = await getDocList()
      wx.setStorageSync('docList', docList)
      const { courseList } = await getCourseList()
      wx.setStorageSync('courseList', courseList)
    },
    mounted () {
      this.docList = wx.getStorageSync('docList')
      this.courseList = wx.getStorageSync('courseList')
    },
    onPullDownRefresh () {
      console.log('onPullDownRefresh')
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 600)
    }
  }
</script>

<style lang="stylus" scoped>
.container{width:100%;height:100vh;background:#e8e8e8;}
.search{background: #f5f5f5;border-radius: 12px;padding: 5px 10px}
.swiper{height: 120px;width: calc(100% - 16px)}
.icon-item{width:25%;padding: 10px 13px 0 13px;box-sizing: border-box;}
.icon{width: 38px;height: 38px;border-radius: 50%;color: #fff;font-size: 24px}
.adv{border-right: 2px solid #eee}
.adv img{width: 50px;height: 50px}
.good{border-bottom: 1px solid #DDD8CE}
.good img{width: 80px;height: 80px}
.card img{width: 80px;height: 80px}
.order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
.order img{width: 99%; height: 120px; border-radius: 3px}
.exitBtn{border: 1px solid #357cfb;padding:7px 15px;color:#357cfb;border-radius: 3px}
</style>
