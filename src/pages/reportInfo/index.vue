<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">就诊报告</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <i-panel title="疼痛">
          <i-radio-group :current="currentPainRep" v-for="(painRep,index ) in painRepList" :key="painRep.id" @change="handlePainRepChange">
            <i-radio position="right" :value="painRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="积乳">
          <i-radio-group :current="currentMilkRep" v-for="(milkRep,index ) in milkRepList" :key="milkRep.id" @change="handleMilkRepChange">
            <i-radio position="right" :value="milkRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="包块">
          <i-radio-group :current="currentChunksRep" v-for="(chunksRep,index ) in chunksRepList" :key="chunksRep.id" @change="handleChunksRepChange">
            <i-radio position="right" :value="chunksRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="急性乳腺炎">
          <i-radio-group :current="currentAcuteMastitisRep" v-for="(acuteMastitisRep,index ) in acuteMastitisRepList" :key="acuteMastitisRep.id" @change="handleAcuteMastitisRepChange">
            <i-radio position="right" :value="acuteMastitisRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="溢液">
          <i-radio-group :current="currentSpillRep" v-for="(spillRep,index ) in spillRepList" :key="spillRep.id" @change="handleSpillRepChange">
            <i-radio position="right" :value="spillRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="乳头问题">
          <i-radio-group :current="currentQuestionRep" v-for="(questionRep,index ) in questionRepList" :key="questionRep.id" @change="handleQuestionRepChange">
            <i-radio position="right" :value="questionRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="增生">
          <i-radio-group :current="currentHyperplasiaRep" v-for="(hyperplasiaRep,index ) in hyperplasiaRepList" :key="hyperplasiaRep.id" @change="handleHyperplasiaRepChange">
            <i-radio position="right" :value="hyperplasiaRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="纤维瘤、脂肪瘤">
          <i-radio-group :current="currentFibromaRep" v-for="(fibromaRep,index ) in fibromaRepList" :key="fibromaRep.id" @change="handleFibromaRepChange">
            <i-radio position="right" :value="fibromaRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="乳痛症">
          <i-radio-group :current="currentMastodyniaRep" v-for="(mastodyniaRep,index ) in mastodyniaRepList" :key="mastodyniaRep.id" @change="handleMastodyniaRepChange">
            <i-radio position="right" :value="mastodyniaRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <i-panel title="乳腺囊肿">
          <i-radio-group :current="currentBreastCystRep" v-for="(breastCystRep,index ) in breastCystRepList" :key="breastCystRep.id" @change="handleBreastCystRepChange">
            <i-radio position="right" :value="breastCystRep.name" disabled>
            </i-radio>
          </i-radio-group>
        </i-panel>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="调理建议" @change="changValue('healthProposal', $event)" right title="调理建议" disabled/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="项目建议" @change="changValue('projectProposal', $event)" right title="项目建议" disabled/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="next()">下一步</button>
    </dd>
  </div>
</template>

