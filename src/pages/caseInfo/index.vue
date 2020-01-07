<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dd style="padding:8px 10px"
          class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">基本信息</span>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">姓名</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="patientName" placeholder="请输入姓名">
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">年龄</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="age" placeholder="请输入年龄" type="number">
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">电话</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="phone" placeholder="请输入电话" type="number">
            </span>
          </li>
        </ul>
      </dd>
      <dd style="padding:8px 10px"
          class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">疾病情况</span>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">疾病史</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <i-switch :value="switch1" @change="onChange1" slot="footer"></i-switch>
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">过敏史</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <i-switch :value="switch2" @change="onChange2" slot="footer"></i-switch>
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">产后修复</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <i-switch :value="switch3" @change="onChange3" slot="footer"></i-switch>
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">产后天数(天)</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="postpartumDay" placeholder="请输入天数" type="number">
            </span>
          </li>
        </ul>
      </dd>
      <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
        <span
          class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">目前状态</span>
        <i-checkbox-group :current="current" v-for="(now, index) in nowList" :key="now.id" @change="handleChange">
          <i-checkbox position="right" :value="now.name">
          </i-checkbox>
        </i-checkbox-group>
      </dd>
      <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px z-margin-bottom-20-px">
        <button class="loginBtn" lang="zh_CN" @click="add">保存</button>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
  import {getCaseDetail} from '../../config'

  export default {
    data () {
      return {
        id: '',
        patId: '',
        content: '',
        switch1: false,
        switch2: false,
        switch3: false,
        age: '',
        phone: '',
        patientName: '',
        postpartumDay: '',
        own: false,
        nowList: [{
          id: 1,
          name: '少奶'
        }, {
          id: 2,
          name: '生理涨奶'
        }, {
          id: 3,
          name: '乳头问题'
        }, {
          id: 4,
          name: '急性乳腺炎'
        }, {
          id: 5,
          name: '回奶'
        }],
        current: [],
        form: {
          patientName: '',
          age: 0,
          phone: '',
          isDisease: false,
          isAllergy: false,
          postpartumDay: 0,
          postpartumRepair: false,
          currentState: []
        },
        formData: {},
        status: 0,
        docInfo: {}
      }
    },
    async mounted (options) {
      console.log(options)
      const {caseDetail} = await getCaseDetail(options.id)
      console.log(caseDetail)
      if (caseDetail !== null && caseDetail !== '') {
        this.form = caseDetail
        this.patientName = this.form.patientName
        this.age = this.form.age
        this.phone = this.form.phone
        this.switch1 = this.form.isDisease
        this.switch2 = this.form.isAllergy
        this.postpartumDay = this.form.postpartumDay
        this.switch3 = this.form.postpartumRepair
        if (this.form.currentState !== null) {
          this.current = this.form.currentState.split(',')
        } else {
          this.current = []
        }
      }
    },
    load (options) {
      console.log(options)
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

  .submitBtn {
    padding: 15px 35px;
    background: #5CA2F2;
    box-sizing: border-box;
  }

  .input {
    font-size: 12px;
  }

  .loginBtn {
    font-size: 18px;
    color: #fff;
    padding: 0px 20px;
    margin-left: 10px;
    margin-right: 10px;
    background: #5CA2F2
  }
</style>
