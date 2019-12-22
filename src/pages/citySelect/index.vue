<template>
  <div class="container ub-box ub-col">
   <city @cityService="cityService"></city>
  </div>
</template>
<script>
  import city from '../../components/city.vue'
  import {getDocList} from '../../config'
  export default {
    components: {city},
    data () {
      return {}
    },
    methods: {
      async cityService (city) {
        /**
         * 更新Vuex state中的curCity
         */
        this.$store.commit('updateCity', city)
        wx.setStorageSync('locationCity', city)
        const {docList} = await getDocList(city)
        console.log(docList)
        if (docList.size === 0) {
          wx.showToast({
            title: '暂无医生',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('locationCity', '北京')
        } else {
          this.$backBeaforWin()
        }
      }
    },
    onShow () {
      wx.setNavigationBarTitle({title: '选择城市'})
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100vh;background:#fff}
</style>
