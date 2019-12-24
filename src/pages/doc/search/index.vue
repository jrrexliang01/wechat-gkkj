<template>
  <div class="container">
    <dl class="ub-box ub-col">
      <dd class="z-width-100-percent z-padding-all-8-px z-bg-color-fff ub-box ub-ver z-box-sizing-border">
        <div class="ub-flex-1 search ub-box ub-ver-v">
          <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>
          <input @input="doInput" @confirm="doSearch" class="ub-flex-1 z-font-size-14 z-color-666 z-padding-v-5-px z-margin-left-8-px" placeholder="乳腺增生"/>
        </div>
        <span @click.stop="$backBeaforWin()" class="z-font-size-13 z-margin-left-8-px" style="color:#06c1ae">取消</span>
      </dd>
      <!--搜索值不为空的时候，显示搜索列表-->
      <div v-if="searchVal.length>0" class="ub-box ub-col" style="padding:8px 8px 0 8px">
        <scroll-view scroll-y style="height: calc(100vh - 80px)" scroll-top="0">
          <ul class="ub-box ub-col">
            <li @click.stop="clickSearchItem(val)" v-if="currSearchList.length>0"
                class="search-item ub-box ub-ver z-box-sizing-border" v-for="(val, i) in currSearchList" :key="i">
              <i class="iconfont icon-sousuo z-color-999 z-font-size-16 z-margin-right-10-px"></i>
              <p class="ub-flex-1 z-color-333 z-font-size-14">{{val.docName}}</p>
              <span class="z-font-size-12 z-color-999">约1个结果</span>
            </li>
            <li @click.stop="clickSearchItem(searchVal)" v-if="currSearchList.length===0" class="search-item ub-box ub-ver z-box-sizing-border">
              <i class="iconfont icon-sousuo z-color-999 z-font-size-16 z-margin-right-10-px"></i>
              <p class="ub-flex-1 z-color-333 z-font-size-14">搜索"{{searchVal}}"</p>
              <i class="iconfont icon-xiayiyeqianjinchakangengduo z-color-999 z-font-size-16"></i>
            </li>
          </ul>
         </scroll-view>
      </div>
      <!--搜索值为空的时候，显示猜你想找和历史搜索-->
      <div v-if="searchVal.length===0" class="ub-box ub-col">
        <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box">
          <p class="z-font-size-14 z-color-888">猜你想找</p>
        </dd>
        <dd class="z-margin-h-8-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box">
          <ul class="ub-box ub-wrap">
            <li @click.stop="clickGuessItem(val)" v-for="(val, idx) in guess" :key="idx"
                class="item z-font-size-13 z-color-333">{{val.content}}
            </li>
          </ul>
        </dd>
        <dd class="z-margin-h-8-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between">
          <p class="z-font-size-14 z-color-888">历史搜索</p>
          <i @click.stop="clear()" class="iconfont icon-juqianshou z-color-999 z-font-size-16"></i>
        </dd>
        <dd class="z-margin-h-8-px z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box">
          <ul class="ub-box ub-wrap">
            <li v-for="(val, idx) in history" :key="idx"
                class="item z-font-size-13 z-color-333">{{val.docName}}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>
<script>
  import {searchHot, getBaseDocs} from '../../../config'
  import {unique} from '../../../utils/common'
  export default {
    data () {
      return {
        searchVal: '',
        // 测试搜索结果集
        searchAllList: [],
        currSearchList: [], // 当前根据搜索关键词搜索到的列表
        guess: [],
        history: []
      }
    },
    async onLoad () {
      const { searchHotList } = await searchHot()
      this.guess = searchHotList
    },
    methods: {
      doInput (e) {
        this.searchVal = e.mp.detail.value
        this.filterList()
      },
      doSearch (e) {
        this.searchVal = e.mp.detail.value
      },
      filterList () {
        this.currSearchList = this.searchAllList.filter(item => {
          if (item.docName.indexOf(this.searchVal) >= 0 || item.subject.indexOf(this.searchVal) >= 0) return item
        })
      },
      clickSearchItem (val) {
        this.history.push(val)
        let arr = unique(this.history)
        wx.setStorageSync('history', arr)
        wx.navigateTo({url: '/pages/doc/docInfo/main?docId=' + val.id})
      },
      clickGuessItem (val) {
        wx.navigateTo({url: '/pages/docInfo/main?docId=' + val.id})
      },
      clear () {
        this.history = []
        wx.setStorageSync('history', this.history)
      }
    },
    async mounted () {
      const { allDocList } = await getBaseDocs()
      this.searchAllList = allDocList
      this.searchVal = ''
      this.currSearchList = JSON.parse(JSON.stringify(this.searchAllList))
    },
    onShow () {
      wx.setNavigationBarTitle({title: '搜索'})
      this.history = wx.getStorageSync('history')
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100vh;background:#fff}
  .search{background: #f5f5f5;border-radius: 15px;padding: 0 10px}
  .search-item{border-bottom: 1px solid #eee;padding: 15px 0px;}
  .item{padding: 8px 10px;background: #f5f5f5;border-radius: 3px;margin: 0 8px 8px 0}
</style>
