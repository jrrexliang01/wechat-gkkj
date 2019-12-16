<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <img :src="imgSrc" class="z-width-100-percent" mode="widthFix"/>
      <dl class="z-width-100-percent ub-box ub-col" style="margin-bottom: 50px;">
        <dd @click.stop="toArticleInfo(item.id)" v-for="(item,index ) in articleList" :key="item.id"
            class="order z-width-100-percent z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-17 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{item.title}}</span>
          </div>
          <img class="z-img-contain" :src="newSrc"/>
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
  import {getArticleList, getEnclosureList} from '../../../config'

  export default {
    data () {
      return {
        articleList: {},
        imgSrc: '',
        newSrc: '',
        current: ''
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
      handleChange (detail) {
        this.current = detail.mp.detail.key
        if (detail.mp.detail.key.toString() === 'homepage') {
          wx.switchTab({
            url: '../home/main'
          })
        } else if (detail.mp.detail.key.toString() === 'mine') {
          wx.switchTab({
            url: '../own/main'
          })
        } else if (detail.mp.detail.key.toString() === 'chat') {
          wx.switchTab({
            url: '../index/main'
          })
        }
      },
      toArticleInfo (id) {
        wx.navigateTo({
          url: '/pages/doc/articleInfo/main?articleId=' + id
        })
      }
    },
    async onShow () {
      const {enclosureList} = await getEnclosureList('article_default')
      if (enclosureList.data.length > 0) {
        this.newSrc = enclosureList.data[0].enclosurePath
      }
      this.current = 'science'
    },
    async mounted () {
      // 调用应用实例的方法获取全局数据
      const {articleList} = await getArticleList()
      wx.setStorageSync('articleList', articleList)
      this.articleList = wx.getStorageSync('articleList')
      const {enclosureList} = await getEnclosureList('article_banner')
      if (enclosureList.data.length > 0) {
        this.imgSrc = enclosureList.data[0].enclosurePath
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