<script>
// import { getReportInfo } from '../../config'
export default {
  data () {
    return {
      painRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      milkRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      chunksRepList: [{
        id: 1,
        name: '团结'
      }, {
        id: 2,
        name: '条状'
      }, {
        id: 3,
        name: '结节'
      }, {
        id: 4,
        name: '片状'
      }],
      acuteMastitisRepList: [{
        id: 1,
        name: '穿刺引流'
      }, {
        id: 2,
        name: '切开引流'
      }, {
        id: 3,
        name: '自行破溃'
      }, {
        id: 4,
        name: '无'
      }],
      spillRepList: [{
        id: 1,
        name: '清水'
      }, {
        id: 2,
        name: '奶汁'
      }, {
        id: 3,
        name: '鲜血'
      }, {
        id: 4,
        name: '褐色'
      }],
      questionRepList: [{
        id: 1,
        name: '皲裂'
      }, {
        id: 2,
        name: '水肿'
      }, {
        id: 3,
        name: '白斑'
      }, {
        id: 4,
        name: '溃疡'
      }, {
        id: 5,
        name: '疼痛'
      }],
      hyperplasiaRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      fibromaRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      mastodyniaRepList: [{
        id: 1,
        name: '胀痛'
      }, {
        id: 2,
        name: '刺痛'
      }, {
        id: 3,
        name: '间歇痛'
      }],
      breastCystRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      currentPainRep: '',
      currentMilkRep: '',
      currentChunksRep: '',
      currentAcuteMastitisRep: '',
      currentSpillRep: '',
      currentQuestionRep: '',
      currentHyperplasiaRep: '',
      currentFibromaRep: '',
      currentMastodyniaRep: '',
      currentBreastCystRep: '',
      healthProposal: '',
      projectProposal: '',
      patInfo: {},
      patRepInfo: {
        isPain: '',
        isMilk: '',
        chunks: '',
        auteMastitis: '',
        spill: '',
        question: '',
        hyperplasia: '',
        fibroma: '',
        mastodynia: '',
        breastCyst: '',
        healthProposal: '',
        projectProposal: ''
      },
      reportId: 0
    }
  },
  methods: {
    // async onLoad (options) {
    //   this.reportId = parseInt(options.reportId)
    //   const { reportInfo } = await getReportInfo(this.reportId)
    //   wx.setStorageSync('reportInfo', reportInfo)
    // },
    handlePainRepChange (data) {
      this.currentPainRep = data.target.value
    },
    handleMilkRepChange (data) {
      this.currentMilkRep = data.target.value
    },
    handleChunksRepChange (data) {
      this.currentChunksRep = data.target.value
    },
    handleAcuteMastitisRepChange (data) {
      this.currentAcuteMastitisRep = data.target.value
    },
    handleSpillRepChange (data) {
      this.currentSpillRep = data.target.value
    },
    handleQuestionRepChange (data) {
      this.currentQuestionRep = data.target.value
    },
    handleHyperplasiaRepChange (data) {
      this.currentHyperplasiaRep = data.target.value
    },
    handleFibromaRepChange (data) {
      this.currentFibromaRep = data.target.value
    },
    handleMastodyniaRepChange (data) {
      this.currentMastodyniaRep = data.target.value
    },
    handleBreastCystRepChange (data) {
      this.currentBreastCystRep = data.target.value
    }
  },
  mounted () {
    this.patRepInfo = wx.getStorageSync('reportInfo')
    this.currentPainRep = this.patRepInfo.isPain
    this.currentMilkRep = this.patRepInfo.isMilk
    this.currentChunksRep = this.patRepInfo.chunks
    this.currentAcuteMastitisRep = this.patRepInfo.auteMastitis
    this.currentSpillRep = this.patRepInfo.spill
    this.currentQuestionRep = this.patRepInfo.question
    this.currentHyperplasiaRep = this.patRepInfo.hyperplasia
    this.currentFibromaRep = this.patRepInfo.fibroma
    this.currentMastodyniaRep = this.patRepInfo.mastodynia
    this.currentBreastCystRep = this.patRepInfo.breastCyst
    this.healthProposal = this.patRepInfo.healthProposal
    this.projectProposal = this.patRepInfo.projectProposal
  }
}
</script>

<style lang="stylus" scoped>
.bg
  background-color $background
  height 100vh
.right
  box-sizing border-box
  height 100px
  padding 10px
  display flex
  flex-direction column
  justify-content space-around
  .username
    font-weight 600
    font-size 18px
    color $base
  .account
    font-size 14px
    color $secondary
.btn
  color white
  background-color $primary
  border-radius 20px
  height 40px
  width 150px
  line-height 40px
  font-size 16px
.delete
  background-color $danger
.container
  background-color $background
  height 100vh
  overflow scroll
.card
  border-top 1px solid $border-light
  border-bottom 1px solid $border-light
  background-color white
  margin-bottom -1px
  .item
    display flex
    width 100vw
    padding 10px 20px
    border-bottom 1px solid $border-base
    font-size 16px
    .key
      width 60vw
      font-weight 500
      color $base
      box-sizing border-box
    .value
      width 40vw
      font-weight 400
      color $regular
      box-sizing border-box
.avatar
  padding 10px
.revise
  padding-top 20px
  display flex
  flex-direction column
  justify-content space-around
  height 100px
</style>
