<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <img :src="imgSrc" class="z-width-100-percent" mode="widthFix"/>
      <dl class="z-width-100-percent ub-box ub-col" style="margin-bottom: 50px;">
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
    </scroll-view>
  </div>
</template>

<script>
import { getCourseList } from '../../../config'
export default {
  data () {
    return {
      courseList: {},
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573711070555&di=838265d4fd12babf14dc71651dc9a9a7&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F170e60b9758f0742a63e91e3179995d14d95c89d2d012-bYEkE9_fw658'
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value
      }
      return value
    }
  },
  methods: {
    toCourseInfo (id) {
      wx.navigateTo({
        url: '/pages/doc/courseInfo/main?courseId=' + id
      })
    }
  },
  async mounted () {
    // 调用应用实例的方法获取全局数据
    const { courseList } = await getCourseList()
    this.courseList = courseList
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 99%; height: 120px; border-radius: 3px}
</style>
