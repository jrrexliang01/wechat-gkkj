<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <img :src="imgSrc" class="z-width-100-percent" mode="widthFix"/>
      <dl class="z-width-100-percent ub-box ub-col" style="margin-bottom: 50px;">
        <dd @click.stop="$openWin('/pages/doc/courseInfo/main?courseId=' + item.id)"
            v-for="(item,index ) in courseList" :key="item.id"
            class="order z-width-100-percent z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-17 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{item.courseTitle}}</span>
          </div>
          <img class="z-img-contain" :src="newSrc"/>
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px" style="text-align: right;padding-right: 5px;">{{item.createTime}}</span>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
  import {getCourseList} from '../../../config'

  export default {
    data () {
      return {
        courseList: [],
        imgSrc: '',
        newSrc: ''
      }
    },
    async onShow () {
      // 调用应用实例的方法获取全局数据
      const {courseList} = await getCourseList(2)
      this.courseList = courseList
    },
    mounted () {
      let banner = wx.getStorageSync('enclosureList')
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'experience_banner') {
          this.imgSrc = banner.data[i].enclosurePath
        } else if (banner.data[i].enclosureName === 'experience_default') {
          this.newSrc = banner.data[i].enclosurePath
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #fff
  }

  .order {
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 8px;
  }

  .order img {
    width: 99%;
    height: 120px;
    border-radius: 3px
  }
</style>
