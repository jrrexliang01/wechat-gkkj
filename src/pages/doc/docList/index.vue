<template>
  <div class="container ub-box ub-col">
    <scroll-view scroll-y style="height: calc(100vh);" scroll-top="0">
      <!--专家带教-->
      <dl class="ub-box ub-col z-margin-top-6-px z-padding-all-8-px" style="background:#fff">
        <dd class="ub-box ub-col">
          <div v-for="(val, idx) in docList" :key="val.id" :isLast="idx===10">
            <div @click.stop="$openWin('/pages/doc/docInfo/main?docId=' + val.id)" class="card ub-box z-padding-v-10-px"
                 :class="{'z-border-bottom-1-eee':isLast==false}">
              <img :src="val.icon" class="z-img-cover">
              <div class="z-padding-h-10-px ub-between ub-flex-1">
                <p class="ub-ver-left">
                  <span
                    class="z-width-80-percent z-font-size-15 z-lineHeight-26 z-lines-1-overflow-hidden z-font-weight-bold">{{val.docName}}</span>
                </p>
                <p class="ub-ver-left">
                  <span class="ub-flex-1 z-textAlign-left z-font-size-12 z-color-888">{{val.title}}</span>
                </p>
                <p class="ub-ver-left">
                  <span class="ub-flex-1 z-textAlign-left z-font-size-12 z-color-888" style="width: 160px;">{{val.hospitals.hospitalName}}</span>
                </p>
              </div>
              <div class="z-padding-h-10-px ub-between ub-flex-1 z-margin-left-30-px" style="text-align: right;">
                <div class="z-font-size-18 z-color-333 ub-box ub-ver-v z-textAlign-right z-margin-bottom-20-px">
                  <div @click.stop="addStudy(val.id)" class="exitBtn ub-box ub-ver z-font-size-14">申请带教</div>
                </div>
              </div>
            </div>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
  import {getExpDocList, studyAdd} from '../../../config'
  export default {
    props: ['isLast'],
    data () {
      return {
        docList: {},
        studyInfo: {
          teacher: {
            id: 0
          },
          student: {
            id: 0
          }
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
    },
    async beforeCreate () {
      // 调用应用实例的方法获取全局数据
      const { expDocList } = await getExpDocList()
      this.docList = expDocList
    },
    onPullDownRefresh () {
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
.loginBtn{width:80px;font-size:14px;color:#fff;padding:0px 5px;margin-left: 10px;background: #ff5722}
.exitBtn{border: 1px solid #357cfb;padding:7px 15px;color:#357cfb;border-radius: 3px}
</style>
